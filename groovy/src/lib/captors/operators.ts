import {CB, EB, Incl, S, T} from '../alias';
import {CFS, Not} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';
import {IsKeywordAllowed, IsSafeIndex, KeywordForks, SlashyGStringStartNotAllowed} from './utils';

export const OperatorCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy operators
	RangeInclusive: {
		patterns: '..',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	RangeExclusiveLeft: {
		patterns: '<..',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	RangeExclusiveRight: {
		patterns: '..<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	RangeExclusiveFull: {
		patterns: '<..<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	SpreadDot: {
		patterns: '*.',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	SafeDot: {
		patterns: '?.',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	SafeIndex: {
		patterns: '?[',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp,
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
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Elvis: {
		patterns: '?{{colon}}',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	ElvisAssign: {
		patterns: '?=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	MethodPointer: {
		patterns: '.&',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	RegexFind: {
		patterns: '=~',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	RegexMatch: {
		patterns: '==~',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Power: {
		patterns: '**',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	PowerAssign: {
		patterns: '**=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Spaceship: {
		patterns: '<=>',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Identical: {
		patterns: '===',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	NotIdentical: {
		patterns: '!==',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	NotInstanceOf: {
		patterns: '!instanceof;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	NotIn: {
		patterns: '!in;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	// operators
	Assign: {
		patterns: '=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	GreaterThan: {
		patterns: '>',
		forStates: Not(CFS.NotCmtNumStrGStrItpInlPkgImp, S.GenT)
	},
	LessThan: {
		patterns: '<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Not: {
		patterns: '!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Bitnot: {
		patterns: '~',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Question: {
		patterns: '?',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Colon: {
		patterns: '{{Colon}}',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Equal: {
		patterns: '==',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	LessThanOrEqual: {
		patterns: '<=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	GreaterThanOrEqual: {
		patterns: '>=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	NotEqual: {
		patterns: '!=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	And: {
		patterns: '&&',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Or: {
		patterns: '||',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Increase: {
		patterns: '++',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Decrease: {
		patterns: '--',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Add: {
		patterns: '+',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Subtract: {
		patterns: '-',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Multiple: {
		patterns: '*',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Divide: {
		patterns: '/',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp,
		enabledWhen: SlashyGStringStartNotAllowed
	},
	Bitand: {
		patterns: '&',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Bitor: {
		patterns: '|',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Xor: {
		patterns: '^',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Mod: {
		patterns: '%',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Lshift: {
		patterns: '<<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Rshift: {
		patterns: '>>',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Urshift: {
		patterns: '>>>',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	AddAssign: {
		patterns: '+=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	SubtractAssign: {
		patterns: '-=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	MultipleAssign: {
		patterns: '*=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	DivideAssign: {
		patterns: '/=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	BitandAssign: {
		patterns: '&=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	BitorAssign: {
		patterns: '|=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	XorAssign: {
		patterns: '^=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	ModAssign: {
		patterns: '%=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	LshiftAssign: {
		patterns: '<<=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	RshiftAssign: {
		patterns: '>>=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	UrshiftAssign: {
		patterns: '>>>=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Ellipsis: {
		patterns: '...',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	Arrow: {
		patterns: '->',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	MethodReference: {
		patterns: '{{colon}}:2',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp
	},
	// in and instanceof is keyword like
	In: { // "in" can be identified as qualified name
		patterns: 'in;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImp,
		enabledWhen: IsKeywordAllowed
	},
	InstanceOf: {
		patterns: 'instanceof;fn#NotJNamePart:!',
		forks: KeywordForks()
	}
};
