import {Incl, S} from '../../alias';
import {CFS, Not} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {NotSafeIndex} from '../utils';

export const BracketCaptorDefs: GroovyTokenCaptorDefs = {
	LBrack: {
		patterns: '[',
		forStates: CFS.NotNumGStrItpInlPkg
	},
	RBrack: {
		patterns: ']',
		forks: [
			{forStates: Not(CFS.NotNumGStrItpInlPkg, S.IndexBlk)},
			{forStates: [Incl, S.IndexBlk], enabledWhen: NotSafeIndex}
		]
	}
};
