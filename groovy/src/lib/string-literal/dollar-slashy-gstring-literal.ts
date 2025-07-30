import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, ByCharTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {T} from '../tokens';
import {DollarEscapeParser} from './dollar-escape';
import {DsGsBraceInterpolationParser, DsGsInterpolationParser} from './dollar-slashy-gstring-intepolation';
import {MLEraserParser} from './ml-eraser';
import {SGsLUnicodeEscapeParser} from './unicode-escape';

export class DsGsLiteralEndMarkParser extends ByCharTokenParser {
	constructor() {
		super('/');
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === '$';
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.DsGsLEndMark,
			text: '/$',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(mark);
		context.forward(2);
		return true;
	}

	static readonly instance = new DsGsLiteralEndMarkParser();
}

export class DsGsLiteralParser extends ByCharTokenParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			DsGsInterpolationParser.instance,
			DsGsBraceInterpolationParser.instance,
			DollarEscapeParser.instanceDollar,
			DollarEscapeParser.instanceSlash,
			SGsLUnicodeEscapeParser.instance,
			MLEraserParser.instance,
			DsGsLiteralEndMarkParser.instance,
			StandaloneSymbolParsers, WsTabNlParsers, CharsParsers
		]
	});

	constructor() {
		super('$');
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === '/';
	}

	protected startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.DsGsLStartMark,
			text: '$/',
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.DsGsLiteral, mark);
		context.sink(literal);
		context.forward(2);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return DsGsLiteralParser.Selector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === DsGsLiteralEndMarkParser.instance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new DsGsLiteralParser();
}
