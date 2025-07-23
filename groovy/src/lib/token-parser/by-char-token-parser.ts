import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {TokenParser} from './token-parser';

export abstract class ByCharTokenParser extends TokenParser {
	private readonly _firstChar: Char;

	protected constructor(firstChar: Char) {
		super();
		this._firstChar = firstChar;
	}

	get firstChar(): Char {
		return this._firstChar;
	}

	abstract matches(ch: Char, context: ParseContext): boolean;

	abstract parse(ch: Char, context: ParseContext): boolean ;
}