import {Fbex} from '../alias';
import {CFS, SG} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const CharsCaptorDefs: GroovyTokenCaptorDefs = {
	Word: {patterns: 'fn#Word;fn#Word:*', forStates: CFS.CmtStr},
	UndeterminedChar: {patterns: 'fn#NotWTN', forStates: [Fbex, SG.Num, SG.GStrItpInl]}
};
