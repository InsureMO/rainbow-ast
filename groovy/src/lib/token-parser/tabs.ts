import {AtomicToken, Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {T} from '../tokens';
import {ByFuncTokenParser} from './token-parser';

export class TabsParser implements ByFuncTokenParser {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(ch: Char, _context: ParseContext): boolean {
		return ch === '\t';
	}

	parse(_ch: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		let cIndex = charIndex + 1;
		let c = context.charAt(cIndex);
		while (c === '\t') {
			cIndex++;
			c = context.charAt(cIndex);
		}
		const token = new AtomicToken({
			id: T.Tabs,
			text: context.text(charIndex, cIndex),
			start: charIndex, line: context.line, column: context.column
		});
		context.block().appendChild(token);
		context.forward(cIndex - charIndex);
		return true;
	}

	static readonly instance = new TabsParser();
}
