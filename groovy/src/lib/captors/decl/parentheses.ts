import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const ParenthesesCaptorDefs: GroovyTokenCaptorDefs = {
	LParen: {
		patterns: '(',
		forStates: CFS.NotNumGStrItpInlPkgImp
	},
	RParen: {
		patterns: ')',
		forStates: CFS.NotNumGStrItpInlPkgImp
	}
};