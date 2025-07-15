import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed, KeywordForks} from '../utils';

export const StandardKeywordCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy keywords
	DEF: { // "def" can be identified as qualified name
		patterns: 'def;fn#NotJNamePart:!',
		forStates: CFS.NoKeywords,
		enabledWhen: IsKeywordAllowed
	},
	TRAIT: { // "trait" can be identified as qualified name
		patterns: 'trait;fn#NotJNamePart:!',
		forStates: CFS.NoKeywords,
		enabledWhen: IsKeywordAllowed
	},
	// java keywords
	ABSTRACT: {
		patterns: 'abstract;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	ASSERT: {
		patterns: 'assert;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	AT_INTERFACE: {
		patterns: '@interface;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	BREAK: {
		patterns: 'break;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	CASE: {
		patterns: 'case;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	CATCH: {
		patterns: 'catch;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	CLASS: {
		patterns: 'class;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	CONST: {
		patterns: 'const;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	CONTINUE: {
		patterns: 'continue;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	DEFAULT: {
		patterns: 'default;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	DO: {
		patterns: 'do;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	ELSE: {
		patterns: 'else;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	ENUM: {
		patterns: 'enum;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	EXTENDS: {
		patterns: 'extends;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	FINAL: {
		patterns: 'final;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	FINALLY: {
		patterns: 'finally;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	FOR: {
		patterns: 'for;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	GOTO: {
		patterns: 'goto;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	IF: {
		patterns: 'if;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	IMPLEMENTS: {
		patterns: 'implements;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	INTERFACE: {
		patterns: 'interface;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	NATIVE: {
		patterns: 'native;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	NEW: {
		patterns: 'new;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	NON_SEALED: {
		// if it is detected in package declaration, cannot pass the compilation. HOLY CRAP!
		// it cannot be separated to "non - sealed",
		// but for "no-sealed" -> "no - sealed", "non-ealed" -> "non - ealed", they are ok to separated,
		// which means they are ok to compile
		patterns: 'non-sealed;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	NULL: {
		patterns: 'null;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	PRIVATE: {
		patterns: 'private;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	PROTECTED: {
		patterns: 'protected;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	PUBLIC: {
		patterns: 'public;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	RETURN: {
		patterns: 'return;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	STRICTFP: {
		patterns: 'strictfp;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	SUPER: {
		patterns: 'super;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	SWITCH: {
		patterns: 'switch;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	SYNCHRONIZED: {
		patterns: 'synchronized;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	THIS: {
		patterns: 'this;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	THROW: {
		patterns: 'throw;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	THROWS: {
		patterns: 'throws;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	TRANSIENT: {
		patterns: 'transient;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	TRY: {
		patterns: 'try;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	VOID: {
		patterns: 'void;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	VOLATILE: {
		patterns: 'volatile;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	WHILE: {
		patterns: 'while;fn#NotJNamePart:!',
		forks: KeywordForks()
	},
	// special keywords
	// groovy keywords
	THREADSAFE: { // starts with @
		patterns: '@ThreadSafe;fn#NotJNamePart:!',
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn,
		// TODO not sure, should it be annotation allowed?
		enabledWhen: IsKeywordAllowed
	},
	// java keywords
	PERMITS: { // "permits" can be identified as qualified name
		patterns: 'permits;fn#NotJNamePart:!',
		forStates: CFS.NoKeywords,
		enabledWhen: IsKeywordAllowed
	},
	RECORD: { // "record" can be identified as qualified name
		patterns: 'record;fn#NotJNamePart:!',
		forStates: CFS.NoKeywords,
		enabledWhen: IsKeywordAllowed
	},
	SEALED: { // "sealed" can be identified as qualified name
		patterns: 'sealed;fn#NotJNamePart:!',
		forStates: CFS.NoKeywords,
		enabledWhen: IsKeywordAllowed
	},
	VAR: { // "var" can be identified as qualified name
		patterns: 'var;fn#NotJNamePart:!',
		forStates: CFS.NoKeywords,
		enabledWhen: IsKeywordAllowed
	},
	YIELD: { // "yield" can be identified as qualified name
		patterns: 'yield;fn#NotJNamePart:!',
		forStates: CFS.NoKeywords,
		enabledWhen: IsKeywordAllowed
	}
};
