import {Excl} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {CommentNumberString, GStringInterpolationInline} from './utils';

export const BooleanLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	BooleanTrue: {
		patterns: 'true;fn#NotJNamePart:!',
		forStates: [Excl, CommentNumberString, GStringInterpolationInline]
	},
	BooleanFalse: {
		patterns: 'false;fn#NotJNamePart:!',
		forStates: [Excl, CommentNumberString, GStringInterpolationInline]
	}
};

export const BooleanCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	BooleanLiteralCaptorDefs
];
