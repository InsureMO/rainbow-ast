import {AtomicToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {ByFuncTokenParser} from '../token-parser';
import {T} from '../tokens';

export class WordParser extends ByFuncTokenParser {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(ch: Char, _: ParseContext): boolean {
		return JCM.Word(ch);
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		let cIndex = charIndex + 1;
		let c = context.charAt(cIndex);
		while (JCM.Word(c)) {
			cIndex++;
			c = context.charAt(cIndex);
		}
		const token = new AtomicToken({
			id: T.Word,
			text: context.text(charIndex, cIndex),
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(token);
		context.forward(cIndex - charIndex);
		return true;
	}

	static readonly instance = new WordParser();
}

/**
 * must be the last parser.
 * not whitespace, tab or newline.
 */
export class UndeterminedCharParser extends ByFuncTokenParser {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(ch: Char, context: ParseContext): boolean {
		if (ch === '\r') {
			return context.nextChar() !== '\n';
		} else if (JCM.Tnr(ch) || JCM.Whitespace(ch)) {
			return false;
		}

		return true;
	}

	parse(ch: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const token = new AtomicToken({
			id: T.UndeterminedChar,
			text: ch,
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(token);
		context.forward(1);
		return true;
	}

	static readonly instance = new UndeterminedCharParser();
}

export const CharsParsers = [WordParser.instance, UndeterminedCharParser.instance] as const;
