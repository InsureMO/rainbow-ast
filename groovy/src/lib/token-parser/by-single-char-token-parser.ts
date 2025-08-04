import {AtomicToken, Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {GroovyTokenId} from '../tokens';
import {ByCharTokenParser} from './token-parser';

export abstract class BySingleCharTokenParser extends ByCharTokenParser {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	protected abstract getTokenId(): GroovyTokenId;

	protected createToken(context: ParseContext): AtomicToken {
		const charIndex = context.charIndex;
		return new AtomicToken({
			id: this.getTokenId(),
			text: this.firstChar,
			start: charIndex, line: context.line, column: context.column
		});
	}

	parse(_: Char, context: ParseContext): boolean {
		context.collect(this.createToken(context));
		context.forward(1);
		return true;
	}
}
