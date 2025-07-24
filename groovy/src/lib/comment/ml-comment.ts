import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
import {T} from '../tokens';

export class MLCommentEndMarkParser extends ByCharTokenParser {
	constructor() {
		super('*');
	}

	matches(_ch: Char, context: ParseContext): boolean {
		return context.nextChar() === '/';
	}

	parse(_ch: Char, context: ParseContext): boolean {
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

	matches(_ch: Char, context: ParseContext): boolean {
		return context.nextChar() === '*';
	}

	private startBlock(_ch: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const startMark = new AtomicToken({
			id: T.MLCommentStartMark,
			text: '/*',
			start: charIndex, line: context.line, column: context.column
		});
		const shebang = new BlockToken(T.MLComment, startMark);
		context.sink(shebang);
		context.forward(2);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let c = context.char();
		while (c != null) {
			const parser = MLCommentParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser instanceof MLCommentEndMarkParser) {
				// end
				break;
			}
			c = context.char();
		}

		// end block
		context.rise();

		return true;
	}

	static readonly instance = new MLCommentParser();
}
