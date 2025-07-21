import {CB, EBBC, Incl, S, T} from '../../alias';
import {CFS, Not, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const KeywordsClassExtendCaptorDefs: GroovyTokenCaptorDefs = {
	// java keywords
	EXTENDS: {
		patterns: 'extends;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssSt),
				enabledWhen: IsKeywordAllowed,
				collect: [CB, T.CcmfssDecl, S.CcmfssSt]
			},
			{
				forStates: [Incl, SG.Pkg, SG.Imp, SG.Ann],
				beforeCollect: EBBC,
				collect: [CB, T.CcmfssDecl, S.CcmfssSt]
			},
			{
				forStates: [Incl, S.CcmfssSt]
			}
		]
	},
	IMPLEMENTS: {
		patterns: 'implements;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssSt),
				enabledWhen: IsKeywordAllowed,
				collect: [CB, T.CcmfssDecl, S.CcmfssSt]
			},
			{
				forStates: [Incl, SG.Pkg, SG.Imp, SG.Ann],
				beforeCollect: EBBC,
				collect: [CB, T.CcmfssDecl, S.CcmfssSt]
			},
			{
				forStates: [Incl, S.CcmfssSt]
			}
		]
	}
};
