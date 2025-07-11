import {Incl, S, SS} from '../alias';
import {Not} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const IdentifierCaptorDefs: GroovyTokenCaptorDefs = {
	Identifier: [
		{
			patterns: 'fn#JNameStart;fn#JNamePart:*;fn#NotJNamePart:!',
			forks: [
				{forStates: Not('Cmt', 'Num', 'Str', 'GStrItpInl', 'Pkg')},
				{
					forStates: [Incl, S.PkgDeclSt, S.PkgDeclDotEd],
					onCaptured: [SS, S.PkgDeclIdEd]
				}
			]
		},
		{
			patterns: 'fn#JNameStartExcl$;fn#JNameStartExcl$:*;fn#$OrNotJNameStart:!',
			forStates: [Incl, S.GStrItpInl, S.GStrItpInlDotEd],
			onCaptured: [SS, S.GStrItpInlIdEd]
		}
	]
};
