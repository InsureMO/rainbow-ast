import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const BooleanCaptorDefs: GroovyTokenCaptorDefs = {
	BooleanTrue: {
		patterns: 'true;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	BooleanFalse: {
		patterns: 'false;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	}
};
