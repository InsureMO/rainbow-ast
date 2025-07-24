import {AtomicToken, Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {GroovyTokenId} from '../tokens';
import {ByCharTokenParser} from './by-char-token-parser';

export abstract class BySingleCharTokenParser extends ByCharTokenParser {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	protected abstract getTokenId(): GroovyTokenId;

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const token = new AtomicToken({
			id: this.getTokenId(),
			text: this.firstChar,
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(token);
		context.forward(1);
		return true;
	}
}
