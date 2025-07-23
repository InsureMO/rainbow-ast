import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser} from './by-char-token-parser';
import {ByFuncTokenParser} from './by-func-token-parser';
import {TokenParser} from './token-parser';

export interface ParserSelectorArgs {
	parsers?: ReadonlyArray<ByCharTokenParser | ByFuncTokenParser | ReadonlyArray<ByCharTokenParser | ByFuncTokenParser>>;
}

export class ParserSelector {
	private readonly _byChar: Map<Char, Array<ByCharTokenParser>> = new Map();
	private readonly _byFunc: Array<ByFuncTokenParser> = [];

	constructor(args: ParserSelectorArgs) {
		args.parsers?.flat().forEach(p => {
			if (p instanceof ByCharTokenParser) {
				const existing = this._byChar.get(p.firstChar);
				if (existing == null) {
					this._byChar.set(p.firstChar, [p]);
				} else {
					existing.push(p);
				}
			} else if (p instanceof ByFuncTokenParser) {
				this._byFunc.push(p);
			} else {
				// @ts-expect-error guard logic
				throw new Error(`Unsupported parser[${p.constructor?.name ?? p}].`);
			}
		});
	}

	private findByChar(ch: Char, context: ParseContext): TokenParser | undefined {
		const parsers = this._byChar.get(ch);
		if (parsers == null) {
			return (void 0);
		}
		return parsers.find(p => p.isAvailable(context) && p.matches(ch, context));
	}

	private findByFunc(ch: Char, context: ParseContext): TokenParser | undefined {
		return this._byFunc.find(p => p.isAvailable(context) && p.matches(ch, context));
	}

	find(ch: Char, context: ParseContext): TokenParser {
		return this.findByChar(ch, context) ?? this.findByFunc(ch, context);
	}
}
