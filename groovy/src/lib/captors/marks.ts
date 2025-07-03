import {CB, EB, Incl, S, T} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberString} from './utils';

export const CommentCaptorDefs: GroovyTokenCaptorDefs = {
	ScriptCommandStartMark: {
		patterns: '#!',
		forStates: [Incl, S.CompilationUnit],
		onCaptured: [CB, T.ScriptCommand, S.ScriptCommand]
	},
	SLCommentStartMark: {
		patterns: '//',
		forStates: ExclCommentNumberString,
		onCaptured: [CB, T.SLComment, S.SLComment]
	},
	MLCommentStartMark: {
		patterns: '/*',
		forStates: ExclCommentNumberString,
		onCaptured: [CB, T.MLComment, S.MLComment]
	},
	MLCommentEndMark: {
		patterns: '*/',
		forStates: [Incl, S.MLComment],
		onCaptured: EB
	}
};
export const GenericTypeCaptorDefs: GroovyTokenCaptorDefs = {
	GenericTypeStartMark: {
		patterns: '<',
		forStates: ExclCommentNumberString,
		onCaptured: [CB, T.GenericType, S.GenericTypeStarted]
	},
	GenericTypeEndMark: {
		patterns: '>',
		forStates: [Incl, S.GenericTypeStarted],
		onCaptured: EB
	}
};
export const AnnotationCaptorDefs: GroovyTokenCaptorDefs = {
	AnnotationStartMark: {
		patterns: '@',
		forStates: ExclCommentNumberString,
		onCaptured: EB
	}
};

export const MarkCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	CommentCaptorDefs,
	GenericTypeCaptorDefs,
	AnnotationCaptorDefs
];
