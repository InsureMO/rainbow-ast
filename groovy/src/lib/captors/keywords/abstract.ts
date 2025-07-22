import {CB, EBBC, Incl, S, T} from '../../alias';
import {CFS, Not, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const KeywordAbstractCaptorDefs: GroovyTokenCaptorDefs = {
	ABSTRACT: {
		patterns: 'abstract;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssDeclSt),
				enabledWhen: IsKeywordAllowed,
				collect: [CB, T.CcmfssDecl, S.CcmfssDeclSt]
			},
			{
				forStates: [Incl, SG.Pkg, SG.Imp, SG.Ann],
				beforeCollect: EBBC,
				collect: [CB, T.CcmfssDecl, S.CcmfssDeclSt]
			},
			{
				forStates: [Incl, S.CcmfssDeclSt]
			}
		]
	}
};
