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

abstract class QSLBadBackslashEscapeParser extends ByCharTokenParser {
	protected constructor() {
		super('\\');
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
}

/**
 * incorrect backslash escape parser, works only for single-quote string literal, triple single-quotes string literal,
 * double-quotes gstring literal and triple double-quotes gstring literal.
 * if there is no character after the backslash,
 * or the character after the backslash is not one of b, f, n, r, t, \, ', ", $, a digit from 0 to 7, or u,
 * then it is determined to be an incorrect escape,
 *
 * SqSL = single-quote string literal, double-quotes gstring literal
 */
export class SqSLBadBackslashEscapeParser extends QSLBadBackslashEscapeParser {
	matches(_: Char, context: ParseContext): boolean {
		return !'bfnrt\\\'"$01234567u'.includes(context.nextChar());
	}

	static readonly instance = new SqSLBadBackslashEscapeParser();
}

/**
 * incorrect backslash escape parser, works only for single-quote string literal, triple single-quotes string literal,
 * double-quotes gstring literal and triple double-quotes gstring literal.
 * for a multiple-lines string:
 * the character after the backslash is not one of b, f, n, r, t, \, ', ", $, a digit from 0 to 7, or u,
 * then it is determined to be an incorrect escape,
 *
 * TqSL = triple single-quotes string literal, triple double-quotes gstring literal
 */
export class TqSLBadBackslashEscapeParser extends QSLBadBackslashEscapeParser {
	matches(_: Char, context: ParseContext): boolean {
		const nextChar = context.nextChar();

		if (nextChar == null) {
			return false;
		} else if (nextChar === '\n') {
			return false;
		} else if (nextChar === '\r' && context.charAt(context.charIndex + 2) === '\n') {
			return false;
		} else {
			return !'bfnrt\\\'"$01234567u'.includes(nextChar);
		}
	}

	static readonly instance = new TqSLBadBackslashEscapeParser();
}
