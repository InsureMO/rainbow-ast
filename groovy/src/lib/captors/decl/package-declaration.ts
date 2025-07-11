import {CB, Incl, S, SS, T} from '../../alias';
import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed} from '../utils';

export const PackageDeclarationCaptorDefs: GroovyTokenCaptorDefs = {
	PACKAGE: {
		patterns: 'package;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed,
		onCaptured: [CB, T.PackageDecl, S.PkgDeclSt]
	},
	Identifier: {
		patterns: 'fn#JNameStart;fn#JNamePart:*;fn#NotJNamePart:!',
		forStates: [Incl, S.PkgDeclSt, S.PkgDeclDotEd],
		onCaptured: [SS, S.PkgDeclIdEd]
	},
	Dot: {
		patterns: '.',
		forks: [
			{forStates: [Incl, S.PkgDeclIdEd], onCaptured: [SS, S.PkgDeclDotEd]}
		]
	}
};
