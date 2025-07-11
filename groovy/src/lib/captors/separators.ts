import {CB, EB, Excl, Incl, S, SS, T} from '../alias';
import {CFS, SG} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';
import {NotSafeIndex} from './utils';

export const BracketCaptorDefs: GroovyTokenCaptorDefs = {
	LBrace: {
		patterns: '{',
		forks: [
			{forStates: CFS.NotNumGStrItpInl, onCaptured: [CB, T.CodeBlock, S.CodeBlk]}
		]
	},
	RBrace: {
		patterns: '}',
		forks: [
			{forStates: [Excl, SG.Num, SG.GStrItpInl, S.GStrItp, S.CodeBlk]},
			{forStates: [Incl, S.CodeBlk], onCaptured: EB}
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
			{forStates: CFS.NotNumGStrItpInl}
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
			{forStates: [Excl, SG.Num, SG.GStrItpInl, S.IndexBlk]},
			{forStates: [Incl, S.IndexBlk], enabledWhen: NotSafeIndex}
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
			forks: [
				{forStates: [Excl, SG.Num, S.PkgDeclIdEd, S.GStrItpInlIdEd]},
				{forStates: [Incl, S.PkgDeclIdEd], onCaptured: [SS, S.PkgDeclDotEd]}
			]
		},
		{ // in gstring interpolation inline, the next char must be "JNameStartExcl$"
			patterns: '.;fn#JNameStartExcl$:!',
			forStates: [Incl, S.GStrItpInlIdEd],
			onCaptured: [SS, S.GStrItpInlDotEd]
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
			S.ScriptCmd, S.SLCmt,
			S.SQStr, S.SQGStr
		]
	}
};

export const SeparatorCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	BracketCaptorDefs,
	DotCommaSemicolonCaptorDefs,
	WhitespaceTabNewlineCaptorDefs
];
