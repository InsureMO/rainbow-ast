import {CB, EB, EBBC, Incl, PtnId, S, SS, T} from '../../alias';
import {CFS, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const PackageDeclarationCaptorDefs: GroovyTokenCaptorDefs = {
	PACKAGE: {
		patterns: 'package;fn#NotJNamePart:!',
		forks: [
			{
				forStates: CFS.NoKeywords,
				enabledWhen: IsKeywordAllowed,
				collect: [CB, T.PackageDecl, S.PkgDeclSt]
			},
			{
				forStates: [Incl, SG.Pkg, SG.Imp, SG.Ann],
				beforeCollect: EBBC,
				collect: [CB, T.PackageDecl, S.PkgDeclSt]
			}
		]
	},
	Identifier: {
		patterns: PtnId,
		forStates: [Incl, S.PkgDeclSt, S.PkgDeclDotEd],
		collect: [SS, S.PkgDeclIdEd]
	},
	Dot: {
		patterns: '.',
		forStates: [Incl, S.PkgDeclIdEd],
		collect: [SS, S.PkgDeclDotEd]
	},
	Semicolon: {
		patterns: '{{Semicolon}}',
		forStates: [Incl, SG.Pkg],
		collect: EB
	}
};
