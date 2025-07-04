import {TokenCaptorStates} from '@rainbow-ast/core';
import {CB, CE, EB, Excl, Incl, S, T} from '../alias';
import {GroovyAstBuildState} from '../ast-build-state';
import {GroovyTokenCaptorDefs} from './types';
import {CommentNumberString, GStringInterpolationInline, StringLiteral} from './utils';

const NotSlashyOrDollar: TokenCaptorStates<GroovyAstBuildState> = [Incl, S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral, S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral];

export const StringLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	StringMark: {
		patterns: '\'',
		forks: [
			{
				forStates: [Excl, CommentNumberString, GStringInterpolationInline],
				onCaptured: [CB, T.StringLiteral, S.SingleQuoteStringLiteral]
			},
			// following are excluded by first fork
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
				forStates: [Excl, CommentNumberString, GStringInterpolationInline],
				onCaptured: [CB, T.StringLiteral, S.TripleQuotesStringLiteral]
			},
			// following are excluded by first fork
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
				forStates: [Excl, CommentNumberString, GStringInterpolationInline],
				onCaptured: [CB, T.GStringLiteral, S.SingleQuoteGStringLiteral]
			},
			// following are excluded by first fork
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
				forStates: [Excl, CommentNumberString, GStringInterpolationInline],
				onCaptured: [CB, T.GStringLiteral, S.TripleQuotesGStringLiteral]
			},
			// following are excluded by first fork
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
				forStates: [Excl, CommentNumberString, GStringInterpolationInline],
				onCaptured: [CB, T.SlashyGStringLiteral, S.SlashyGStringLiteral]
			},
			// following are excluded by first fork
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
		forStates: [Excl, CommentNumberString, GStringInterpolationInline],
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
		patterns: '{{Backslash}}b',
		forStates: NotSlashyOrDollar
	},
	StringFormFeedEscape: {
		patterns: '{{Backslash}}f',
		forStates: NotSlashyOrDollar
	},
	StringNewlineEscape: {
		patterns: '{{Backslash}}n', // \ + n
		forStates: NotSlashyOrDollar
	},
	StringCarriageReturnEscape: {
		patterns: '{{Backslash}}r', // \ + r
		forStates: NotSlashyOrDollar
	},
	StringTabulationEscape: {
		patterns: '{{Backslash}}t', // \ + t
		forStates: NotSlashyOrDollar
	},
	StringBackslashEscape: {
		patterns: '{{Backslash}}:2',
		forStates: NotSlashyOrDollar
	},
	StringSingleQuoteEscape: {
		patterns: '{{Backslash}}\'',
		forStates: NotSlashyOrDollar
	},
	StringDoubleQuotesEscape: {
		patterns: '{{Backslash}}"',
		forStates: NotSlashyOrDollar
	},
	StringDollarEscape: {
		patterns: '{{Backslash}}$',
		forStates: NotSlashyOrDollar
	},
	SlashyGStringSlashEscape: {
		patterns: '{{Backslash}}/',
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
		patterns: '{{Backslash}};fn#Oct:1,3',
		forStates: NotSlashyOrDollar
	},
	StringUnicode: {
		patterns: '{{Backslash}}u;fn#Hex:4',
		forStates: [Incl, StringLiteral]
	}
};
export const GStringMarkCaptorDefs: GroovyTokenCaptorDefs = {
	StringMLNewlineEraser: {
		patterns: '{{Backslash}};{{CarriageReturn}}:?;{{Newline}}',
		forStates: [Incl, S.TripleQuotesStringLiteral, S.TripleQuotesGStringLiteral, S.SlashyGStringLiteral, S.DollarSlashyGStringLiteral]
	}
};
export const GStringInterpolationCaptorDefs: GroovyTokenCaptorDefs = {
	GStringInterpolationStartMark: [
		{
			patterns: '$;JNameStartExcl$:!',
			forStates: [Incl, S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral],
			onCaptured: [CB, T.GStringInterpolation, S.GStringInterpolationInline]
		},
		{
			// for gstring, $ always start interpolation, even the following part is not an identifier
			patterns: '$',
			forStates: [Incl, S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral],
			onCaptured: [CE, T.GStringInterpolation, S.GStringInterpolationInline]
		},
		{
			patterns: '$;JNameStartExcl$:!',
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
