import {TokenCaptorDef} from '@rainbow-ast/core';
import {CB, EBBC, Incl, S, T} from '../../alias';
import {GroovyAstBuildState} from '../../ast-build-state';
import {CFS, Not, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

const AccessibilityKeywordForks: ReadonlyArray<Omit<TokenCaptorDef<GroovyAstBuildState>, 'patterns'>> = [
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
];

export const KeywordsAccessibilityCaptorDefs: GroovyTokenCaptorDefs = {
	PRIVATE: {
		patterns: 'private;fn#NotJNamePart:!',
		forks: AccessibilityKeywordForks
	},
	PROTECTED: {
		patterns: 'protected;fn#NotJNamePart:!',
		forks: AccessibilityKeywordForks
	},
	PUBLIC: {
		patterns: 'public;fn#NotJNamePart:!',
		forks: AccessibilityKeywordForks
	}
};
