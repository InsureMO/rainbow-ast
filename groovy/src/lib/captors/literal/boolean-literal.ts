import {GroovyTokenCaptorDefs} from '../types';
import {KeywordForks} from '../utils';

export const BooleanCaptorDefs: GroovyTokenCaptorDefs = {
	BooleanTrue: {
		patterns: 'true;fn#NotJNamePart:!',
		forks: KeywordForks()

	},
	BooleanFalse: {
		patterns: 'false;fn#NotJNamePart:!',
		forks: KeywordForks()
	}
};
