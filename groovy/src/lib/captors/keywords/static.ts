import {EBBC, Incl, S} from '../../alias';
import {CFS, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const KeywordStaticCaptorDefs: GroovyTokenCaptorDefs = {
	STATIC: {
		patterns: 'static;fn#NotJNamePart:!',
		forks: [
			{
				forStates: CFS.Keywords,
				enabledWhen: IsKeywordAllowed
			},
			{
				// in package declaration, always allowed
				// in import declaration, allowed only when static not appears
				forStates: [Incl, SG.Pkg, SG.Imp.filter(s => s !== S.ImpDeclSt)],
				beforeCollect: EBBC
			}
		]
	}
};
