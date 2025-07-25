import {AtomicToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

type Escape =
	| ['b', GroovyTokenId.BackspaceEscape]
	| ['f', GroovyTokenId.FormFeedEscape]
	| ['n', GroovyTokenId.NewlineEscape]
	| ['r', GroovyTokenId.CarriageReturnEscape]
	| ['t', GroovyTokenId.TabulationEscape]
	| ['\\', GroovyTokenId.BackslashEscape]
	| ['\'', GroovyTokenId.SingleQuoteEscape]
	| ['"', GroovyTokenId.DoubleQuotesEscape]
	| ['$', GroovyTokenId.DollarEscape]
	| ['/', GroovyTokenId.SlashEscape];

export class BackslashEscapeParser<E extends Escape> extends ByCharTokenParser {
	private readonly _secondChar: E[0];
	private readonly _tokenId: E[1];

	constructor(secondChar: E[0], tokenId: E[1]) {
		super('\\');
		this._secondChar = secondChar;
		this._tokenId = tokenId;
	}

	get secondChar(): E[0] {
		return this._secondChar;
	}

	get tokenId(): E[1] {
		return this._tokenId;
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === this._secondChar;
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const escape = new AtomicToken({
			id: this._tokenId,
			text: '\\' + this._secondChar,
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(escape);
		context.forward(2);
		return true;
	}

	static readonly instanceB = new BackslashEscapeParser('b', T.BackspaceEscape);
	static readonly instanceF = new BackslashEscapeParser('f', T.FormFeedEscape);
	static readonly instanceN = new BackslashEscapeParser('n', T.NewlineEscape);
	static readonly instanceR = new BackslashEscapeParser('r', T.CarriageReturnEscape);
	static readonly instanceT = new BackslashEscapeParser('t', T.TabulationEscape);
	static readonly instanceBackslash = new BackslashEscapeParser('\\', T.BackslashEscape);
	static readonly instanceSingleQuote = new BackslashEscapeParser('\'', T.SingleQuoteEscape);
	static readonly instanceDoubleQuotes = new BackslashEscapeParser('"', T.DoubleQuotesEscape);
	static readonly instanceDollar = new BackslashEscapeParser('$', T.DollarEscape);
	/** for slashy gstring literal only */
	static readonly instanceSlash = new BackslashEscapeParser('/', T.SlashEscape);
}

/**
 * for single-quote string literal, triple single-quotes string literal,
 * double-quotes gstring literal, triple double-quotes gstring literal.
 * QSL = quote string literal.
 */
export const QSLBackslashEscapeParsers = [
	BackslashEscapeParser.instanceB,
	BackslashEscapeParser.instanceF,
	BackslashEscapeParser.instanceN,
	BackslashEscapeParser.instanceR,
	BackslashEscapeParser.instanceT,
	BackslashEscapeParser.instanceBackslash,
	BackslashEscapeParser.instanceSingleQuote,
	BackslashEscapeParser.instanceDoubleQuotes,
	BackslashEscapeParser.instanceDollar
];

/**
 * incorrect backslash escape parser, works only for single-quote string literal, triple single-quotes string literal,
 * double-quotes gstring literal and triple double-quotes gstring literal.
 * 1. for a single-line string:
 *    if there is no character after the backslash,
 *    or the character after the backslash is not one of b, f, n, r, t, \, ', ", $, a digit from 0 to 7, or u,
 *    then it is determined to be an incorrect escape,
 * 2. for a multiple-lines string:
 *    the character after the backslash is not one of b, f, n, r, t, \, ', ", $, a digit from 0 to 7, or u,
 *    then it is determined to be an incorrect escape,
 *
 * QSL = quote string literal.
 */
export class QSLBadBackslashEscapeParser extends ByCharTokenParser {
	constructor() {
		super('\\');
	}

	matches(_: Char, context: ParseContext): boolean {
		const block = context.block();
		const blockTokenId = block.id;

		const nextChar = context.nextChar();

		if (blockTokenId === T.SsqSLiteral || blockTokenId === T.SdqGsLiteral) {
			return !'bfnrt\\\'"$01234567u'.includes(nextChar);
		} else {
			return nextChar != null && !'bfnrt\\\'"$01234567u'.includes(nextChar);
		}
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		let nextChar = context.nextChar() ?? '';
		if (JCM.Tnr(nextChar) || JCM.Whitespace(nextChar)) {
			nextChar = '';
		}
		const escape = new AtomicToken({
			id: T.BadEscape,
			text: '\\' + nextChar,
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(escape);
		context.forward(1 + nextChar.length);
		return true;
	}

	static readonly instance = new QSLBadBackslashEscapeParser();
}
