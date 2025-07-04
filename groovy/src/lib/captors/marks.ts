import {CB, EB, Excl, Incl, S, T} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {CommentNumberString, GStringInterpolationInline} from './utils';

export const CommentCaptorDefs: GroovyTokenCaptorDefs = {
	ScriptCommandStartMark: {
		patterns: '#!',
		forStates: [Incl, S.CompilationUnit],
		onCaptured: [CB, T.ScriptCommand, S.ScriptCommand]
	},
	SLCommentStartMark: {
		patterns: '//',
		forStates: [Excl, CommentNumberString, GStringInterpolationInline],
		onCaptured: [CB, T.SLComment, S.SLComment]
	},
	MLCommentStartMark: {
		patterns: '/*',
		forStates: [Excl, CommentNumberString, GStringInterpolationInline],
		onCaptured: [CB, T.MLComment, S.MLComment]
	},
	MLCommentEndMark: {
		patterns: '*/',
		forStates: [Incl, S.MLComment],
		onCaptured: EB
	}
};
export const GenericTypeCaptorDefs: GroovyTokenCaptorDefs = {
	GenericTypeStartMark: { // TODO LessThan
		patterns: '<',
		forStates: [Excl, CommentNumberString, GStringInterpolationInline],
		onCaptured: [CB, T.GenericType, S.GenericTypeStarted]
	},
	GenericTypeEndMark: { // TODO GreaterThan
		patterns: '>',
		forStates: [Incl, S.GenericTypeStarted],
		onCaptured: EB
	}
};
export const AnnotationCaptorDefs: GroovyTokenCaptorDefs = {
	AnnotationStartMark: {
		patterns: '@',
		forStates: [Excl, CommentNumberString, GStringInterpolationInline],
		onCaptured: EB
	}
};

export const MarkCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	CommentCaptorDefs,
	GenericTypeCaptorDefs,
	AnnotationCaptorDefs
];
