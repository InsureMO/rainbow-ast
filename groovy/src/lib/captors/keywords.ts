import {CFS} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';
import {IsKeywordAllowed} from './utils';

export const KeywordCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy keywords
	AS: {
		patterns: 'as;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	DEF: {
		patterns: 'def;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	TRAIT: {
		patterns: 'trait;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	THREADSAFE: {
		patterns: '@ThreadSafe;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	// java keywords
	ABSTRACT: {
		patterns: 'abstract;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	ASSERT: {
		patterns: 'assert;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	AT_INTERFACE: {
		patterns: '@interface;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	BREAK: {
		patterns: 'break;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	CASE: {
		patterns: 'case;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	CATCH: {
		patterns: 'catch;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	CLASS: {
		patterns: 'class;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	CONST: {
		patterns: 'const;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	CONTINUE: {
		patterns: 'continue;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	DEFAULT: {
		patterns: 'default;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	DO: {
		patterns: 'do;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	ELSE: {
		patterns: 'else;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	ENUM: {
		patterns: 'enum;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	EXTENDS: {
		patterns: 'extends;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	FINAL: {
		patterns: 'final;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	FINALLY: {
		patterns: 'finally;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	FOR: {
		patterns: 'for;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	GOTO: {
		patterns: 'goto;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	IF: {
		patterns: 'if;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	IMPLEMENTS: {
		patterns: 'implements;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	IMPORT: {
		patterns: 'import;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	INTERFACE: {
		patterns: 'interface;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	NATIVE: {
		patterns: 'native;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	NEW: {
		patterns: 'new;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	NON_SEALED: {
		patterns: 'non-sealed;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	NULL: {
		patterns: 'null;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	PERMITS: {
		patterns: 'permits;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	PRIVATE: {
		patterns: 'private;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	PROTECTED: {
		patterns: 'protected;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	PUBLIC: {
		patterns: 'public;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	RECORD: {
		patterns: 'record;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	RETURN: {
		patterns: 'return;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	SEALED: {
		patterns: 'sealed;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	STATIC: {
		patterns: 'static;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	STRICTFP: {
		patterns: 'strictfp;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	SUPER: {
		patterns: 'super;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	SWITCH: {
		patterns: 'switch;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	SYNCHRONIZED: {
		patterns: 'synchronized;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	THIS: {
		patterns: 'this;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	THROW: {
		patterns: 'throw;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	THROWS: {
		patterns: 'throws;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	TRANSIENT: {
		patterns: 'transient;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	TRY: {
		patterns: 'try;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	VAR: {
		patterns: 'var;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	VOID: {
		patterns: 'void;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	VOLATILE: {
		patterns: 'volatile;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	WHILE: {
		patterns: 'while;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	},
	YIELD: {
		patterns: 'yield;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInl,
		enabledWhen: IsKeywordAllowed
	}
};
