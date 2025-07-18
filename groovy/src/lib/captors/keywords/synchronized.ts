import {GroovyTokenCaptorDefs} from '../types';
import {KeywordForks} from '../utils';

export const KeywordSynchronizedCaptorDefs: GroovyTokenCaptorDefs = {
	SYNCHRONIZED: {
		patterns: 'synchronized;fn#NotJNamePart:!',
		forks: KeywordForks
	}
};
