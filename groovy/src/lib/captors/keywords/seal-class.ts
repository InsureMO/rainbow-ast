import {AstBuildContext, TokenCaptorAvailableCheck} from '@rainbow-ast/core';
import {CB, EBBC, Incl, S, T} from '../../alias';
import {GroovyLanguage} from '../../ast-builder';
import {CFS, Not, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const IsSealedClassAllowed: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
	const {jdkVersion} = context.language as GroovyLanguage;
	return jdkVersion == null || jdkVersion >= 15;
};
const IsSealedKeywordAllowed: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
	return IsSealedClassAllowed(context) && IsKeywordAllowed(context);
};
export const IsNonSealedClassAllowed: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
	const {jdkVersion} = context.language as GroovyLanguage;
	return jdkVersion == null || jdkVersion >= 17;
};
const IsNonSealedKeywordAllowed: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
	return IsNonSealedClassAllowed(context) && IsKeywordAllowed(context);
};

export const KeywordsSealClassCaptorDefs: GroovyTokenCaptorDefs = {
	NON_SEALED: {
		// if it is detected in package declaration, cannot pass the compilation. HOLY CRAP!
		// it cannot be separated to "non - sealed",
		// but for "no-sealed" -> "no - sealed", "non-ealed" -> "non - ealed", they are ok to separated,
		// which means they are ok to compile
		patterns: 'non-sealed;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssSt),
				enabledWhen: IsNonSealedKeywordAllowed,
				collect: [CB, T.CcmfssDecl, S.CcmfssSt]
			},
			{
				forStates: [Incl, SG.Pkg, SG.Imp, SG.Ann],
				enabledWhen: IsNonSealedClassAllowed,
				beforeCollect: EBBC,
				collect: [CB, T.CcmfssDecl, S.CcmfssSt]
			},
			{
				forStates: [Incl, S.CcmfssSt],
				enabledWhen: IsNonSealedClassAllowed
			}
		]
	},
	PERMITS: { // "permits" can be identified as qualified name
		patterns: 'permits;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssSt),
				enabledWhen: IsSealedKeywordAllowed,
				collect: [CB, T.CcmfssDecl, S.CcmfssSt]
			},
			{
				forStates: [Incl, S.CcmfssSt],
				enabledWhen: IsSealedClassAllowed
			}
		]
	},
	SEALED: {
		// "sealed" can be identified as qualified name
		patterns: 'sealed;fn#NotJNamePart:!',
		forks: [
			{
				forStates: Not(CFS.Keywords, S.CcmfssSt),
				enabledWhen: IsSealedKeywordAllowed,
				collect: [CB, T.CcmfssDecl, S.CcmfssSt]
			},
			{
				forStates: [Incl, S.CcmfssSt],
				enabledWhen: IsSealedClassAllowed
			}
		]
	}
};
