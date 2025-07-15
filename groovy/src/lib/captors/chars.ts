import {Fbex, Incl} from '../alias';
import {SG} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const CharsCaptorDefs: GroovyTokenCaptorDefs = {
	Word: {
		patterns: 'fn#Word;fn#Word:*',
		forStates: [Incl, SG.Cmt, SG.Str]
	},
	UndeterminedChar: {
		patterns: 'fn#NotWTN',
		forStates: [Fbex, SG.Num, SG.GStrItpInl, SG.Pkg, SG.Imp]
	}
};
