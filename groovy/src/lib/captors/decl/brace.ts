import {CB, EB, Incl, S, T} from '../../alias';
import {CFS, Not} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const BraceCaptorDefs: GroovyTokenCaptorDefs = {
	LBrace: {
		patterns: '{',
		forks: [
			{forStates: CFS.NotNumGStrItpInl, onCaptured: [CB, T.CodeBlock, S.CodeBlk]}
		]
	},
	RBrace: {
		patterns: '}',
		forks: [
			{forStates: Not('Num', 'GStrItpInl', S.GStrItp, S.CodeBlk)},
			{forStates: [Incl, S.CodeBlk], onCaptured: EB}
		]
	}
};