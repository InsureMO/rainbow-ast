import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
import {T} from '../tokens';

export class SLCommentParser extends ByCharTokenParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [StandaloneSymbolParsers, WsTabParsers, CharsParsers]
	});

	constructor() {
		super('/');
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === '/';
	}

	protected startBlock(context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.SLCommentStartMark,
			text: '//',
			start: charIndex, line: context.line, column: context.column
		});
		const cmt = new BlockToken(T.SLComment, mark);
		context.sink(cmt);
		context.forward(2);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return SLCommentParser.Selector;
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new SLCommentParser();
}
