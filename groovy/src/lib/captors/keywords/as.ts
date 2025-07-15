import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const KeywordAsCaptorDefs: GroovyTokenCaptorDefs = {
	AS: { // "as" can be identified as qualified name
		patterns: 'as;fn#NotJNamePart:!',
		forStates: CFS.NoKeywords,
		enabledWhen: IsKeywordAllowed
	}
};
