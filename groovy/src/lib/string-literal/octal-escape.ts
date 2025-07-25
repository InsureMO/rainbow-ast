import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser} from '../token-parser';
import {T} from '../tokens';

/**
 * works only for single-quote string literal, triple single-quotes string literal,
 * double-quotes gstring literal and triple double-quotes gstring literal.
 * \999, 1-3 digits 0-9
 */
export class OctalEscapeParser extends ByCharTokenParser {
	constructor() {
		super('\\');
	}

	matches(_: Char, context: ParseContext): boolean {
		return JCM.Oct(context.nextChar());
	}

	private startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.OctalEscapeStartMark,
			text: '\\',
			start: charIndex, line: context.line, column: context.column
		});
		const escape = new BlockToken(T.OctalEscape, mark);
		context.sink(escape);
		context.forward(1);
	}

	private writeContent(numbers: string, context: ParseContext): void {
		const content = new AtomicToken({
			id: T.OctalEscapeContent,
			text: numbers,
			start: context.charIndex, line: context.line, column: context.column
		});
		context.collect(content);
		context.forward(numbers.length);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		// char index moved already, current char is first char of content
		const nextChar = context.char();
		const nextChar2 = context.nextChar();
		if (JCM.Oct(nextChar2)) {
			const nextChar3 = context.charAt(context.charIndex + 2);
			if (JCM.Oct(nextChar3)) {
				this.writeContent(nextChar + nextChar2 + nextChar3, context);
			} else {
				this.writeContent(nextChar + nextChar2, context);
			}
		} else {
			this.writeContent(nextChar, context);
		}

		context.rise();

		return true;
	}

	static readonly instance = new OctalEscapeParser();
}
