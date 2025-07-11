import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const ParenthesesCaptorDefs: GroovyTokenCaptorDefs = {
	LParen: {
		patterns: '(',
		forStates: CFS.NotNumGStrItpInlPkg
	},
	RParen: {
		patterns: ')',
		forStates: CFS.NotNumGStrItpInlPkg
	}
};