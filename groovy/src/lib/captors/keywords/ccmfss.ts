import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';
import {EndBlockBeforeCollectKeywordFork, IsKeywordAllowed, KeywordForks} from '../utils';

export const KeywordsCcmfssCaptorDefs: GroovyTokenCaptorDefs = {
	// groovy keywords
	DEF: {
		// "def" can be identified as qualified name
		patterns: 'def;fn#NotJNamePart:!',
		forStates: CFS.Keywords,
		enabledWhen: IsKeywordAllowed
	},
	TRAIT: {
		// "trait" can be identified as qualified name
		patterns: 'trait;fn#NotJNamePart:!',
		forStates: CFS.Keywords,
		enabledWhen: IsKeywordAllowed
	},
	// java keywords
	ABSTRACT: {
		patterns: 'abstract;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	AT_INTERFACE: {
		patterns: '@interface;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	CLASS: {
		patterns: 'class;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	ENUM: {
		patterns: 'enum;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	EXTENDS: {
		patterns: 'extends;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	FINAL: {
		patterns: 'final;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	IMPLEMENTS: {
		patterns: 'implements;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	INTERFACE: {
		patterns: 'interface;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	NON_SEALED: {
		// if it is detected in package declaration, cannot pass the compilation. HOLY CRAP!
		// it cannot be separated to "non - sealed",
		// but for "no-sealed" -> "no - sealed", "non-ealed" -> "non - ealed", they are ok to separated,
		// which means they are ok to compile
		patterns: 'non-sealed;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	PERMITS: { // "permits" can be identified as qualified name
		patterns: 'permits;fn#NotJNamePart:!',
		forStates: CFS.Keywords,
		enabledWhen: IsKeywordAllowed
	},
	PRIVATE: {
		patterns: 'private;fn#NotJNamePart:!',
		forks: [
			{
				forStates: CFS.Keywords,
				enabledWhen: IsKeywordAllowed
			},
			EndBlockBeforeCollectKeywordFork
		]
	},
	PROTECTED: {
		patterns: 'protected;fn#NotJNamePart:!',
		forks: [
			{
				forStates: CFS.Keywords,
				enabledWhen: IsKeywordAllowed
			},
			EndBlockBeforeCollectKeywordFork
		]
	},
	PUBLIC: {
		patterns: 'public;fn#NotJNamePart:!',
		forks: [
			{
				forStates: CFS.Keywords,
				enabledWhen: IsKeywordAllowed
			},
			EndBlockBeforeCollectKeywordFork
		]
	},
	RECORD: {
		// "record" can be identified as qualified name
		patterns: 'record;fn#NotJNamePart:!',
		forStates: CFS.Keywords,
		enabledWhen: IsKeywordAllowed
	},
	SEALED: {
		// "sealed" can be identified as qualified name
		patterns: 'sealed;fn#NotJNamePart:!',
		forStates: CFS.Keywords,
		enabledWhen: IsKeywordAllowed
	},
	STRICTFP: {
		patterns: 'strictfp;fn#NotJNamePart:!',
		forks: KeywordForks
	},
	VAR: {
		// "var" can be identified as qualified name
		patterns: 'var;fn#NotJNamePart:!',
		forStates: CFS.Keywords,
		enabledWhen: IsKeywordAllowed
	}
};
