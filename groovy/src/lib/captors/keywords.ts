import {CB, S, T} from '../alias';
import {GroovyTokenCaptorDefs} from './types';
import {ExclCommentNumberStringGStringInterpolationInline, IsKeywordAllowed} from './utils';

export const KeywordCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy keywords
	AS: {
		patterns: 'as;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	DEF: {
		patterns: 'def;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	TRAIT: {
		patterns: 'trait;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	THREADSAFE: {
		patterns: '@ThreadSafe;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	// java keywords
	ABSTRACT: {
		patterns: 'abstract;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	ASSERT: {
		patterns: 'assert;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	AT_INTERFACE: {
		patterns: '@interface;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	BREAK: {
		patterns: 'break;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	CASE: {
		patterns: 'case;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	CATCH: {
		patterns: 'catch;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	CLASS: {
		patterns: 'class;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	CONST: {
		patterns: 'const;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	CONTINUE: {
		patterns: 'continue;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	DEFAULT: {
		patterns: 'default;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	DO: {
		patterns: 'do;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	ELSE: {
		patterns: 'else;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	ENUM: {
		patterns: 'enum;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	EXTENDS: {
		patterns: 'extends;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	FINAL: {
		patterns: 'final;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	FINALLY: {
		patterns: 'finally;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	FOR: {
		patterns: 'for;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	GOTO: {
		patterns: 'goto;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	IF: {
		patterns: 'if;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	IMPLEMENTS: {
		patterns: 'implements;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	IMPORT: {
		patterns: 'import;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	INTERFACE: {
		patterns: 'interface;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	NATIVE: {
		patterns: 'native;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	NEW: {
		patterns: 'new;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	NON_SEALED: {
		patterns: 'non-sealed;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	NULL: {
		patterns: 'null;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	PACKAGE: {
		patterns: 'package;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed,
		onCaptured: [CB, T.PackageDecl, S.PackageDeclStarted]
	},
	PERMITS: {
		patterns: 'permits;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	PRIVATE: {
		patterns: 'private;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	PROTECTED: {
		patterns: 'protected;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	PUBLIC: {
		patterns: 'public;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	RECORD: {
		patterns: 'record;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	RETURN: {
		patterns: 'return;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SEALED: {
		patterns: 'sealed;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	STATIC: {
		patterns: 'static;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	STRICTFP: {
		patterns: 'strictfp;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SUPER: {
		patterns: 'super;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SWITCH: {
		patterns: 'switch;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	SYNCHRONIZED: {
		patterns: 'synchronized;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	THIS: {
		patterns: 'this;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	THROW: {
		patterns: 'throw;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	THROWS: {
		patterns: 'throws;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	TRANSIENT: {
		patterns: 'transient;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	TRY: {
		patterns: 'try;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	VAR: {
		patterns: 'var;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	VOID: {
		patterns: 'void;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	VOLATILE: {
		patterns: 'volatile;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	WHILE: {
		patterns: 'while;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	},
	YIELD: {
		patterns: 'yield;fn#NotJNamePart:!',
		forStates: ExclCommentNumberStringGStringInterpolationInline,
		enabledWhen: IsKeywordAllowed
	}
};
