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

	private startBlock(_: Char, context: ParseContext): void {
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

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let c = context.char();
		while (c != null) {
			const parser = SLCommentParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			c = context.char();
		}

		// end block
		context.rise();

		return true;
	}

	static readonly instance = new SLCommentParser();
}
