import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
import {T} from '../tokens';
import {TqSLEscapeParsers} from './escape';
import {MLEraserParser} from './ml-eraser';
import {TsqSLStandaloneSymbolParsers} from './standalone-symbol';

export class TsqSLiteralEndMarkParser extends ByCharTokenParser {
	constructor() {
		super('\'');
	}

	matches(_: Char, context: ParseContext): boolean {
		const [c2, c3] = context.nextChars(1);
		return c2 === '\'' && c3 === '\'';
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.TsqSLMark,
			text: '\'\'\'',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(mark);
		context.forward(3);
		return true;
	}

	static readonly instance = new TsqSLiteralEndMarkParser();
}

export class TsqSLiteralParser extends ByCharTokenParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			TqSLEscapeParsers,
			MLEraserParser.instance,
			TsqSLiteralEndMarkParser.instance,
			TsqSLStandaloneSymbolParsers, WsTabNlParsers, CharsParsers
		]
	});

	constructor() {
		super('\'');
	}

	matches(_: Char, context: ParseContext): boolean {
		const [c2, c3] = context.nextChars(1);
		return c2 === '\'' && c3 === '\'';
	}

	private startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.TsqSLMark,
			text: '\'\'\'',
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.TsqSLiteral, mark);
		context.sink(literal);
		context.forward(3);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let c = context.char();
		while (c != null) {
			const parser = TsqSLiteralParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser instanceof TsqSLiteralEndMarkParser) {
				// end
				break;
			}
			c = context.char();
		}

		context.rise();

		return true;
	}

	static readonly instance = new TsqSLiteralParser();
}
