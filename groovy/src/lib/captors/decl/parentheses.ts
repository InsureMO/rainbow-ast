import {EB} from '../../alias';
import {CFS, Not} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {RBracketBC} from '../utils';

export const ParenthesesCaptorDefs: GroovyTokenCaptorDefs = {
	LParen: {
		patterns: '(',
		forStates: CFS.NotNumGStrItpInlPkgImpAnn
	},
	RParen: {
		patterns: ')',
		forStates: Not(CFS.NotNumGStrItpInlPkgImpAnn),
		beforeCollect: RBracketBC,
		collect: EB
	}
};
