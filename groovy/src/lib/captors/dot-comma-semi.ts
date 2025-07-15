import {CFS} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const DotCommaSemicolonCaptorDefs: GroovyTokenCaptorDefs = {
	Semicolon: {
		patterns: '{{Semicolon}}',
		forStates: CFS.NotNumGStrItpInlPkgImp
	},
	Comma: {
		patterns: ',',
		forStates: CFS.NotNumGStrItpInlPkgImp
	},
	Dot: {
		patterns: '.',
		forStates: CFS.NotNumGStrItpInlPkgImp
	}
};
