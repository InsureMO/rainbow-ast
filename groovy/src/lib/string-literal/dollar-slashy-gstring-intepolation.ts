import {Char, Token} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {T} from '../tokens';
import {GsBraceInterpolationParser, GsInterpolationParser} from './gstring-intepolation';
import {ICM} from './interpolation-char-match-functions';

/**
 * check the previous tokens.
 * 1. is dollar escape, continue util slash escape or interpolation,
 * 2. is slash escape, returns false.
 *    $ after slash escape, or between slash escape and $ are dollar escapes only,
 *    $ will not be treated as interpolation start mark,
 */
export class DsGsInterpolationAvailability {
	private constructor() {
		// avoid extend
	}

	static check(context: ParseContext): boolean {
		let previousEscapeToken: Token | undefined = (void 0);
		let previousGsiToken: Token | undefined = (void 0);
		const block = context.block();
		const children = block.children;
		for (let index = children.length - 1; index >= 0; index--) {
			const child = children[index];
			if (child.id === T.DollarEscape) {
				if (previousEscapeToken == null) {
					previousEscapeToken = child;
				}
			} else if (child.id === T.SlashEscape) {
				return false;
			} else if (child.id === T.GsInterpolation) {
				previousGsiToken = child;
				break;
			} else if (previousEscapeToken?.id !== T.DollarEscape) {
				break;
			}
		}
		if (previousEscapeToken?.id === T.DollarEscape && previousGsiToken == null) {
			return false;
		} else if (previousEscapeToken?.id === T.SlashEscape) {
			return false;
		}
		return true;
	}
}

export class DsGsInterpolationParser extends GsInterpolationParser {
	matches(_: Char, context: ParseContext): boolean {
		if (!ICM.INameStart(context.nextChar())) {
			return false;
		}
		return DsGsInterpolationAvailability.check(context);
	}

	static readonly instance = new DsGsInterpolationParser();
}

export class DsGsBraceInterpolationParser extends GsBraceInterpolationParser {
	matches(ch: Char, context: ParseContext): boolean {
		if (!super.matches(ch, context)) {
			return false;
		}
		return DsGsInterpolationAvailability.check(context);
	}

	static readonly instance = new DsGsBraceInterpolationParser();
}
