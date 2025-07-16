import {CB, EB, Incl, S, T} from '../../alias';
import {CFS, Not} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {RBracketBC} from '../utils';

export const BraceCaptorDefs: GroovyTokenCaptorDefs = {
	LBrace: {
		patterns: '{',
		forStates: CFS.NotNumGStrItpInlPkgImpAnn,
		collect: [CB, T.CodeBlock, S.CodeBlk]
	},
	RBrace: {
		patterns: '}',
		forks: [
			{forStates: Not(CFS.NotNumGStrItpInlPkgImpAnn, S.GStrItp, S.CodeBlk), beforeCollect: RBracketBC},
			{forStates: [Incl, S.CodeBlk], collect: EB}
		]
	}
};
