import {CFS} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const IdentifierCaptorDefs: GroovyTokenCaptorDefs = {
	Identifier: {
		patterns: 'fn#JNameStart;fn#JNamePart:*;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg
	}
};
