import {GroovyTokenId} from '../tokens';

export type TsscmfvModifierKeywords =
	| ['abstract', GroovyTokenId.ABSTRACT]
	| ['def', GroovyTokenId.DEF]
	| ['default', GroovyTokenId.DEFAULT]
	| ['final', GroovyTokenId.FINAL]
	| ['native', GroovyTokenId.NATIVE]
	| ['non-sealed', GroovyTokenId.NON_SEALED]
	| ['private', GroovyTokenId.PRIVATE]
	| ['protected', GroovyTokenId.PROTECTED]
	| ['public', GroovyTokenId.PUBLIC]
	| ['sealed', GroovyTokenId.SEALED]
	| ['static', GroovyTokenId.STATIC]
	| ['strictfp', GroovyTokenId.STRICTFP]
	| ['synchronized', GroovyTokenId.SYNCHRONIZED]
	| ['transient', GroovyTokenId.TRANSIENT]
	| ['var', GroovyTokenId.VAR]
	| ['volatile', GroovyTokenId.VOLATILE];

export type TsscmfvTypeKeywords =
	| ['@interface', GroovyTokenId.AT_INTERFACE]
	| ['class', GroovyTokenId.CLASS]
	| ['enum', GroovyTokenId.ENUM]
	| ['interface', GroovyTokenId.INTERFACE]
	| ['record', GroovyTokenId.RECORD]
	| ['trait', GroovyTokenId.TRAIT];

export type TsscmfvTypeInheritKeywords =
	| ['extends', GroovyTokenId.EXTENDS]
	| ['implements', GroovyTokenId.IMPLEMENTS]
	| ['permits', GroovyTokenId.PERMITS];

export type TsscmfvMethodReturnKeywords =
	| ['void', GroovyTokenId.VOID];

export type TsscmfvMethodThrowsKeywords =
	| ['throws', GroovyTokenId.THROWS];

export type TsscmfvKeywords =
	| TsscmfvModifierKeywords
	| TsscmfvTypeKeywords | TsscmfvTypeInheritKeywords
	| TsscmfvMethodReturnKeywords | TsscmfvMethodThrowsKeywords;
