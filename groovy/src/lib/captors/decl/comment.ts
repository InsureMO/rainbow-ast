import {AstBuildContext} from '@rainbow-ast/core';
import {CB, EB, Incl, S, T} from '../../alias';
import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const IsScriptCommandStartAllowed = (context: AstBuildContext): boolean => {
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
		onCaptured: [CB, T.ScriptCommand, S.ScriptCmd]
	},
	SLCommentStartMark: {
		patterns: '//',
		forStates: CFS.NotCmtNumStrGStrItpInlPkg,
		onCaptured: [CB, T.SLComment, S.SLCmt]
	},
	MLCommentStartMark: {
		patterns: '/*',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		onCaptured: [CB, T.MLComment, S.MLCmt]
	},
	MLCommentEndMark: {
		patterns: '*/',
		forStates: [Incl, S.MLCmt],
		onCaptured: EB
	}
};
