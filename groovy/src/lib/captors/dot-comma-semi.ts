import {S} from '../alias';
import {CFS, Not} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const DotCommaSemicolonCaptorDefs: GroovyTokenCaptorDefs = {
	Semicolon: {
		patterns: '{{Semicolon}}',
		forStates: CFS.NotNumGStrItpInl
	},
	Comma: {
		patterns: ',',
		forStates: CFS.NotNumGStrItpInl
	},
	Dot: {
		patterns: '.',
		forStates: Not('Num', S.PkgDeclIdEd, S.GStrItpInlIdEd)
	}
};