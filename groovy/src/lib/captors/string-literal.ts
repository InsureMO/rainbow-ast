import {TokenCaptorStates} from '@rainbow-ast/core';
import {CB, EB, Incl, S, T} from '../alias';
import {GroovyAstBuildState} from '../ast-build-state';
import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberString, StringLiteral} from './utils';

const NotSlashyOrDollar: TokenCaptorStates<GroovyAstBuildState> = [Incl, S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral, S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral];

export const StringLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	StringMark: {
		patterns: '\'',
		forks: [
			{
				forStates: ExclCommentNumberString,
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
				forStates: ExclCommentNumberString,
				onCaptured: [CB, T.StringLiteral, S.TripleQuotesStringLiteral]
			},
			{
				forStates: [Incl, S.TripleQuotesStringLiteral],
				onCaptured: EB
			}
		]
	}
};
export const GStringLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	GStringMark: {
		patterns: '"',
		forks: [
			{
				forStates: ExclCommentNumberString,
				onCaptured: [CB, T.GStringLiteral, S.SingleQuoteGStringLiteral]
			},
			{
				forStates: [Incl, S.SingleQuoteGStringLiteral],
				onCaptured: EB
			}
		]
	},
	GStringMarkML: {
		patterns: '":3',
		forks: [
			{
				forStates: ExclCommentNumberString,
				onCaptured: [CB, T.GStringLiteral, S.TripleQuotesGStringLiteral]
			},
			{
				forStates: [Incl, S.TripleQuotesGStringLiteral],
				onCaptured: EB
			}
		]
	}
};
export const SlashyGStringLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	SlashyGStringMark: {
		patterns: '/',
		forks: [
			{
				// TODO has more prerequisites,
				//  1. after operators
				//  2. is start of statement
				//  3. is start of line
				forStates: ExclCommentNumberString,
				onCaptured: [CB, T.SlashyGStringLiteral, S.SlashyGStringLiteral]
			},
			{
				forStates: [Incl, S.SlashyGStringLiteral],
				onCaptured: EB
			}
		]
	}
};
export const DollarSlashyGStringLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	DollarSlashyGStringStartMark: {
		patterns: '$/',
		forStates: ExclCommentNumberString,
		onCaptured: [CB, T.DollarSlashyGStringLiteral, S.DollarSlashyGStringLiteral]
	},
	DollarSlashyGStringEndMark: {
		patterns: '/$',
		forStates: [Incl, S.DollarSlashyGStringLiteral],
		onCaptured: EB
	}
};
export const StringLiteralEscapeCaptorDefs: GroovyTokenCaptorDefs = {
	StringBackspaceEscape: {
		patterns: '\\b',
		forStates: NotSlashyOrDollar
	},
	StringFormFeedEscape: {
		patterns: '\\f',
		forStates: NotSlashyOrDollar
	},
	StringNewlineEscape: {
		patterns: '\\\\n', // \ + n
		forStates: NotSlashyOrDollar
	},
	StringCarriageReturnEscape: {
		patterns: '\\\\r', // \ + r
		forStates: NotSlashyOrDollar
	},
	StringTabulationEscape: {
		patterns: '\\\\t', // \ + t
		forStates: NotSlashyOrDollar
	},
	StringBackslashEscape: {
		patterns: '\\\\',
		forStates: NotSlashyOrDollar
	},
	StringSingleQuoteEscape: {
		patterns: '\\',
		forStates: NotSlashyOrDollar
	},
	StringDoubleQuoteEscape: {
		patterns: '\\"',
		forStates: NotSlashyOrDollar
	},
	StringDollarEscape: {
		patterns: '\\$',
		forStates: NotSlashyOrDollar
	},
	SlashyGStringSlashEscape: {
		patterns: '\\/',
		forStates: [Incl, S.SlashyGStringLiteral]
	},
	DollarSlashyGStringSlashEscape: {
		patterns: '$/',
		forStates: [Incl, S.DollarSlashyGStringLiteral]
	},
	DollarSlashyGStringDollarEscape: {
		patterns: '$$',
		forStates: [Incl, S.DollarSlashyGStringLiteral]
	},
	StringOctal: {
		patterns: '\\;fn#Oct:1,3',
		forStates: NotSlashyOrDollar
	},
	StringUnicode: {
		patterns: '\\u;fn#Hex:4',
		forStates: [Incl, StringLiteral]
	}
};
export const GStringMarkCaptorDefs: GroovyTokenCaptorDefs = {
	StringMLNewlineEraser: {
		patterns: '\\;\\r:?;\\n',
		forStates: [Incl, S.TripleQuotesGStringLiteral, S.SlashyGStringLiteral, S.DollarSlashyGStringLiteral]
	}
};
export const GStringInterpolationCaptorDefs: GroovyTokenCaptorDefs = {
	GStringInterpolationStartMark: [
		{ // for gstring, $ always start, even the following part is not an identifier
			patterns: '$',
			forStates: [Incl, S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral],
			onCaptured: [CB, T.GStringInterpolation, S.GStringInterpolationInline]
		},
		{
			patterns: '$:JNameStartExcl$:!',
			forks: [
				{ // slashy gstring, $ which follows with JNameStart(not $) char, is start of interpolation
					forStates: [Incl, S.SlashyGStringLiteral],
					onCaptured: [CB, T.GStringInterpolation, S.GStringInterpolationInline]
				},
				{
					// TODO dollar slashy gstring, basically same as slashy string, but has special scenarios as below:
					//  1. when $ is follows $$ directly, it creates interpolation only when there is at least one interpolation before me
					//  2. when $ is follows $/ directly, it is a char anyway
					//  3. when $ is follows multiple $$s, and before these $$s is $/, it is a char anyway
					forStates: [Incl, S.DollarSlashyGStringLiteral],
					onCaptured: [CB, T.GStringInterpolation, S.GStringInterpolationInline]
				}
			]
		}
	],
	GStringInterpolationLBraceStartMark: {
		patterns: '${',
		forks: [
			{
				forStates: [Incl, S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral, S.SlashyGStringLiteral],
				onCaptured: [CB, T.GStringInterpolation, S.GStringInterpolation]
			},
			{
				// TODO dollar slashy gstring, basically same as slashy string, but has special scenarios as below:
				//  1. when "${" is follows $$ directly, it creates interpolation only when there is at least one interpolation before me
				//  2. when "${" is follows $/ directly, it is a char anyway
				//  3. when "${" is follows multiple $$s, and before these $$s is $/, it is a char anyway
				forStates: [Incl, S.DollarSlashyGStringLiteral],
				onCaptured: [CB, T.GStringInterpolation, S.GStringInterpolation]
			}
		]
	},
	GStringInterpolationRBraceEndMark: {
		patterns: '}',
		forStates: [Incl, S.GStringInterpolation],
		onCaptured: EB
	}
};

export const StringCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	StringLiteralCaptorDefs,
	GStringLiteralCaptorDefs,
	SlashyGStringLiteralCaptorDefs,
	DollarSlashyGStringLiteralCaptorDefs,
	StringLiteralEscapeCaptorDefs,
	GStringMarkCaptorDefs,
	GStringInterpolationCaptorDefs
];
