import {EB, Incl, S} from '../../alias';
import {GroovyTokenCaptorDefs} from '../types';

export const AngleBracketCaptorDefs: GroovyTokenCaptorDefs = {
	// GenericTypeStartMark: { // TODO LessThan
	// 	patterns: '<',
	// 	forStates: CFS.NotCmtNumStrGStrItpInl,
	// 	onCaptured: [CB, T.GenericType, S.GenericType]
	// },
	GenericTypeEndMark: {
		patterns: '>',
		forStates: [Incl, S.GenT],
		onCaptured: EB
	}
};
