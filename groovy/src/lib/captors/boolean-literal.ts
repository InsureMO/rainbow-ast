import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberStringGStringInterpolationInline, IsKeywordAllowed} from './utils';

export const BooleanCaptorDefs: GroovyTokenCaptorDefs = {
	BooleanTrue: {
		patterns: 'true;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	BooleanFalse: {
		patterns: 'false;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	}
};
