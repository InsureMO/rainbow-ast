import {CB, Incl, S, T} from '../../alias';
import {CFS, Not} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const KeywordVarCaptorDefs: GroovyTokenCaptorDefs = {
	VAR: {
		// "var" can be identified as qualified name
		patterns: 'var;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssDeclSt),
				enabledWhen: IsKeywordAllowed,
				collect: [CB, T.CcmfssDecl, S.CcmfssDeclSt]
			},
			{
				forStates: [Incl, S.CcmfssDeclSt]
			}
		]
	}
};
