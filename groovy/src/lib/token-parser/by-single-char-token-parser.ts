import {AtomicToken, Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {GroovyTokenId} from '../tokens';
import {ByCharTokenParser} from './by-char-token-parser';

export abstract class BySingleCharTokenParser extends ByCharTokenParser {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_ch: Char, _context: ParseContext): boolean {
		return true;
	}

	protected abstract getTokenId(): GroovyTokenId;

	parse(_ch: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const token = new AtomicToken({
			id: this.getTokenId(),
			text: this.firstChar,
			start: charIndex, line: context.line, column: context.column
		});
		context.block().appendChild(token);
		context.forward(1);
		return true;
	}
}
