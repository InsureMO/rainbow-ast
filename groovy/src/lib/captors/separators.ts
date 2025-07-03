import {Excl, S} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {InclAll, InclCommentString} from './utils';

// export const SeparatorPatterns = {
// 	LBrace: '{',
// 	RBrace: '}',
// 	LParen: '(',
// 	RParen: ')',
// 	LBrack: '[',
// 	RBrack: ']',
// 	Semicolon: '\\;',
// 	Comma: ',',
// 	Dot: '.',
// 	Whitespaces: '\\ ;\\ :*',
// 	Tabs: '\\t;\\t:*',
// 	Newline: '\\r:?;\\n'
// };

export const BracketCaptorDefs: GroovyTokenCaptorDefs = {
	LBrace: {
		patterns: '{',
		forks: [
			{forStates: InclCommentString}
		]
	},
	RBrace: {
		patterns: '}',
		forks: [
			{forStates: InclCommentString}
		]
	},
	LParen: {
		patterns: '(',
		forks: [
			{forStates: InclCommentString}
		]
	},
	RParen: {
		patterns: ')',
		forks: [
			{forStates: InclCommentString}
		]
	},
	LBrack: {
		patterns: '[',
		forks: [
			{forStates: InclCommentString}
		]
	},
	RBrack: {
		patterns: ']',
		forks: [
			{forStates: InclCommentString}
		]
	}
};
export const DotCommaSemicolonCaptorDefs: GroovyTokenCaptorDefs = {
	Semicolon: {
		patterns: '\\;',
		forks: [
			{forStates: InclCommentString}
		]
	},
	Comma: {
		patterns: ',',
		forks: [
			{forStates: InclCommentString}
		]
	},
	Dot: {
		patterns: '.',
		forks: [
			{forStates: InclCommentString}
		]
	}
};
export const WhitespaceTabNewlineCaptorDefs: GroovyTokenCaptorDefs = {
	Whitespaces: {
		patterns: '\\ ;\\ :*',
		forStates: InclAll
	},
	Tabs: {
		patterns: '\\t;\\t:*',
		forStates: InclAll
	},
	Newline: {
		patterns: '\\r:?;\\n',
		forStates: [
			Excl,
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
