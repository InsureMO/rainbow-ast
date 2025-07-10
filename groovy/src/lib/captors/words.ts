import {Fbex} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {GStringInterpolationInline, InclCommentString, NumberLiteral} from './utils';

export const CharsCaptorDefs: GroovyTokenCaptorDefs = {
	Word: {patterns: 'fn#Word;fn#Word:*', forStates: InclCommentString},
	UndeterminedChar: {patterns: 'fn#NotWTN', forStates: [Fbex, NumberLiteral, GStringInterpolationInline]}
};
