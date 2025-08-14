import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {
	AfterChildParsed,
	ByCharTokenParser,
	BySingleCharTokenParser,
	ParserSelector,
	TokenParser
} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';
import {BackslashEscapeParser, SqSLBadBackslashEscapeParser} from './backslash-escape-parsers';
import {OctalEscapeParser} from './octal-escape-parser';
import {QSLUnicodeEscapeParser} from './unicode-escape-parsers';

export class SsqSLiteralEndMarkParser extends BySingleCharTokenParser {
	constructor() {
		super('\'');
	}

	protected getTokenId(): GroovyTokenId {
		return T.SsqSLMark;
	}

	static readonly instance = new SsqSLiteralEndMarkParser();
}

export class SsqSLiteralParser extends ByCharTokenParser {
	private static readonly StandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['\'', '\\'].includes(p.firstChar));
	private static readonly Selector = new ParserSelector({
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

	protected startBlock(context: ParseContext): void {
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
		if (parser === SsqSLiteralEndMarkParser.instance) {
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
