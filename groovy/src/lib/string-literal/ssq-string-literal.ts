import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, ByCharTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {T} from '../tokens';
import {BackslashEscapeParser, SqSLBadBackslashEscapeParser} from './backslash-escape';
import {OctalEscapeParser} from './octal-escape';
import {QSLUnicodeEscapeParser} from './unicode-escape';

export class SsqSLiteralEndMarkParser extends ByCharTokenParser {
	constructor() {
		super('\'');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.SsqSLMark,
			text: '\'',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(mark);
		context.forward(1);
		return true;
	}

	static readonly instance = new SsqSLiteralEndMarkParser();
}

export class SsqSLiteralParser extends ByCharTokenParser {
	private static readonly StandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['\'', '\\'].includes(p.firstChar));
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			BackslashEscapeParser.instanceB,
			BackslashEscapeParser.instanceF,
			BackslashEscapeParser.instanceN,
			BackslashEscapeParser.instanceR,
			BackslashEscapeParser.instanceT,
			BackslashEscapeParser.instanceBackslash,
			BackslashEscapeParser.instanceSingleQuote,
			BackslashEscapeParser.instanceDoubleQuotes,
			BackslashEscapeParser.instanceDollar,
			SqSLBadBackslashEscapeParser.instance,
			OctalEscapeParser.instance,
			QSLUnicodeEscapeParser.instance,
			SsqSLiteralEndMarkParser.instance,
			SsqSLiteralParser.StandaloneSymbolParsers, WsTabParsers, CharsParsers
		]
	});

	constructor() {
		super('\'');
	}

	matches(_: Char, context: ParseContext): boolean {
		const [c2, c3] = context.nextChars(1);
		return c2 !== '\'' || c3 !== '\'';
	}

	protected startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.SsqSLMark,
			text: '\'',
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.SsqSLiteral, mark);
		context.sink(literal);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return SsqSLiteralParser.Selector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser instanceof SsqSLiteralEndMarkParser) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new SsqSLiteralParser();
}
