import {GroovyTokenCaptorDefs} from '../types';

import {KeywordAsCaptorDefs} from './as';

import {StandardKeywordCaptorDefs} from './standard';
import {KeywordStaticCaptorDefs} from './static';

export const KeywordCaptorDefs: GroovyTokenCaptorDefs = {
	...StandardKeywordCaptorDefs,
	...KeywordAsCaptorDefs,
	...KeywordStaticCaptorDefs
};
