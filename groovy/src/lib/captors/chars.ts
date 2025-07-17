import {Fbof, Incl, S} from '../alias';
import {SG} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const CharsCaptorDefs: GroovyTokenCaptorDefs = {
	Word: {
		patterns: 'fn#Word;fn#Word:*',
		forStates: [Incl, SG.Cmt, SG.Str]
	},
	/**
	 * typically, undetermined char won't change the state,
	 * it just represents that an unrecognized char appeared,
	 * which means the syntax is somehow incorrect, and it can be fixed simply by removing the char
	 */
	UndeterminedChar: {
		patterns: 'fn#NotWTN',
		forks: [
			// for states always allowed
			{forStates: [Fbof, SG.CU, SG.Cmt, SG.Str]},
			{ // for states started with bracket
				forStates: [
					Fbof,
					/* <> */ S.GenT,
					/* () */ SG.AnnVals,
					/* [] */ S.IndexBlk,
					/* {} */ S.CodeBlk, S.GStrItp
				]
			},
			{ // for states which is a block
				forStates: [
					Fbof, SG.AnnVal
				]
			}
		]
	}
};
