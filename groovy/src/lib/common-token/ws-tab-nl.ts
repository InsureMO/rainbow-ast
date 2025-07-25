import {AtomicToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ByFuncTokenParser} from '../token-parser';
import {T} from '../tokens';

export class WhitespacesParser extends ByFuncTokenParser {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(ch: Char, _: ParseContext): boolean {
		return JCM.Whitespace(ch);
	}

	parse(_: Char, context: ParseContext): boolean {
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
		context.collect(token);
		context.forward(cIndex - charIndex);
		return true;
	}

	static readonly instance = new WhitespacesParser();
}

export class TabsParser extends ByCharTokenParser {
	private constructor() {
		super('\t');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	parse(_: Char, context: ParseContext): boolean {
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
		context.collect(token);
		context.forward(cIndex - charIndex);
		return true;
	}

	static readonly instance = new TabsParser();
}

export class NewlineParser1 extends ByCharTokenParser {
	constructor() {
		super('\n');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const token = new AtomicToken({
			id: T.Newline,
			text: '\n',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(token);
		context.newline(1);
		return true;
	}

	static readonly instance = new NewlineParser1();
}

export class NewlineParser2 extends ByCharTokenParser {
	constructor() {
		super('\r');
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === '\n';
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const token = new AtomicToken({
			id: T.Newline,
			text: '\r\n',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(token);
		context.newline(2);
		return true;
	}

	static readonly instance = new NewlineParser2();
}

export const NewlineParsers = [NewlineParser1.instance, NewlineParser2.instance] as const;
export const WsTabParsers = [WhitespacesParser.instance, TabsParser.instance] as const;
export const WsTabNlParsers = [
	WhitespacesParser.instance, TabsParser.instance,
	NewlineParser1.instance, NewlineParser2.instance
] as const;