import {AstBuildContext, TokenCaptorAvailableCheck, TokenCaptorDef} from '@rainbow-ast/core';
import {CB, EBBC, Incl, S, SS, T} from '../../alias';
import {GroovyAstBuildState} from '../../ast-build-state';
import {GroovyLanguage} from '../../ast-builder';
import {CFS, Not, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const IsRecordClassAllowed: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
	const {jdkVersion} = context.language as GroovyLanguage;
	return jdkVersion == null || jdkVersion >= 14;
};
const IsRecordKeywordAllowed: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
	return IsRecordClassAllowed(context) && IsKeywordAllowed(context);
};

// TODO rewrite block token id to T.TypeDecl
const StandardTypeKeywordForks: ReadonlyArray<Omit<TokenCaptorDef<GroovyAstBuildState>, 'patterns'>> = [
	{
		forStates: Not(CFS.Keywords, S.CcmfssDeclSt),
		enabledWhen: IsKeywordAllowed,
		collect: [CB, T.TypeDecl, S.TypeDeclSt]
	},
	{
		forStates: [Incl, SG.Pkg, SG.Imp, SG.Ann],
		beforeCollect: EBBC,
		collect: [CB, T.TypeDecl, S.TypeDeclSt]
	},
	{
		forStates: [Incl, S.CcmfssDeclSt],
		collect: [SS, S.TypeDeclSt]
	}
];

export const KeywordsTypeCaptorDefs: GroovyTokenCaptorDefs = {
	TRAIT: {
		// "trait" can be identified as qualified name
		patterns: 'trait;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssDeclSt),
				enabledWhen: IsKeywordAllowed,
				collect: [CB, T.TypeDecl, S.TypeDeclSt]
			},
			{
				forStates: [Incl, S.CcmfssDeclSt],
				collect: [SS, S.TypeDeclSt]
			}
		]
	},
	AT_INTERFACE: {
		patterns: '@interface;fn#NotJNamePart:!',
		forks: StandardTypeKeywordForks
	},
	CLASS: {
		patterns: 'class;fn#NotJNamePart:!',
		forks: StandardTypeKeywordForks
	},
	ENUM: {
		patterns: 'enum;fn#NotJNamePart:!',
		forks: StandardTypeKeywordForks
	},
	INTERFACE: {
		patterns: 'interface;fn#NotJNamePart:!',
		forks: StandardTypeKeywordForks
	},
	RECORD: {
		// "record" can be identified as qualified name
		patterns: 'record;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssDeclSt),
				enabledWhen: IsRecordKeywordAllowed,
				collect: [CB, T.TypeDecl, S.TypeDeclSt]
			},
			{
				forStates: [Incl, S.CcmfssDeclSt],
				enabledWhen: IsRecordClassAllowed,
				collect: [SS, S.TypeDeclSt]
			}
		]
	}
};
