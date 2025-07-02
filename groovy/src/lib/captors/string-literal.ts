import {CB, EB, Excl, Incl, S, T} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {CommentNumberString} from './utils';

// export const StringLiteralPatterns = {
// 	GStringMark: '"',
// 	GStringMarkML: '"""',
// 	SlashyGStringMark: '/',
// 	DollarSlashyGStringStartMark: '$/',
// 	DollarSlashyGStringEndMark: '/$',
// 	StringSingleQuoteEscape: '\\',
// 	StringDoubleQuoteEscape: '\\"',
// 	StringDollarEscape: '\\$',
// 	SlashyGStringSlashEscape: '\\/',
// 	DollarSlashyGStringDollarEscape: '$$',
// 	DollarSlashyGStringSlashEscape: '$/',
// 	GStringInterpolationStartMark: '$',
// 	GStringInterpolationLBraceStartMark: '${',
// 	GStringInterpolationRBraceEndMark: '}',
// 	StringMLNewlineEraser: '\\'
// };
export const StringLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	StringMark: {
		patterns: '\'',
		forks: [
			{
				forStates: [Excl, CommentNumberString],
				onCaptured: [CB, T.StringLiteral, S.SingleQuoteStringLiteral]
			},
			{
				forStates: [Incl, S.SingleQuoteStringLiteral],
				onCaptured: EB
			}
		]
	},
	StringMarkML: {
		patterns: '\':3',
		forks: [
			{
				forStates: [Excl, CommentNumberString],
				onCaptured: [CB, T.StringLiteral, S.TripleQuotesStringLiteral]
			},
			{
				forStates: [Incl, S.TripleQuotesStringLiteral],
				onCaptured: EB
			}
		]
	}
};
export const StringLiteralEscapeCaptorDefs: GroovyTokenCaptorDefs = {
	StringBackspaceEscape: {
		patterns: '\\b',
		forStates: [
			Incl,
			S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral
		]
	},
	StringFormFeedEscape: {
		patterns: '\\f',
		forStates: [
			Incl,
			S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral
		]
	},
	StringNewlineEscape: {
		patterns: '\\\\n', // \ + n
		forStates: [
			Incl,
			S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral
		]
	},
	StringCarriageReturnEscape: {
		patterns: '\\\\r', // \ + r
		forStates: [
			Incl,
			S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral
		]
	},
	StringTabulationEscape: {
		patterns: '\\\\t', // \ + t
		forStates: [
			Incl,
			S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral
		]
	},
	StringBackslashEscape: {
		patterns: '\\/',
		forStates: [
			Incl,
			S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral
		]
	},
	StringOctal: {
		patterns: '\\;fn#Oct:1,3',
		forStates: [
			Incl,
			S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral
		]
	},
	StringUnicode: {
		patterns: '\\u;fn#Hex:4',
		forStates: [
			Incl,
			S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral
		]
	}
};

export const StringCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	StringLiteralCaptorDefs,
	StringLiteralEscapeCaptorDefs
];
