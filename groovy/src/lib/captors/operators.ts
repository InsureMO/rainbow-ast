import {CB, EB, Excl, Incl, S, T} from '../alias';
import {CFS, SG} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';
import {IsKeywordAllowed, IsSafeIndex, SlashyGStringStartNotAllowed} from './utils';

export const OperatorCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy operators
	RangeInclusive: {
		patterns: '..',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	RangeExclusiveLeft: {
		patterns: '<..',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	RangeExclusiveRight: {
		patterns: '..<',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	RangeExclusiveFull: {
		patterns: '<..<',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	SpreadDot: {
		patterns: '*.',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	SafeDot: {
		patterns: '?.',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	SafeIndex: {
		patterns: '?[',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		onCaptured: [CB, T.IndexBlock, S.IndexBlk]
	},
	SafeIndexClose: {
		patterns: ']',
		forStates: [Incl, S.IndexBlk],
		enabledWhen: IsSafeIndex,
		onCaptured: EB
	},
	SafeChainDot: {
		patterns: '??.',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Elvis: {
		patterns: '?{{colon}}',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	ElvisAssign: {
		patterns: '?=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	MethodPointer: {
		patterns: '.&',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	RegexFind: {
		patterns: '=~',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	RegexMatch: {
		patterns: '==~',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Power: {
		patterns: '**',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	PowerAssign: {
		patterns: '**=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Spaceship: {
		patterns: '<=>',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Identical: {
		patterns: '===',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	NotIdentical: {
		patterns: '!==',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	In: {
		patterns: 'in;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	NotInstanceOf: {
		patterns: '!instanceof;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	NotIn: {
		patterns: '!in;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	// operators
	Assign: {
		patterns: '=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	GreaterThan: {
		patterns: '>',
		forStates: [Excl, SG.Cmt, SG.Num, SG.Str, SG.GStrItpInl, S.GenT]
	},
	LessThan: {
		patterns: '<',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Not: {
		patterns: '!',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Bitnot: {
		patterns: '~',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Question: {
		patterns: '?',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Colon: {
		patterns: '{{Colon}}',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Equal: {
		patterns: '==',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	LessThanOrEqual: {
		patterns: '<=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	GreaterThanOrEqual: {
		patterns: '>=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	NotEqual: {
		patterns: '!=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	And: {
		patterns: '&&',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Or: {
		patterns: '||',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Increase: {
		patterns: '++',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Decrease: {
		patterns: '--',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Add: {
		patterns: '+',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Subtract: {
		patterns: '-',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Multiple: {
		patterns: '*',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Divide: {
		patterns: '/',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: SlashyGStringStartNotAllowed
	},
	Bitand: {
		patterns: '&',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Bitor: {
		patterns: '|',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Xor: {
		patterns: '^',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Mod: {
		patterns: '%',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Lshift: {
		patterns: '<<',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Rshift: {
		patterns: '>>',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Urshift: {
		patterns: '>>>',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	AddAssign: {
		patterns: '+=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	SubtractAssign: {
		patterns: '-=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	MultipleAssign: {
		patterns: '*=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	DivideAssign: {
		patterns: '/=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	BitandAssign: {
		patterns: '&=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	BitorAssign: {
		patterns: '|=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	XorAssign: {
		patterns: '^=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	ModAssign: {
		patterns: '%=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	LshiftAssign: {
		patterns: '<<=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	RshiftAssign: {
		patterns: '>>=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	UrshiftAssign: {
		patterns: '>>>=',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Ellipsis: {
		patterns: '...',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	Arrow: {
		patterns: '->',
		forStates: CFS.NotCmtNumStrGStrItpInl
	},
	InstanceOf: {
		patterns: 'instanceof;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	MethodReference: {
		patterns: '{{colon}}:2',
		forStates: CFS.NotCmtNumStrGStrItpInl
	}
};
