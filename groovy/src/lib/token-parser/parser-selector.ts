import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ByFuncTokenParser, TokenParser} from './token-parser';

export interface ParserSelectorArgs {
	byChar?: Array<ByCharTokenParser>;
	byFunc?: Array<ByFuncTokenParser>;
}

export class ParserSelector {
	private readonly _byChar: Map<Char, TokenParser> = new Map();
	private readonly _byFunc: Array<ByFuncTokenParser> = [];

	constructor(args: ParserSelectorArgs) {
		args.byChar?.forEach(p => this._byChar.set(p.firstChar, p));
		args.byFunc?.forEach(p => this._byFunc.push(p));
	}

	private findByChar(ch: Char): TokenParser | undefined {
		return this._byChar.get(ch);
	}

	private findByFunc(ch: Char): TokenParser | undefined {
		return this._byFunc.find(p => p.matches(ch));
	}

	find(ch: Char, context: ParseContext): TokenParser {
		let parser = this.findByChar(ch);
		if (parser != null) {
			return parser;
		}
		parser = this.findByFunc(ch);
		if (parser != null) {
			return parser;
		}

		throw new Error(`No token parser found for char[${ch}] at [offset=${context.charIndex}, line=${context.line}, column=${context.column}].`);
	}
}
