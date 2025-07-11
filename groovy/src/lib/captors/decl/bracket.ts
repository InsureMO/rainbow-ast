import {Excl, Incl, S} from '../../alias';
import {CFS, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {NotSafeIndex} from '../utils';

export const BracketCaptorDefs: GroovyTokenCaptorDefs = {
	LBrack: {
		patterns: '[',
		forStates: CFS.NotNumGStrItpInl
	},
	RBrack: {
		patterns: ']',
		forks: [
			{forStates: [Excl, SG.Num, SG.GStrItpInl, S.IndexBlk]},
			{forStates: [Incl, S.IndexBlk], enabledWhen: NotSafeIndex}
		]
	}
};