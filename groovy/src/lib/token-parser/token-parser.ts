import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';

export interface TokenParser {
	matches(ch: Char, context: ParseContext): boolean;
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

	abstract matches(ch: Char, context: ParseContext): boolean;

	abstract parse(ch: Char, context: ParseContext): boolean ;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ByFuncTokenParser extends TokenParser {
}
