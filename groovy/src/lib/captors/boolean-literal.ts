import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberStringGStringInterpolationInline} from './utils';

export const BooleanLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	BooleanTrue: {
		patterns: 'true;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	},
	BooleanFalse: {
		patterns: 'false;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline
	}
};

export const BooleanCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	BooleanLiteralCaptorDefs
];
