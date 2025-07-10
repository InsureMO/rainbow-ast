import {CB, EB, Excl, Incl, S, T} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {
	Comment,
	ExclCommentNumberStringGStringInterpolationInline,
	GStringInterpolationInline,
	IsKeywordAllowed,
	IsSafeIndex,
	NumberLiteral,
	SlashyGStringStartNotAllowed,
	StringLiteral
} from './utils';

export const OperatorCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy operators
	RangeInclusive: {
		patterns: '..',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	RangeExclusiveLeft: {
		patterns: '<..',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	RangeExclusiveRight: {
		patterns: '..<',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	RangeExclusiveFull: {
		patterns: '<..<',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	SpreadDot: {
		patterns: '*.',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	SafeDot: {
		patterns: '?.',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	SafeIndex: {
		patterns: '?[',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		onCaptured: [CB, T.IndexBlock, S.IndexBlock]
	},
	SafeIndexClose: {
		patterns: ']',
		forStates: [Incl, S.IndexBlock],
		enabledWhen: IsSafeIndex,
		onCaptured: EB
	},
	SafeChainDot: {
		patterns: '??.',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Elvis: {
		patterns: '?{{colon}}',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	ElvisAssign: {
		patterns: '?=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	MethodPointer: {
		patterns: '.&',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	RegexFind: {
		patterns: '=~',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	RegexMatch: {
		patterns: '==~',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Power: {
		patterns: '**',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	PowerAssign: {
		patterns: '**=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Spaceship: {
		patterns: '<=>',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Identical: {
		patterns: '===',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	NotIdentical: {
		patterns: '!==',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	In: {
		patterns: 'in;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	NotInstanceOf: {
		patterns: '!instanceof;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	NotIn: {
		patterns: '!in;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	// operators
	Assign: {
		patterns: '=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	GreaterThan: {
		patterns: '>',
		forStates: [Excl, Comment, NumberLiteral, StringLiteral, GStringInterpolationInline, S.GenericType]
	},
	LessThan: {
		patterns: '<',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Not: {
		patterns: '!',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Bitnot: {
		patterns: '~',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Question: {
		patterns: '?',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Colon: {
		patterns: '{{Colon}}',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Equal: {
		patterns: '==',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	LessThanOrEqual: {
		patterns: '<=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	GreaterThanOrEqual: {
		patterns: '>=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	NotEqual: {
		patterns: '!=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	And: {
		patterns: '&&',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Or: {
		patterns: '||',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Increase: {
		patterns: '++',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Decrease: {
		patterns: '--',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Add: {
		patterns: '+',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Subtract: {
		patterns: '-',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Multiple: {
		patterns: '*',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Divide: {
		patterns: '/',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: SlashyGStringStartNotAllowed
	},
	Bitand: {
		patterns: '&',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Bitor: {
		patterns: '|',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Xor: {
		patterns: '^',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Mod: {
		patterns: '%',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Lshift: {
		patterns: '<<',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Rshift: {
		patterns: '>>',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Urshift: {
		patterns: '>>>',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	AddAssign: {
		patterns: '+=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	SubtractAssign: {
		patterns: '-=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	MultipleAssign: {
		patterns: '*=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	DivideAssign: {
		patterns: '/=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	BitandAssign: {
		patterns: '&=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	BitorAssign: {
		patterns: '|=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	XorAssign: {
		patterns: '^=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	ModAssign: {
		patterns: '%=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	LshiftAssign: {
		patterns: '<<=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	RshiftAssign: {
		patterns: '>>=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	UrshiftAssign: {
		patterns: '>>>=',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Ellipsis: {
		patterns: '...',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	Arrow: {
		patterns: '->',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	InstanceOf: {
		patterns: 'instanceof;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	MethodReference: {
		patterns: '{{colon}}:2',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	}
};
