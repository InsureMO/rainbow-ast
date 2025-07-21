import {GroovyTokenCaptorDefs} from '../types';
import {KeywordAbstractCaptorDefs} from './abstract';
import {KeywordsAccessibilityCaptorDefs} from './accessibility';

import {KeywordAsCaptorDefs} from './as';
import {KeywordsClassExtendCaptorDefs} from './class-extend';
import {KeywordDefCaptorDefs} from './def';
import {KeywordFinalCaptorDefs} from './final';
import {KeywordsSealClassCaptorDefs} from './seal-class';

import {StandardKeywordCaptorDefs} from './standard';
import {KeywordStaticCaptorDefs} from './static';
import {KeywordStrictfpCaptorDefs} from './strictfp';
import {KeywordSynchronizedCaptorDefs} from './synchronized';
import {KeywordsTypeCaptorDefs} from './type';
import {KeywordVarCaptorDefs} from './var';

export const KeywordCaptorDefs: ReadonlyArray<GroovyTokenCaptorDefs> = [
	StandardKeywordCaptorDefs,
	KeywordAbstractCaptorDefs,
	KeywordAsCaptorDefs,
	KeywordDefCaptorDefs,
	KeywordFinalCaptorDefs,
	KeywordStaticCaptorDefs,
	KeywordStrictfpCaptorDefs,
	KeywordSynchronizedCaptorDefs,
	KeywordVarCaptorDefs,
	KeywordsAccessibilityCaptorDefs,
	KeywordsClassExtendCaptorDefs,
	KeywordsSealClassCaptorDefs,
	KeywordsTypeCaptorDefs
];
