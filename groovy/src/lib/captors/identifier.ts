import {PtnId} from '../alias';
import {CFS} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const IdentifierCaptorDefs: GroovyTokenCaptorDefs = {
	Identifier: {
		patterns: PtnId,
		forStates: CFS.NoKeywords
	}
};
