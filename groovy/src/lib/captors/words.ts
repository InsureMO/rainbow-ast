import {Incl} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {Comment, InclCommentString} from './utils';

export const WordCaptorDefs: GroovyTokenCaptorDefs = {
	Word: {
		patterns: 'fn#Word;fn#Word:*',
		forStates: InclCommentString
	},
	At: {
		patterns: '@',
		forStates: InclCommentString
	},
	WellNumber: {
		patterns: '#',
		forStates: InclCommentString
	},
	Slash: {
		patterns: '/',
		forStates: [Incl, Comment]
	},
	Backslash: {
		patterns: '{{Backslash}}',
		forStates: [Incl, Comment]
	}
};

export const WordsCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	WordCaptorDefs
];
