import {PtnId} from '../alias';
import {CFS, Not} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const IdentifierCaptorDefs: GroovyTokenCaptorDefs = {
	Identifier: {
		patterns: PtnId,
		forStates: Not(CFS.NoKeywords, 'AnnVals')
	}
};
