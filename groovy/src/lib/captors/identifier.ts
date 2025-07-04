import {Excl, Incl, S, SS} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {CommentNumberString} from './utils';

export const IdentifierCaptorDefs: GroovyTokenCaptorDefs = {
	Identifier: {
		patterns: 'fn#JNameStart;fn#JNamePart:*;fn#NotJNamePart:!',
		forks: [
			{
				forStates: [
					Excl, CommentNumberString,
					S.GStringInterpolationInline, S.GStringInterpolationInlineIdentifierEd, S.GStringInterpolationInlineDotEd
				]
			},
			{
				forStates: [Incl, S.GStringInterpolationInline, S.GStringInterpolationInlineDotEd],
				onCaptured: [SS, S.GStringInterpolationInlineIdentifierEd]
			}
		]
	}
};
export const IdentifiersCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	IdentifierCaptorDefs
];
