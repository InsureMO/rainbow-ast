import {Char} from '@rainbow-ast/core';
import {ByCharTokenParser, BySingleCharTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export const StandaloneSymbolParsers: Array<ByCharTokenParser> = ([
	['{', T.LBrace],
	['}', T.RBrace],
	['[', T.LBrack],
	[']', T.RBrack],
	['(', T.LParen],
	[')', T.RParen],
	['<', T.LAngle],
	['>', T.RAngle],
	['/', T.Slash],
	['\\', T.Backslash],
	['~', T.Tilde],
	['@', T.At],
	['#', T.Hash],
	['$', T.Dollar],
	['%', T.Percent],
	['^', T.Exponent],
	['&', T.Ampersand],
	['*', T.Asterisk],
	['?', T.QuestionS],
	['-', T.Minus],
	['+', T.Plus],
	['=', T.EqualS],
	['_', T.Underscore],
	['|', T.Pipe],
	['\'', T.Quote],
	['"', T.DblQuote],
	['`', T.BackQuote],
	['.', T.Dot],
	[',', T.Comma],
	[':', T.ColonS],
	[';', T.Semicolon]
] as Array<[Char, GroovyTokenId]>).map(([char, tokenId]) => {
	const ParserClass = class extends BySingleCharTokenParser {
		constructor() {
			super(char);
		}

		protected getTokenId(): GroovyTokenId {
			return tokenId;
		}
	};
	Object.defineProperty(ParserClass, 'name', {value: `Standalone${T[tokenId]}Parser`});
	return new ParserClass();
});

export const DotParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === '.');
