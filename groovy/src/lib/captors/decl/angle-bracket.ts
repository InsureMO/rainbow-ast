import {EB, Incl, S} from '../../alias';
import {GroovyTokenCaptorDefs} from '../types';

export const AngleBracketCaptorDefs: GroovyTokenCaptorDefs = {
	// GenericTypeStartMark: { // TODO LessThan
	// 	patterns: '<',
	// 	forStates: CFS.NotCmtNumStrGStrItpInl,
	// 	collect: [CB, T.GenericType, S.GenericType]
	// },
	GenericTypeEndMark: {
		patterns: '>',
		forStates: [Incl, S.GenT],
		collect: EB
	}
};
