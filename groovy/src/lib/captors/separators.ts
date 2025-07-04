import {Excl, Incl, S, SS} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {ExclNumber, NumberLiteral} from './utils';

export const BracketCaptorDefs: GroovyTokenCaptorDefs = {
	LBrace: {
		patterns: '{',
		forks: [
			{forStates: ExclNumber}
		]
	},
	RBrace: {
		patterns: '}',
		forks: [
			{forStates: [Excl, NumberLiteral, S.GStringInterpolation]}
		]
	},
	LParen: {
		patterns: '(',
		forks: [
			{forStates: ExclNumber}
		]
	},
	RParen: {
		patterns: ')',
		forks: [
			{forStates: ExclNumber}
		]
	},
	LBrack: {
		patterns: '[',
		forks: [
			{forStates: ExclNumber}
		]
	},
	RBrack: {
		patterns: ']',
		forks: [
			{forStates: ExclNumber}
		]
	}
};
export const DotCommaSemicolonCaptorDefs: GroovyTokenCaptorDefs = {
	Semicolon: {
		patterns: '{{Semicolon}}',
		forks: [
			{forStates: ExclNumber}
		]
	},
	Comma: {
		patterns: ',',
		forks: [
			{forStates: ExclNumber}
		]
	},
	Dot: [
		{
			patterns: '.',
			forStates: [
				Excl,
				NumberLiteral,
				S.GStringInterpolationInline, S.GStringInterpolationInlineIdentifierEd, S.GStringInterpolationInlineDotEd
			]
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
		forStates: ExclNumber
	},
	Tabs: {
		patterns: '{{Tab}};{{Tab}}:*',
		forStates: ExclNumber
	},
	Newline: {
		patterns: '{{CarriageReturn}}:?;{{Newline}}',
		forStates: [
			Excl,
			NumberLiteral,
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
