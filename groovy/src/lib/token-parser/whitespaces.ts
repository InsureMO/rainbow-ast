import {AtomicToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {T} from '../tokens';
import {ByFuncTokenParser} from './token-parser';

export class WhitespacesParser implements ByFuncTokenParser {
	matches(ch: Char): boolean {
		return JCM.Whitespace(ch);
	}

	parse(_ch: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		let cIndex = charIndex + 1;
		let c = context.charAt(cIndex);
		while (JCM.Whitespace(c)) {
			cIndex++;
			c = context.charAt(cIndex);
		}
		const token = new AtomicToken({
			id: T.Whitespaces,
			text: context.text(charIndex, cIndex),
			start: charIndex, line: context.line, column: context.column
		});
		context.block().appendChild(token);
		context.forward(cIndex - charIndex);
		return true;
	}

	static readonly instance = new WhitespacesParser();
}
