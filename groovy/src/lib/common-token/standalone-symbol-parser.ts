import {Char} from '@rainbow-ast/core';
import {BySingleCharTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class StandaloneSymbolParser extends BySingleCharTokenParser {
	private readonly _tokenId: GroovyTokenId;

	constructor(char: Char, tokenId: GroovyTokenId) {
		super(char);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}
}

export const StandaloneSymbolParsers = ([
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
] as Array<[Char, GroovyTokenId]>)
	.map(([char, tokenId]) => new StandaloneSymbolParser(char, tokenId));

export const RBraceParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === '}');
export const RParenParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === ')');
export const RAngleParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === '>');
export const AsteriskParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === '*');
export const PipeParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === '|');
export const DotParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === '.');
export const CommaParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === ',');
export const ColonParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === ':');
export const SemicolonParserInstance = StandaloneSymbolParsers.find(p => p.firstChar === ';');

// export const NotBlockStartSymbolParserInstances = StandaloneSymbolParsers.filter(p => {
// 	![
// 		/*'{',*/ '}',
// 		/*'[',*/ ']',
// 		/*'(',*/ ')',
// 		/*'<', '>',
// 		'/',*/ '\\',
// 		/*'~',*/ '@', '#', /*'$', '%', '^', '&', '*', '?', '-', '+', '=', '_', '|', '\'', '"',*/
// 		'`',
// 		/*'.',*/ ',' /*':', ';'*/
// 	].includes(p.firstChar);
// });
