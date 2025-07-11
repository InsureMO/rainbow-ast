import {EB} from '../../alias';
import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const AnnotationCaptorDefs: GroovyTokenCaptorDefs = {
	AnnotationStartMark: {
		patterns: '@',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		onCaptured: EB
	}
};
