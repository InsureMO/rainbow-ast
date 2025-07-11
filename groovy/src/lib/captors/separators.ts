import {EB, Excl, Incl, S, SS} from '../alias';
import {CFS, SG} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';
import {NotSafeIndex} from './utils';

export const BracketCaptorDefs: GroovyTokenCaptorDefs = {
	LBrace: {
		patterns: '{',
		forks: [
			{forStates: CFS.NotNumGStrItpInl}
		]
	},
	RBrace: {
		patterns: '}',
		forks: [
			{
				forStates: [Excl, SG.Num, SG.GStrItpInl, S.GStringInterpolation],
				onCaptured: EB
			}
		]
	},
	LParen: {
		patterns: '(',
		forks: [
			{forStates: CFS.NotNumGStrItpInl}
		]
	},
	RParen: {
		patterns: ')',
		forks: [
			{
				forStates: CFS.NotNumGStrItpInl,
				onCaptured: EB
			}
		]
	},
	LBrack: {
		patterns: '[',
		forks: [
			{forStates: CFS.NotNumGStrItpInl}
		]
	},
	RBrack: {
		patterns: ']',
		forks: [
			{
				forStates: [Excl, SG.Num, SG.GStrItpInl, S.IndexBlock],
				onCaptured: EB
			},
			{
				forStates: [Incl, S.IndexBlock],
				enabledWhen: NotSafeIndex,
				onCaptured: EB
			}
		]
	}
};
export const DotCommaSemicolonCaptorDefs: GroovyTokenCaptorDefs = {
	Semicolon: {
		patterns: '{{Semicolon}}',
		forks: [
			{forStates: CFS.NotNumGStrItpInl}
		]
	},
	Comma: {
		patterns: ',',
		forks: [
			{forStates: CFS.NotNumGStrItpInl}
		]
	},
	Dot: [
		{
			patterns: '.',
			forStates: CFS.NotNumGStrItpInl
		},
		{ // in gstring interpolation inline, the next char must be "JNameStartExcl$"
			patterns: '.;fn#JNameStartExcl$:!',
			forStates: [Incl, S.GStringInterpolationInlineIdentifierEd],
			onCaptured: [SS, S.GStringInterpolationInlineDotEd]
		}
	]
};
export const WhitespaceTabNewlineCaptorDefs: GroovyTokenCaptorDefs = {
	Whitespaces: {
		patterns: '{{Space}};{{Space}}:*',
		forStates: CFS.NotNumGStrItpInl
	},
	Tabs: {
		patterns: '{{Tab}};{{Tab}}:*',
		forStates: CFS.NotNumGStrItpInl
	},
	Newline: {
		patterns: '{{CarriageReturn}}:?;{{Newline}}',
		forStates: [
			Excl,
			SG.Num, SG.GStrItpInl,
			S.ScriptCommand, S.SLComment,
			S.SingleQuoteStringLiteral, S.SingleQuoteGStringLiteral
		]
	}
};

export const SeparatorCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	BracketCaptorDefs,
	DotCommaSemicolonCaptorDefs,
	WhitespaceTabNewlineCaptorDefs
];
