import {CB, EB, EBBC, Incl, PtnId, S, SS, T} from '../../alias';
import {CFS, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const ImportDeclarationCaptorDefs: GroovyTokenCaptorDefs = {
	IMPORT: {
		patterns: 'import;fn#NotJNamePart:!',
		forks: [
			{
				forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn,
				enabledWhen: IsKeywordAllowed,
				collect: [CB, T.ImportDecl, S.ImpDeclSt]
			},
			{
				forStates: [Incl, SG.Pkg, SG.Imp, SG.Ann],
				beforeCollect: EBBC,
				collect: [CB, T.ImportDecl, S.ImpDeclSt]
			}
		]
	},
	STATIC: {
		patterns: 'static;fn#NotJNamePart:!',
		forStates: [Incl, S.ImpDeclSt],
		collect: [SS, S.ImpDeclStaticEd]
	},
	Identifier: {
		patterns: PtnId,
		forks: [
			{
				forStates: [Incl, S.ImpDeclSt, S.ImpDeclStaticEd, S.ImpDeclDotEd],
				collect: [SS, S.ImpDeclIdEd]
			},
			{
				forStates: [Incl, S.ImpDeclAsEd],
				collect: EB
			}
		]
	},
	Dot: {
		patterns: '.',
		forStates: [Incl, S.ImpDeclIdEd],
		collect: [SS, S.ImpDeclDotEd]
	},
	Multiple: {
		patterns: '*',
		forStates: [Incl, S.ImpDeclDotEd],
		collect: [SS, S.ImpDeclStarEd]
	},
	AS: { // as after asterisk is incorrect, but collect it anyway
		patterns: 'as;fn#NotJNamePart:!',
		forStates: [Incl, S.ImpDeclIdEd, S.ImpDeclAsEd, S.ImpDeclStarEd],
		collect: [SS, S.ImpDeclAsEd]
	},
	Semicolon: {
		patterns: '{{Semicolon}}',
		forStates: [Incl, SG.Imp],
		collect: EB
	}
};
