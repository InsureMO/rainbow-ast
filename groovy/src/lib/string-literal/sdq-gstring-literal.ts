import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, StandaloneSymbolParsers, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
import {T} from '../tokens';
import {BackslashEscapeParser, SqSLBadBackslashEscapeParser} from './backslash-escape';
import {DqGsBraceInterpolationParser, DqGsInterpolationParser} from './dq-gstring-intepolation';
import {OctalEscapeParser} from './octal-escape';
import {QSLUnicodeEscapeParser} from './unicode-escape';

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
	private static readonly StandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['"', '\\', '$'].includes(p.firstChar));
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
			SqSLBadBackslashEscapeParser.instance,
			OctalEscapeParser.instance,
			QSLUnicodeEscapeParser.instance,
			SdqGsLiteralEndMarkParser.instance,
			SdqGsLiteralParser.StandaloneSymbolParsers, WsTabParsers, CharsParsers
		]
	});

	constructor() {
		super('"');
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
