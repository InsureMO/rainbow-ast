import {Fbex} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {GStringInterpolationInline, InclCommentString, NumberLiteral} from './utils';

export const WordCaptorDefs: GroovyTokenCaptorDefs = {
	Word: {patterns: 'fn#Word;fn#Word:*', forStates: InclCommentString}
};

export const CharCaptorDefs: GroovyTokenCaptorDefs = {
	UndeterminedChar: {patterns: 'fn#NotWTN', forStates: [Fbex, NumberLiteral, GStringInterpolationInline]}
};

export const WordsCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	WordCaptorDefs,
	CharCaptorDefs
];
