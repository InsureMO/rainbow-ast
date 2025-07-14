import {CFS} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const DotCommaSemicolonCaptorDefs: GroovyTokenCaptorDefs = {
	Semicolon: {
		patterns: '{{Semicolon}}',
		forStates: CFS.NotNumGStrItpInlPkg
	},
	Comma: {
		patterns: ',',
		forStates: CFS.NotNumGStrItpInlPkg
	},
	Dot: {
		patterns: '.',
		forStates: CFS.NotNumGStrItpInlPkg
	}
};
