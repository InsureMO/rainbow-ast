import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {IsKeywordAllowed, KeywordForks} from '../utils';

export const StandardKeywordCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy keywords
	// java keywords
	ASSERT: {
		patterns: 'assert;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	BREAK: {
		patterns: 'break;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	CASE: {
		patterns: 'case;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	CATCH: {
		patterns: 'catch;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	CONST: {
		patterns: 'const;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	CONTINUE: {
		patterns: 'continue;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	DEFAULT: {
		patterns: 'default;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	DO: {
		patterns: 'do;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	ELSE: {
		patterns: 'else;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	FINALLY: {
		patterns: 'finally;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	FOR: {
		patterns: 'for;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	GOTO: {
		patterns: 'goto;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	IF: {
		patterns: 'if;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	NATIVE: {
		patterns: 'native;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	NEW: {
		patterns: 'new;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	NULL: {
		patterns: 'null;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	RETURN: {
		patterns: 'return;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	SUPER: {
		patterns: 'super;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	SWITCH: {
		patterns: 'switch;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	THIS: {
		patterns: 'this;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	THROW: {
		patterns: 'throw;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	THROWS: {
		patterns: 'throws;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	TRANSIENT: {
		patterns: 'transient;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	TRY: {
		patterns: 'try;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	VOID: {
		patterns: 'void;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	VOLATILE: {
		patterns: 'volatile;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	WHILE: {
		patterns: 'while;fn#NotJNamePart:!',
		forks: KeywordForks
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
	YIELD: { // "yield" can be identified as qualified name
		patterns: 'yield;fn#NotJNamePart:!',
		forStates: CFS.Keywords,
		enabledWhen: IsKeywordAllowed
	}
};
