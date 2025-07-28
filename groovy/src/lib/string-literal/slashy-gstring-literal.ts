import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CharsParsers, IsOperator, StandaloneSymbolParsers, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
import {T} from '../tokens';
import {BackslashEscapeParser} from './backslash-escape';
import {MLEraserParser} from './ml-eraser';
import {SGsBraceInterpolationParser, SGsInterpolationParser} from './slashy-gstring-intepolation';
import {SGsLUnicodeEscapeParser} from './unicode-escape';

export class SGsLiteralEndMarkParser extends ByCharTokenParser {
	constructor() {
		super('/');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.SGsLMark,
			text: '/',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(mark);
		context.forward(1);
		return true;
	}

	static readonly instance = new SGsLiteralEndMarkParser();
}

export class SGsLiteralParser extends ByCharTokenParser {
	private static readonly StandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['/'].includes(p.firstChar));
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			SGsInterpolationParser.instance,
			SGsBraceInterpolationParser.instance,
			BackslashEscapeParser.instanceSlash,
			SGsLUnicodeEscapeParser.instance,
			MLEraserParser.instance,
			SGsLiteralEndMarkParser.instance,
			SGsLiteralParser.StandaloneSymbolParsers, WsTabNlParsers, CharsParsers
		]
	});

	constructor() {
		super('/');
	}

	isAvailable(context: ParseContext): boolean {
		const line = context.line;
		const children = context.block().children;
		let index = children.length - 1;
		while (index >= 0) {
			const child = children[index];
			const childTokenId = child.id;
			switch (childTokenId) {
				// @formatter:off
				case T.Whitespaces: case T.Tabs: case T.MLComment: {
				// @formatter:on
					index--;
					break;
				}
				// @formatter:off
				case T.Semicolon:
				case T.Dot: case T.SafeDot: case T.SafeChainDot:
				case T.LBrace: case T.LBrack: case T.LParen: case T.LAngle:
				case T.GsiBraceStartMark: case T.SafeIndex: {
				// @formatter:on
					// the first not ignored token is one of above, allowed
					return true;
				}
				default: {
					if (child.line !== line) {
						// slash is first not ignored token of line, allowed
						return true;
					} else {
						// at same line and after operator, allowed; otherwise not allowed.
						return IsOperator(child);
					}
				}
			}
		}
		// only ignored tokens in front, allowed
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	private startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.SGsLMark,
			text: '/',
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.SGsLiteral, mark);
		context.sink(literal);
		context.forward(1);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let c = context.char();
		while (c != null) {
			const parser = SGsLiteralParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser instanceof SGsLiteralEndMarkParser) {
				// end
				break;
			}
			c = context.char();
		}

		context.rise();

		return true;
	}

	static readonly instance = new SGsLiteralParser();
}
