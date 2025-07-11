import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const ParenthesesCaptorDefs: GroovyTokenCaptorDefs = {
	LParen: {
		patterns: '(',
		forStates: CFS.NotNumGStrItpInl
	},
	RParen: {
		patterns: ')',
		forStates: CFS.NotNumGStrItpInl
	}
};