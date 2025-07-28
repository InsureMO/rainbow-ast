import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {GsBraceInterpolationParser, GsInterpolationParser} from './gstring-intepolation';

export class DqGsInterpolationParser extends GsInterpolationParser {
	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() !== '{';
	}

	static readonly instance = new DqGsInterpolationParser();
}

export class DqGsBraceInterpolationParser extends GsBraceInterpolationParser {
	static readonly instance = new DqGsBraceInterpolationParser();
}
