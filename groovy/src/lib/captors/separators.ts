import {Excl, Incl, S, SS} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {ExclNumberGStringInterpolationInline, GStringInterpolationInline, NumberLiteral} from './utils';

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
			{forStates: [Excl, NumberLiteral, GStringInterpolationInline, S.GStringInterpolation]}
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
			{forStates: ExclNumberGStringInterpolationInline}
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
			{forStates: ExclNumberGStringInterpolationInline}
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
