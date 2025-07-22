import {CB, EBBC, Incl, S, T} from '../../alias';
import {CFS, Not, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const KeywordStaticCaptorDefs: GroovyTokenCaptorDefs = {
	STATIC: {
		patterns: 'static;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssDeclSt),
				enabledWhen: IsKeywordAllowed,
				collect: [CB, T.CcmfssDecl, S.CcmfssDeclSt]
			},
			{
				// in package declaration, always allowed
				// in import declaration, allowed only when static not appears
				forStates: [Incl, SG.Pkg, SG.Imp.filter(s => s !== S.ImpDeclSt), SG.Ann],
				beforeCollect: EBBC,
				collect: [CB, T.CcmfssDecl, S.CcmfssDeclSt]
			},
			{
				forStates: [Incl, S.CcmfssDeclSt]
			}
		]
	}
};
