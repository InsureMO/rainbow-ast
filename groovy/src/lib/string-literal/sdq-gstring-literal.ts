import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
import {T} from '../tokens';
import {SqSLEscapeParsers} from './escape';
import {SdqGsLStandaloneSymbolParsers} from './standalone-symbol';

export class SdqGsLiteralEndMarkParser extends ByCharTokenParser {
	constructor() {
		super('"');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.SdqGsLMark,
			text: '"',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(mark);
		context.forward(1);
		return true;
	}

	static readonly instance = new SdqGsLiteralEndMarkParser();
}

export class SdqGsLiteralParser extends ByCharTokenParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			SqSLEscapeParsers,
			SdqGsLiteralEndMarkParser.instance,
			SdqGsLStandaloneSymbolParsers, WsTabParsers, CharsParsers
		]
	});

	constructor() {
		super('"');
	}

	isAvailable(context: ParseContext): boolean {
		return ![
			T.SdqGsLiteral, T.TsqSLiteral,
			T.SdqGsLiteral, T.TdqGsLiteral,
			T.SGsLiteral, T.DsGsLiteral
		].includes(context.block().id);
	}

	matches(_: Char, context: ParseContext): boolean {
		const [c2, c3] = context.nextChars(1);
		return c2 !== '"' || c3 !== '"';
	}

	private startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.SdqGsLMark,
			text: '"',
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.SdqGsLiteral, mark);
		context.sink(literal);
		context.forward(1);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let c = context.char();
		while (c != null) {
			const parser = SdqGsLiteralParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser instanceof SdqGsLiteralEndMarkParser) {
				// end
				break;
			}
			c = context.char();
		}

		context.rise();

		return true;
	}

	static readonly instance = new SdqGsLiteralParser();
}
