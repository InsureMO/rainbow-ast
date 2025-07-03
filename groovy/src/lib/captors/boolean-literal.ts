import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberString} from './utils';

export const BooleanLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	BooleanTrue: {
		patterns: 'true;fn#NotJNamePart:!',
		forStates: ExclCommentNumberString
	},
	BooleanFalse: {
		patterns: 'false;fn#NotJNamePart:!',
		forStates: ExclCommentNumberString
	}
};

export const BooleanCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	BooleanLiteralCaptorDefs
];
