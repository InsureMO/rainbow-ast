import {AtomicToken, Char} from '@rainbow-ast/core';
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

export class BackslashStartedEscapeParser<E extends Escape> extends ByCharTokenParser {
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

	static readonly instanceB = new BackslashStartedEscapeParser('b', T.BackspaceEscape);
	static readonly instanceF = new BackslashStartedEscapeParser('f', T.FormFeedEscape);
	static readonly instanceN = new BackslashStartedEscapeParser('n', T.NewlineEscape);
	static readonly instanceR = new BackslashStartedEscapeParser('r', T.CarriageReturnEscape);
	static readonly instanceT = new BackslashStartedEscapeParser('t', T.TabulationEscape);
	static readonly instanceBackslash = new BackslashStartedEscapeParser('\\', T.BackslashEscape);
	static readonly instanceSingleQuote = new BackslashStartedEscapeParser('\'', T.SingleQuoteEscape);
	static readonly instanceDoubleQuotes = new BackslashStartedEscapeParser('"', T.DoubleQuotesEscape);
	static readonly instanceDollar = new BackslashStartedEscapeParser('$', T.DollarEscape);
	static readonly instanceSlash = new BackslashStartedEscapeParser('/', T.SlashEscape);
}

/**
 * for single-quote string, triple-single-quotes string, double-quotes gstring, triple-double-quotes gstring
 */
export const BackslashStartedEscapeParsers = [
	BackslashStartedEscapeParser.instanceB,
	BackslashStartedEscapeParser.instanceF,
	BackslashStartedEscapeParser.instanceN,
	BackslashStartedEscapeParser.instanceR,
	BackslashStartedEscapeParser.instanceT,
	BackslashStartedEscapeParser.instanceBackslash,
	BackslashStartedEscapeParser.instanceSingleQuote,
	BackslashStartedEscapeParser.instanceDoubleQuotes,
	BackslashStartedEscapeParser.instanceDollar
];

// TODO incorrect backslash escape parser