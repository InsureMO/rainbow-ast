import {CB, EB, Incl, S, SS, T} from '../../alias';
import {CFS, SG} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const PackageDeclarationCaptorDefs: GroovyTokenCaptorDefs = {
	PACKAGE: {
		patterns: 'package;fn#NotJNamePart:!',
		forks: [
			{
				forStates: CFS.NotCmtNumStrGStrItpInlPkg,
				enabledWhen: IsKeywordAllowed,
				onCaptured: [CB, T.PackageDecl, S.PkgDeclSt]
			},
			{ // in package declaration, always allowed
				forStates: [Incl, SG.Pkg],
				onCaptured: [CB, T.PackageDecl, S.PkgDeclSt]
			}
		]
	},
	Identifier: {
		patterns: 'fn#JNameStart;fn#JNamePart:*;fn#NotJNamePart:!',
		forStates: [Incl, S.PkgDeclSt, S.PkgDeclDotEd],
		onCaptured: [SS, S.PkgDeclIdEd]
	},
	Dot: {
		patterns: '.',
		forStates: [Incl, S.PkgDeclIdEd], onCaptured: [SS, S.PkgDeclDotEd]
	},
	Semicolon: {
		patterns: '{{Semicolon}}',
		forStates: [Incl, SG.Pkg],
		onCaptured: EB
	}
};
