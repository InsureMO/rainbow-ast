import {Incl, S, SS} from '../alias';
import {CFS} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const IdentifierCaptorDefs: GroovyTokenCaptorDefs = {
	Identifier: [
		{
			patterns: 'fn#JNameStart;fn#JNamePart:*;fn#NotJNamePart:!',
			forStates: CFS.NotCmtNumStrGStrItpInl
		},
		{
			patterns: 'fn#JNameStartExcl$;fn#JNameStartExcl$:*;fn#$OrNotJNameStart:!',
			forStates: [Incl, S.GStringInterpolationInline, S.GStringInterpolationInlineDotEd],
			onCaptured: [SS, S.GStringInterpolationInlineIdentifierEd]
		}
	]
};
