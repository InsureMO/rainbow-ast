import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {BySingleCharTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class MLEraserParser extends BySingleCharTokenParser {
	constructor() {
		super('\\');
	}

	protected getTokenId(): GroovyTokenId {
		return T.MLSNewlineEraser;
	}

	matches(_: Char, context: ParseContext): boolean {
		const nextChar = context.nextChar();
		if (nextChar === '\n') {
			return true;
		} else if (nextChar === '\r' && context.charAt(context.charIndex + 2) === '\n') {
			return true;
		}
		return false;
	}

	static readonly instance = new MLEraserParser();
}
