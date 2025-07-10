import {AstBuildContext} from '@rainbow-ast/core';
import {CB, EB, Incl, S, T} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberStringGStringInterpolationInline} from './utils';

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
		forStates: [Incl, S.CompilationUnit],
		enabledWhen: IsScriptCommandStartAllowed,
		onCaptured: [CB, T.ScriptCommand, S.ScriptCommand]
	},
	SLCommentStartMark: {
		patterns: '//',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		onCaptured: [CB, T.SLComment, S.SLComment]
	},
	MLCommentStartMark: {
		patterns: '/*',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		onCaptured: [CB, T.MLComment, S.MLComment]
	},
	MLCommentEndMark: {
		patterns: '*/',
		forStates: [Incl, S.MLComment],
		onCaptured: EB
	}
};
export const GenericTypeCaptorDefs: GroovyTokenCaptorDefs = {
	// GenericTypeStartMark: { // TODO LessThan
	// 	patterns: '<',
	// 	forStates: ExclCommentNumberStringGStringInterpolationInline,
	// 	onCaptured: [CB, T.GenericType, S.GenericType]
	// },
	GenericTypeEndMark: { // TODO GreaterThan
		patterns: '>',
		forStates: [Incl, S.GenericType],
		onCaptured: EB
	}
};
export const AnnotationCaptorDefs: GroovyTokenCaptorDefs = {
	AnnotationStartMark: {
		patterns: '@',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		onCaptured: EB
	}
};

export const MarkCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	CommentCaptorDefs,
	GenericTypeCaptorDefs,
	AnnotationCaptorDefs
];
