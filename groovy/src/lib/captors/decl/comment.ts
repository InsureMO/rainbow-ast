import {AstBuildContext} from '@rainbow-ast/core';
import {CB, EB, Incl, S, T} from '../../alias';
import {GroovyLanguage} from '../../ast-builder';
import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const IsScriptCommandStartAllowed = (context: AstBuildContext): boolean => {
	const lang = context.language as GroovyLanguage;
	if (!lang.scriptCommandEnabled) {
		return false;
	}

	const cu = context.currentBlock;
	const children = cu.children;
	return !children.some(child => {
		return ![T.Whitespaces, T.Tabs, T.Newline].includes(child.id);
	});
};

export const CommentCaptorDefs: GroovyTokenCaptorDefs = {
	ScriptCommandStartMark: {
		patterns: '#!',
		forStates: [Incl, S.CU],
		enabledWhen: IsScriptCommandStartAllowed,
		collect: [CB, T.ScriptCommand, S.ScriptCmd]
	},
	SLCommentStartMark: {
		patterns: '//',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn,
		collect: [CB, T.SLComment, S.SLCmt]
	},
	MLCommentStartMark: {
		patterns: '/*',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		collect: [CB, T.MLComment, S.MLCmt]
	},
	MLCommentEndMark: {
		patterns: '*/',
		forStates: [Incl, S.MLCmt],
		collect: EB
	}
};
