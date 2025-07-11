import {Fbex} from '../alias';
import {Of, SG} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const CharsCaptorDefs: GroovyTokenCaptorDefs = {
	Word: {patterns: 'fn#Word;fn#Word:*', forStates: Of('Cmt', 'Str')},
	UndeterminedChar: {patterns: 'fn#NotWTN', forStates: [Fbex, SG.Num, SG.GStrItpInl]}
};
