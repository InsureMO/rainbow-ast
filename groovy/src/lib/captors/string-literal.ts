import {AstBuildContext, TokenCaptorStates} from '@rainbow-ast/core';
import {CB, CE, EB, Incl, S, T} from '../alias';
import {GroovyAstBuildState} from '../ast-build-state';
import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberStringGStringInterpolationInline, IsSlashyGStringStartAllowed, StringLiteral} from './utils';

const NotSlashyOrDollar: TokenCaptorStates<GroovyAstBuildState> = [Incl, S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral, S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral];

export const StringLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	StringMark: {
		patterns: '\'',
		forks: [
			{
				forStates: ExclCommentNumberStringGStringInterpolationInline,
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
				forStates: ExclCommentNumberStringGStringInterpolationInline,
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
				forStates: ExclCommentNumberStringGStringInterpolationInline,
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
				forStates: ExclCommentNumberStringGStringInterpolationInline,
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
				forStates: ExclCommentNumberStringGStringInterpolationInline,
				enabledWhen: IsSlashyGStringStartAllowed,
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
		forStates: ExclCommentNumberStringGStringInterpolationInline,
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
	StringMLNewlineEraser: [
		{
			patterns: '{{Backslash}};{{CarriageReturn}}:!;{{Newline}}:!',
			forStates: [Incl, S.TripleQuotesStringLiteral, S.TripleQuotesGStringLiteral, S.SlashyGStringLiteral, S.DollarSlashyGStringLiteral]
		},
		{
			patterns: '{{Backslash}};{{Newline}}:!',
			forStates: [Incl, S.TripleQuotesStringLiteral, S.TripleQuotesGStringLiteral, S.SlashyGStringLiteral, S.DollarSlashyGStringLiteral]
		}
	]
};

/**
 * dollar slashy gstring, basically same as slashy string, but has special scenarios as below:
 * 1. when $ is follows $$ directly, it creates interpolation only when there is at least one interpolation before me
 * 2. when $ is follows $/ directly, it is a char anyway
 * 3. when $ is follows multiple $$s, and before these $$s is $/, it is a char anyway
 */
export const IsInterpolationInDollarSlashyGStringStartAllowed = (context: AstBuildContext): boolean => {
	const block = context.currentBlock;
	const children = block.children;
	const lastChildIndex = children.length - 1;
	const lastChild = children[lastChildIndex];
	if (lastChild.id === T.DollarSlashyGStringSlashEscape) {
		// previous is slash escape, not allow
		return false;
	}
	if (lastChild.id !== T.DollarSlashyGStringDollarEscape) {
		// previous is not slash escape or dollar escape, allow
		return true;
	}

	// previous is dollar escape
	let childIndex = lastChildIndex - 1;
	while (childIndex > 0) {
		const child = children[childIndex];
		if (child.id === T.DollarSlashyGStringDollarEscape) {
			// a dollar escape, continue check
			childIndex--;
		} else if (child.id === T.DollarSlashyGStringSlashEscape) {
			// only dollar escape between slash escape and last dollar escape, not allow
			return false;
		} else if (child.id === T.GStringInterpolation) {
			// interpolation exists, allow
			return true;
		} else {
			// other token, continue check
			childIndex--;
		}
	}
	// no interpolation found, not allow
	return false;
};

export const GStringInterpolationCaptorDefs: GroovyTokenCaptorDefs = {
	GStringInterpolationStartMark: [
		{
			patterns: '$;fn#JNameStartExcl$:!',
			forStates: [Incl, S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral],
			onCaptured: [CB, T.GStringInterpolation, S.GStringInterpolationInline]
		},
		{
			// for gstring, $ always start interpolation, even the following part is not an identifier
			patterns: '$;fn#$OrNotJNameStart:!',
			forStates: [Incl, S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral],
			onCaptured: [CE, T.GStringInterpolation, S.GStringInterpolationInline]
		},
		{
			patterns: '$;fn#JNameStartExcl$:!',
			forks: [
				{ // slashy gstring, $ which follows with JNameStart(not $) char, is start of interpolation
					forStates: [Incl, S.SlashyGStringLiteral],
					onCaptured: [CB, T.GStringInterpolation, S.GStringInterpolationInline]
				},
				{
					forStates: [Incl, S.DollarSlashyGStringLiteral],
					enabledWhen: IsInterpolationInDollarSlashyGStringStartAllowed,
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
				forStates: [Incl, S.DollarSlashyGStringLiteral],
				enabledWhen: IsInterpolationInDollarSlashyGStringStartAllowed,
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
