import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberStringGStringInterpolationInline, IsKeywordAllowed} from './utils';

export const OperatorCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy operators
	RangeInclusive: {
		patterns: '..',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	RangeExclusiveLeft: {
		patterns: '<..',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	RangeExclusiveRight: {
		patterns: '..<',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	RangeExclusiveFull: {
		patterns: '<..<',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SpreadDot: {
		patterns: '*.',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SafeDot: {
		patterns: '?.',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SafeIndex: {
		patterns: '?[',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SafeIndexClose: {
		patterns: ']',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SafeChainDot: {
		patterns: '??.',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Elvis: {
		patterns: '?{{colon}}',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	ElvisAssign: {
		patterns: '?=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	MethodPointer: {
		patterns: '.&',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	RegexFind: {
		patterns: '=~',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	RegexMatch: {
		patterns: '==~',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Power: {
		patterns: '**',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	PowerAssign: {
		patterns: '**=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Spaceship: {
		patterns: '<=>',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Identical: {
		patterns: '===',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	NotIdentical: {
		patterns: '!==',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	In: {
		patterns: 'in;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	NotInstanceOf: {
		patterns: '!instanceof;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	NotIn: {
		patterns: '!in;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	// operators
	Assign: {
		patterns: '=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	GreaterThan: {
		patterns: '>',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	LessThan: {
		patterns: '<',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Not: {
		patterns: '!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Bitnot: {
		patterns: '~',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Question: {
		patterns: '?',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Colon: {
		patterns: '{{Colon}}',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Equal: {
		patterns: '==',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	LessThanOrEqual: {
		patterns: '<=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	GreaterThanOrEqual: {
		patterns: '>=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	NotEqual: {
		patterns: '!=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	And: {
		patterns: '&&',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Or: {
		patterns: '||',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Increase: {
		patterns: '++',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Decrease: {
		patterns: '--',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Add: {
		patterns: '+',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Subtract: {
		patterns: '-',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Multiple: {
		patterns: '*',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Divide: {
		patterns: '/',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Bitand: {
		patterns: '&',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Bitor: {
		patterns: '|',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Xor: {
		patterns: '^',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Mod: {
		patterns: '%',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Lshift: {
		patterns: '<<',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Rshift: {
		patterns: '>>',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Urshift: {
		patterns: '>>>',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	AddAssign: {
		patterns: '+=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SubtractAssign: {
		patterns: '-=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	MultipleAssign: {
		patterns: '*=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	DivideAssign: {
		patterns: '/=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	BitandAssign: {
		patterns: '&=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	BitorAssign: {
		patterns: '|=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	XorAssign: {
		patterns: '^=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	ModAssign: {
		patterns: '%=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	LshiftAssign: {
		patterns: '<<=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	RshiftAssign: {
		patterns: '>>=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	UrshiftAssign: {
		patterns: '>>>=',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Ellipsis: {
		patterns: '...',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	Arrow: {
		patterns: '->',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	InstanceOf: {
		patterns: 'instanceof;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	MethodReference: {
		patterns: '{{colon}}:2',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	}
};

// export const OperatorTokenMatchers = buildTokenMatchers(OperatorPatterns);
