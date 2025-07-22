import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';

export interface TokenParser {
	parse(ch: Char, context: ParseContext): boolean;
}

export abstract class ByCharTokenParser implements TokenParser {
	private readonly _firstChar: Char;

	protected constructor(firstChar: Char) {
		this._firstChar = firstChar;
	}

	get firstChar(): Char {
		return this._firstChar;
	}

	abstract parse(ch: Char, context: ParseContext): boolean ;
}

export interface ByFuncTokenParser extends TokenParser {
	matches(ch: Char): boolean;
}
