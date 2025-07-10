import {EB, Excl, Incl, S, SS} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {ExclNumberGStringInterpolationInline, GStringInterpolationInline, NotSafeIndex, NumberLiteral} from './utils';

export const BracketCaptorDefs: GroovyTokenCaptorDefs = {
	LBrace: {
		patterns: '{',
		forks: [
			{forStates: ExclNumberGStringInterpolationInline}
		]
	},
	RBrace: {
		patterns: '}',
		forks: [
			{
				forStates: [Excl, NumberLiteral, GStringInterpolationInline, S.GStringInterpolation],
				onCaptured: EB
			}
		]
	},
	LParen: {
		patterns: '(',
		forks: [
			{forStates: ExclNumberGStringInterpolationInline}
		]
	},
	RParen: {
		patterns: ')',
		forks: [
			{
				forStates: ExclNumberGStringInterpolationInline,
				onCaptured: EB
			}
		]
	},
	LBrack: {
		patterns: '[',
		forks: [
			{forStates: ExclNumberGStringInterpolationInline}
		]
	},
	RBrack: {
		patterns: ']',
		forks: [
			{
				forStates: [Excl, NumberLiteral, GStringInterpolationInline, S.IndexBlock],
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
			{forStates: ExclNumberGStringInterpolationInline}
		]
	},
	Comma: {
		patterns: ',',
		forks: [
			{forStates: ExclNumberGStringInterpolationInline}
		]
	},
	Dot: [
		{
			patterns: '.',
			forStates: ExclNumberGStringInterpolationInline
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
		forStates: ExclNumberGStringInterpolationInline
	},
	Tabs: {
		patterns: '{{Tab}};{{Tab}}:*',
		forStates: ExclNumberGStringInterpolationInline
	},
	Newline: {
		patterns: '{{CarriageReturn}}:?;{{Newline}}',
		forStates: [
			Excl,
			NumberLiteral, GStringInterpolationInline,
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
