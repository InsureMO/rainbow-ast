import {Incl, S, SS} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberStringGStringInterpolationInline} from './utils';

export const IdentifierCaptorDefs: GroovyTokenCaptorDefs = {
	Identifier: {
		patterns: 'fn#JNameStart;fn#JNamePart:*;fn#NotJNamePart:!',
		forks: [
			{
				forStates: ExclCommentNumberStringGStringInterpolationInline
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
