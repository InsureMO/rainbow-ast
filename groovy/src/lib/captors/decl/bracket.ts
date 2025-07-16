import {Incl, S} from '../../alias';
import {CFS, Not} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {NotSafeIndex, RBracketBC} from '../utils';

export const BracketCaptorDefs: GroovyTokenCaptorDefs = {
	LBrack: {
		patterns: '[',
		forStates: CFS.NotNumGStrItpInlPkgImpAnn
	},
	RBrack: {
		patterns: ']',
		forks: [
			{forStates: Not(CFS.NotNumGStrItpInlPkgImpAnn, S.IndexBlk), beforeCollect: RBracketBC},
			{forStates: [Incl, S.IndexBlk], enabledWhen: NotSafeIndex}
		]
	}
};
