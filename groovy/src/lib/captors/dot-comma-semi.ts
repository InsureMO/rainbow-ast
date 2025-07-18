import {S} from '../alias';
import {CFS, Not} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const DotCommaSemicolonCaptorDefs: GroovyTokenCaptorDefs = {
	Semicolon: {
		patterns: '{{Semicolon}}',
		forStates: CFS.NotNumGStrItpInlPkgImpAnn
	},
	Comma: {
		patterns: ',',
		forStates: Not(CFS.NotNumGStrItpInlPkgImpAnn, 'AnnVals', 'AnnVal')
	},
	Dot: {
		patterns: '.',
		forStates: Not(CFS.NotNumGStrItpInlPkgImpAnn, S.AnnDeclValIdEd)
	}
};
