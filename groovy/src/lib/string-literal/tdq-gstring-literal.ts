import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, ByCharTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {T} from '../tokens';
import {BackslashEscapeParser, TqSLBadBackslashEscapeParser} from './backslash-escape';
import {DqGsBraceInterpolationParser, DqGsInterpolationParser} from './dq-gstring-intepolation';
import {MLEraserParser} from './ml-eraser';
import {OctalEscapeParser} from './octal-escape';
import {QSLUnicodeEscapeParser} from './unicode-escape';

export class TdqGsLiteralEndMarkParser extends ByCharTokenParser {
	constructor() {
		super('"');
	}

	matches(_: Char, context: ParseContext): boolean {
		const [c2, c3] = context.nextChars(1);
		return c2 === '"' && c3 === '"';
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.TdqGsLMark,
			text: '"""',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(mark);
		context.forward(3);
		return true;
	}

	static readonly instance = new TdqGsLiteralEndMarkParser();
}

export class TdqGsLiteralParser extends ByCharTokenParser {
	private static readonly StandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['\\', '$'].includes(p.firstChar));
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			DqGsInterpolationParser.instance,
			DqGsBraceInterpolationParser.instance,
			BackslashEscapeParser.instanceB,
			BackslashEscapeParser.instanceF,
			BackslashEscapeParser.instanceN,
			BackslashEscapeParser.instanceR,
			BackslashEscapeParser.instanceT,
			BackslashEscapeParser.instanceBackslash,
			BackslashEscapeParser.instanceSingleQuote,
			BackslashEscapeParser.instanceDoubleQuotes,
			BackslashEscapeParser.instanceDollar,
			TqSLBadBackslashEscapeParser.instance,
			OctalEscapeParser.instance,
			QSLUnicodeEscapeParser.instance,
			MLEraserParser.instance,
			TdqGsLiteralEndMarkParser.instance,
			TdqGsLiteralParser.StandaloneSymbolParsers, WsTabNlParsers, CharsParsers
		]
	});

	constructor() {
		super('"');
	}

	matches(_: Char, context: ParseContext): boolean {
		const [c2, c3] = context.nextChars(1);
		return c2 === '"' && c3 === '"';
	}

	protected startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.TdqGsLMark,
			text: '"""',
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.TdqGsLiteral, mark);
		context.sink(literal);
		context.forward(3);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TdqGsLiteralParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser instanceof TdqGsLiteralEndMarkParser) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new TdqGsLiteralParser();
}
