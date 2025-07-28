import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
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

	private startBlock(_: Char, context: ParseContext): void {
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

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let c = context.char();
		while (c != null) {
			const parser = DsGsLiteralParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser instanceof DsGsLiteralEndMarkParser) {
				// end
				break;
			}
			c = context.char();
		}

		context.rise();

		return true;
	}

	static readonly instance = new DsGsLiteralParser();
}
