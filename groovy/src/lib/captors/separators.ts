import {Excl, Incl, InclAll, S} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {CommentString} from './utils';

export const SeparatorPatterns = {
	LBrace: '{',
	RBrace: '}',
	LParen: '(',
	RParen: ')',
	LBrack: '[',
	RBrack: ']',
	Semicolon: '\\;',
	Comma: ',',
	Dot: '.',
	Whitespaces: '\\ ;\\ :*',
	Tabs: '\\t;\\t:*',
	Newline: '\\r:?;\\n'
};

export const BracketCaptorDefs: GroovyTokenCaptorDefs = {
	LBrace: {
		patterns: '{',
		forks: [
			{forStates: [Incl, CommentString]}
		]
	},
	RBrace: {
		patterns: '}',
		forks: [
			{forStates: [Incl, CommentString]}
		]
	},
	LParen: {
		patterns: '(',
		forks: [
			{forStates: [Incl, CommentString]}
		]
	},
	RParen: {
		patterns: ')',
		forks: [
			{forStates: [Incl, CommentString]}
		]
	},
	LBrack: {
		patterns: '[',
		forks: [
			{forStates: [Incl, CommentString]}
		]
	},
	RBrack: {
		patterns: ']',
		forks: [
			{forStates: [Incl, CommentString]}
		]
	}
};
export const DotCommaSemicolonCaptorDefs: GroovyTokenCaptorDefs = {
	Semicolon: {
		patterns: '\\;',
		forks: [
			{forStates: [Incl, CommentString]}
		]
	},
	Comma: {
		patterns: ',',
		forks: [
			{forStates: [Incl, CommentString]}
		]
	},
	Dot: {
		patterns: '.',
		forks: [
			{forStates: [Incl, CommentString]}
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
