import {CB, EB, Incl, S, T} from '../alias';
import {CFS, Not} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';
import {IsKeywordAllowed, IsSafeIndex, KeywordForks, SlashyGStringStartNotAllowed} from './utils';

export const OperatorCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy operators
	RangeInclusive: {
		patterns: '..',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	RangeExclusiveLeft: {
		patterns: '<..',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	RangeExclusiveRight: {
		patterns: '..<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	RangeExclusiveFull: {
		patterns: '<..<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	SpreadDot: {
		patterns: '*.',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	SafeDot: {
		patterns: '?.',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	SafeIndex: {
		patterns: '?[',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn,
		collect: [CB, T.IndexBlock, S.IndexBlk]
	},
	SafeIndexClose: {
		patterns: ']',
		forStates: [Incl, S.IndexBlk],
		enabledWhen: IsSafeIndex,
		collect: EB
	},
	SafeChainDot: {
		patterns: '??.',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Elvis: {
		patterns: '?{{colon}}',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	ElvisAssign: {
		patterns: '?=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	MethodPointer: {
		patterns: '.&',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	RegexFind: {
		patterns: '=~',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	RegexMatch: {
		patterns: '==~',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Power: {
		patterns: '**',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	PowerAssign: {
		patterns: '**=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Spaceship: {
		patterns: '<=>',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Identical: {
		patterns: '===',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	NotIdentical: {
		patterns: '!==',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	NotInstanceOf: {
		patterns: '!instanceof;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	NotIn: {
		patterns: '!in;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	// operators
	Assign: {
		patterns: '=',
		forStates: Not(CFS.NotCmtNumStrGStrItpInlPkgImpAnn, 'AnnVals', 'AnnVal')
	},
	GreaterThan: {
		patterns: '>',
		forStates: Not(CFS.NotCmtNumStrGStrItpInlPkgImpAnn, S.GenT)
	},
	LessThan: {
		patterns: '<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Not: {
		patterns: '!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Bitnot: {
		patterns: '~',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Question: {
		patterns: '?',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Colon: {
		patterns: '{{Colon}}',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Equal: {
		patterns: '==',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	LessThanOrEqual: {
		patterns: '<=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	GreaterThanOrEqual: {
		patterns: '>=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	NotEqual: {
		patterns: '!=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	And: {
		patterns: '&&',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Or: {
		patterns: '||',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Increase: {
		patterns: '++',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Decrease: {
		patterns: '--',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Add: {
		patterns: '+',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Subtract: {
		patterns: '-',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Multiple: {
		patterns: '*',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Divide: {
		patterns: '/',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn,
		enabledWhen: SlashyGStringStartNotAllowed
	},
	Bitand: {
		patterns: '&',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Bitor: {
		patterns: '|',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Xor: {
		patterns: '^',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Mod: {
		patterns: '%',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Lshift: {
		patterns: '<<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Rshift: {
		patterns: '>>',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Urshift: {
		patterns: '>>>',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	AddAssign: {
		patterns: '+=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	SubtractAssign: {
		patterns: '-=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	MultipleAssign: {
		patterns: '*=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	DivideAssign: {
		patterns: '/=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	BitandAssign: {
		patterns: '&=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	BitorAssign: {
		patterns: '|=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	XorAssign: {
		patterns: '^=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	ModAssign: {
		patterns: '%=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	LshiftAssign: {
		patterns: '<<=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	RshiftAssign: {
		patterns: '>>=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	UrshiftAssign: {
		patterns: '>>>=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Ellipsis: {
		patterns: '...',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	Arrow: {
		patterns: '->',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	MethodReference: {
		patterns: '{{colon}}:2',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn
	},
	// in and instanceof is keyword like
	In: { // "in" can be identified as qualified name
		patterns: 'in;fn#NotJNamePart:!',
		forStates: CFS.Keywords,
		enabledWhen: IsKeywordAllowed
	},
	InstanceOf: {
		patterns: 'instanceof;fn#NotJNamePart:!',
		forks: KeywordForks
	}
};
