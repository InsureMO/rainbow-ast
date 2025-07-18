import {GroovyTokenCaptorDefs} from '../types';

import {KeywordAsCaptorDefs} from './as';
import {KeywordsCcmfssCaptorDefs} from './ccmfss';

import {StandardKeywordCaptorDefs} from './standard';
import {KeywordStaticCaptorDefs} from './static';
import {KeywordSynchronizedCaptorDefs} from './synchronized';

export const KeywordCaptorDefs: ReadonlyArray<GroovyTokenCaptorDefs> = [
	StandardKeywordCaptorDefs,
	KeywordAsCaptorDefs,
	KeywordStaticCaptorDefs,
	KeywordSynchronizedCaptorDefs,
	KeywordsCcmfssCaptorDefs
];
