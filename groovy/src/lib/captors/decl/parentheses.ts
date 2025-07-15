import {S} from '../../alias';
import {CFS, Not} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const ParenthesesCaptorDefs: GroovyTokenCaptorDefs = {
	LParen: {
		patterns: '(',
		forStates: CFS.NotNumGStrItpInlPkgImpAnn
	},
	RParen: {
		patterns: ')',
		forStates: Not(CFS.NotNumGStrItpInlPkgImpAnn, S.AnnDeclVals, S.AnnDeclCommaEd)
	}
};
