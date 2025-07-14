import {CB, EB, Incl, S, T} from '../alias';
import {CFS, Not} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';
import {IsKeywordAllowed, IsSafeIndex, KeywordForks, SlashyGStringStartNotAllowed} from './utils';

export const OperatorCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy operators
	RangeInclusive: {
		patterns: '..',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	RangeExclusiveLeft: {
		patterns: '<..',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	RangeExclusiveRight: {
		patterns: '..<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	RangeExclusiveFull: {
		patterns: '<..<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	SpreadDot: {
		patterns: '*.',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	SafeDot: {
		patterns: '?.',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	SafeIndex: {
		patterns: '?[',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg,
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
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Elvis: {
		patterns: '?{{colon}}',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	ElvisAssign: {
		patterns: '?=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	MethodPointer: {
		patterns: '.&',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	RegexFind: {
		patterns: '=~',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	RegexMatch: {
		patterns: '==~',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Power: {
		patterns: '**',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	PowerAssign: {
		patterns: '**=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Spaceship: {
		patterns: '<=>',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Identical: {
		patterns: '===',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	NotIdentical: {
		patterns: '!==',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	NotInstanceOf: {
		patterns: '!instanceof;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	NotIn: {
		patterns: '!in;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	// operators
	Assign: {
		patterns: '=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	GreaterThan: {
		patterns: '>',
		forStates: Not(CFS.NotCmtNumStrGStrItpInlPkg, S.GenT)
	},
	LessThan: {
		patterns: '<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Not: {
		patterns: '!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Bitnot: {
		patterns: '~',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Question: {
		patterns: '?',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Colon: {
		patterns: '{{Colon}}',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Equal: {
		patterns: '==',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	LessThanOrEqual: {
		patterns: '<=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	GreaterThanOrEqual: {
		patterns: '>=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	NotEqual: {
		patterns: '!=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	And: {
		patterns: '&&',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Or: {
		patterns: '||',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Increase: {
		patterns: '++',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Decrease: {
		patterns: '--',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Add: {
		patterns: '+',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Subtract: {
		patterns: '-',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Multiple: {
		patterns: '*',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Divide: {
		patterns: '/',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg,
		enabledWhen: SlashyGStringStartNotAllowed
	},
	Bitand: {
		patterns: '&',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Bitor: {
		patterns: '|',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Xor: {
		patterns: '^',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Mod: {
		patterns: '%',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Lshift: {
		patterns: '<<',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Rshift: {
		patterns: '>>',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Urshift: {
		patterns: '>>>',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	AddAssign: {
		patterns: '+=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	SubtractAssign: {
		patterns: '-=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	MultipleAssign: {
		patterns: '*=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	DivideAssign: {
		patterns: '/=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	BitandAssign: {
		patterns: '&=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	BitorAssign: {
		patterns: '|=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	XorAssign: {
		patterns: '^=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	ModAssign: {
		patterns: '%=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	LshiftAssign: {
		patterns: '<<=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	RshiftAssign: {
		patterns: '>>=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	UrshiftAssign: {
		patterns: '>>>=',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Ellipsis: {
		patterns: '...',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	Arrow: {
		patterns: '->',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	MethodReference: {
		patterns: '{{colon}}:2',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	},
	// in and instanceof is keyword like
	In: { // "in" can be identified as qualified name
		patterns: 'in;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg,
		enabledWhen: IsKeywordAllowed
	},
	InstanceOf: {
		patterns: 'instanceof;fn#NotJNamePart:!',
		forks: KeywordForks()
	}
};
