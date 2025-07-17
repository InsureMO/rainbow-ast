import {CB, EB, EBBC, Incl, S, T} from '../../alias';
import {CFS, Not, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {RBracketBC} from '../utils';

export const ParenthesesCaptorDefs: GroovyTokenCaptorDefs = {
	LParen: {
		patterns: '(',
		forStates: CFS.NotNumGStrItpInlPkgImpAnn,
		collect: [CB, T.ParenBlock, S.ParenBlk]
	},
	RParen: {
		patterns: ')',
		forks: [
			{forStates: Not(CFS.NotNumGStrItpInlPkgImpAnn, 'AnnVals', 'AnnVal', S.ParenBlk), beforeCollect: RBracketBC},
			{forStates: [Incl, SG.AnnVal], beforeCollect: EBBC, collect: EB},
			{forStates: [Incl, S.ParenBlk, SG.AnnVals], collect: EB}
		]
	}
};
