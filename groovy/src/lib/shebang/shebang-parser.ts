import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
import {T} from '../tokens';

export class ShebangParser extends ByCharTokenParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [StandaloneSymbolParsers, WsTabParsers, CharsParsers]
	});

	constructor() {
		super('#');
	}

	matches(_ch: Char, context: ParseContext): boolean {
		return context.charAt(context.charIndex + 1) === '!';
	}

	private startBlock(_ch: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const startMark = new AtomicToken({
			id: T.ShebangStartMark,
			text: '#!',
			start: charIndex, line: context.line, column: context.column
		});
		const shebang = new BlockToken(T.Shebang, startMark);
		context.sink(shebang);
		context.forward(2);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let c = context.char();
		while (c != null) {
			const parser = ShebangParser.Selector.find(c, context);
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

	static readonly instance = new ShebangParser();
}
