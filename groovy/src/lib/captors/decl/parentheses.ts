import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const ParenthesesCaptorDefs: GroovyTokenCaptorDefs = {
	LParen: {
		patterns: '(',
		forStates: CFS.NotNumGStrItpInlPkgImpAnn
	},
	RParen: {
		patterns: ')',
		forStates: CFS.NotNumGStrItpInlPkgImpAnn
	}
};
