import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';

export abstract class TokenParser {
	abstract matches(ch: Char, context: ParseContext): boolean;

	abstract parse(ch: Char, context: ParseContext): boolean;
}

