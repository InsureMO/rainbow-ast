import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
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

	private startBlock(_: Char, context: ParseContext): void {
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

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let c = context.char();
		while (c != null) {
			const parser = TdqGsLiteralParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser instanceof TdqGsLiteralEndMarkParser) {
				// end
				break;
			}
			c = context.char();
		}

		context.rise();

		return true;
	}

	static readonly instance = new TdqGsLiteralParser();
}
