import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';

export abstract class TokenParser {
	/**
	 * default available
	 */
	isAvailable(_context: ParseContext): boolean {
		return true;
	}

	abstract matches(ch: Char, context: ParseContext): boolean;

	abstract parse(ch: Char, context: ParseContext): boolean;
}

