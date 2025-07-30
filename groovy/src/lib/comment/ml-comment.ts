import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, ByCharTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {T} from '../tokens';

export class MLCommentEndMarkParser extends ByCharTokenParser {
	constructor() {
		super('*');
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === '/';
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.MLCommentEndMark,
			text: '*/',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(mark);
		context.forward(2);
		return true;
	}

	static readonly instance = new MLCommentEndMarkParser();
}

export class MLCommentParser extends ByCharTokenParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			MLCommentEndMarkParser.instance,
			StandaloneSymbolParsers, WsTabNlParsers, CharsParsers
		]
	});

	constructor() {
		super('/');
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === '*';
	}

	protected startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.MLCommentStartMark,
			text: '/*',
			start: charIndex, line: context.line, column: context.column
		});
		const cmt = new BlockToken(T.MLComment, mark);
		context.sink(cmt);
		context.forward(2);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return MLCommentParser.Selector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === MLCommentEndMarkParser.instance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new MLCommentParser();
}
