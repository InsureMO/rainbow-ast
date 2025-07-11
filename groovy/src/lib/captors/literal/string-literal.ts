import {AstBuildContext, TokenCaptorStates} from '@rainbow-ast/core';
import {CB, CE, EB, Incl, S, SS, T} from '../../alias';
import {GroovyAstBuildState} from '../../ast-build-state';
import {CFS, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsSlashyGStringStartAllowed} from '../utils';

const NotSlashyOrDollar: TokenCaptorStates<GroovyAstBuildState> = [Incl, S.SQStr, S.TQStr, S.SQGStr, S.TQGStr];

export const StringLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	StringMark: {
		patterns: '\'',
		forks: [
			{
				forStates: CFS.NotCmtNumStrGStrItpInlPkg,
				onCaptured: [CB, T.StringLiteral, S.SQStr]
			},
			// following are excluded by first fork
			{
				forStates: [Incl, S.SQStr],
				onCaptured: EB
			}
		]
	},
	StringMarkML: {
		patterns: '\':3',
		forks: [
			{
				forStates: CFS.NotCmtNumStrGStrItpInlPkg,
				onCaptured: [CB, T.StringLiteral, S.TQStr]
			},
			// following are excluded by first fork
			{
				forStates: [Incl, S.TQStr],
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
				forStates: CFS.NotCmtNumStrGStrItpInlPkg,
				onCaptured: [CB, T.GStringLiteral, S.SQGStr]
			},
			// following are excluded by first fork
			{
				forStates: [Incl, S.SQGStr],
				onCaptured: EB
			}
		]
	},
	GStringMarkML: {
		patterns: '":3',
		forks: [
			{
				forStates: CFS.NotCmtNumStrGStrItpInlPkg,
				onCaptured: [CB, T.GStringLiteral, S.TQGStr]
			},
			// following are excluded by first fork
			{
				forStates: [Incl, S.TQGStr],
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
				forStates: CFS.NotCmtNumStrGStrItpInlPkg,
				enabledWhen: IsSlashyGStringStartAllowed,
				onCaptured: [CB, T.SlashyGStringLiteral, S.SGStr]
			},
			// following are excluded by first fork
			{
				forStates: [Incl, S.SGStr],
				onCaptured: EB
			}
		]
	}
};
export const DollarSlashyGStringLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	DollarSlashyGStringStartMark: {
		patterns: '$/',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg,
		onCaptured: [CB, T.DollarSlashyGStringLiteral, S.DSGStr]
	},
	DollarSlashyGStringEndMark: {
		patterns: '/$',
		forStates: [Incl, S.DSGStr],
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
		forStates: [Incl, S.SGStr]
	},
	DollarSlashyGStringSlashEscape: {
		patterns: '$/',
		forStates: [Incl, S.DSGStr]
	},
	DollarSlashyGStringDollarEscape: {
		patterns: '$$',
		forStates: [Incl, S.DSGStr]
	},
	StringOctal: {
		patterns: '{{Backslash}};fn#Oct:1,3',
		forStates: NotSlashyOrDollar
	},
	StringUnicode: {
		patterns: '{{Backslash}}u;fn#Hex:4',
		forStates: [Incl, SG.Str]
	}
};
export const GStringMarkCaptorDefs: GroovyTokenCaptorDefs = {
	StringMLNewlineEraser: [
		{
			patterns: '{{Backslash}};{{CarriageReturn}}:!;{{Newline}}:!',
			forStates: [Incl, S.TQStr, S.TQGStr, S.SGStr, S.DSGStr]
		},
		{
			patterns: '{{Backslash}};{{Newline}}:!',
			forStates: [Incl, S.TQStr, S.TQGStr, S.SGStr, S.DSGStr]
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
			forStates: [Incl, S.SQGStr, S.TQGStr],
			onCaptured: [CB, T.GStringInterpolation, S.GStrItpInl]
		},
		{
			// for gstring, $ always start interpolation, even the following part is not an identifier
			patterns: '$;fn#$OrNotJNameStart:!',
			forStates: [Incl, S.SQGStr, S.TQGStr],
			onCaptured: [CE, T.GStringInterpolation, S.GStrItpInl]
		},
		{
			patterns: '$;fn#JNameStartExcl$:!',
			forks: [
				{ // slashy gstring, $ which follows with JNameStart(not $) char, is start of interpolation
					forStates: [Incl, S.SGStr],
					onCaptured: [CB, T.GStringInterpolation, S.GStrItpInl]
				},
				{
					forStates: [Incl, S.DSGStr],
					enabledWhen: IsInterpolationInDollarSlashyGStringStartAllowed,
					onCaptured: [CB, T.GStringInterpolation, S.GStrItpInl]
				}
			]
		}
	],
	Dot: { // in gstring interpolation inline, the next char must be "JNameStartExcl$"
		patterns: '.;fn#JNameStartExcl$:!',
		forStates: [Incl, S.GStrItpInlIdEd],
		onCaptured: [SS, S.GStrItpInlDotEd]
	},
	Identifier: {
		patterns: 'fn#JNameStartExcl$;fn#JNamePartExcl$:*;fn#$OrNotJNamePart:!',
		forStates: [Incl, S.GStrItpInl, S.GStrItpInlDotEd],
		onCaptured: [SS, S.GStrItpInlIdEd]
	},
	GStringInterpolationLBraceStartMark: {
		patterns: '${',
		forks: [
			{
				forStates: [Incl, S.SQGStr, S.TQGStr, S.SGStr],
				onCaptured: [CB, T.GStringInterpolation, S.GStrItp]
			},
			{
				forStates: [Incl, S.DSGStr],
				enabledWhen: IsInterpolationInDollarSlashyGStringStartAllowed,
				onCaptured: [CB, T.GStringInterpolation, S.GStrItp]
			}
		]
	},
	GStringInterpolationRBraceEndMark: {
		patterns: '}',
		forStates: [Incl, S.GStrItp],
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
