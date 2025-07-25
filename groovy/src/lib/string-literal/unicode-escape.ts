import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser} from '../token-parser';
import {T} from '../tokens';

abstract class UnicodeEscapeParser extends ByCharTokenParser {
	protected constructor() {
		super('\\');
	}

	protected startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.UnicodeEscapeStartMark,
			text: '\\u',
			start: charIndex, line: context.line, column: context.column
		});
		const escape = new BlockToken(T.UnicodeEscape, mark);
		context.sink(escape);
		context.forward(2);
	}

	protected writeContent(numbers: string, context: ParseContext): void {
		const content = new AtomicToken({
			id: T.UnicodeEscapeContent,
			text: numbers,
			start: context.charIndex, line: context.line, column: context.column
		});
		context.collect(content);
		context.forward(numbers.length);
	}
}

/**
 * works for single-quote string literal, triple single-quotes string literal,
 * double-quotes gstring literal and triple double-quotes gstring literal.
 * \uFFFF, 4 digits 0-9, a-f, A-F.
 * \u must lead 4 hex chars; if not, it is a bad escape,
 * for bad escape, collect as many hexadecimal characters as possible (maximum 3).
 */
export class QSLUnicodeEscapeParser extends UnicodeEscapeParser {
	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === 'u';
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		const n1 = context.char();
		if (JCM.Hex(n1)) {
			const charIndex = context.charIndex;
			const n2 = context.charAt(charIndex + 1);
			if (JCM.Hex(n2)) {
				const n3 = context.charAt(charIndex + 2);
				if (JCM.Hex(n3)) {
					const n4 = context.charAt(charIndex + 3);
					if (JCM.Hex(n4)) {
						this.writeContent(n1 + n2 + n3 + n4, context);
					} else {
						this.writeContent(n1 + n2 + n3, context);
					}
				} else {
					this.writeContent(n1 + n2, context);
				}
			} else {
				this.writeContent(n1, context);
			}
		}

		context.rise();

		return true;
	}

	static readonly instance = new QSLUnicodeEscapeParser();
}

/**
 * works for slashy gstring literal and dollar slashy gstring literal.
 * \uFFFF, 4 digits 0-9, a-f, A-F.
 * if \u follows 4 hex chars, it is unicode escape, otherwise not.
 */
export class SGsLUnicodeEscapeParser extends UnicodeEscapeParser {
	matches(_: Char, context: ParseContext): boolean {
		if (context.nextChar() !== 'u') {
			return false;
		}

		const charIndex = context.charIndex;
		const charsAfterU = context.text(charIndex + 2, charIndex + 6);
		return charsAfterU.length === 4 && !charsAfterU.split('').some(c => !JCM.Hex(c));
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		const charIndex = context.charIndex;
		const charsAfterU = context.text(charIndex, charIndex + 4);
		this.writeContent(charsAfterU, context);

		context.rise();

		return true;
	}

	static readonly instance = new SGsLUnicodeEscapeParser();
}
