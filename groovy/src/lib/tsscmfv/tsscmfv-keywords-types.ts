import {GroovyTokenId} from '../tokens';
import {TsscmfvTypeInheritKeywords, TsscmfvTypeKeywords} from './type';

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

export type TsscmfvMethodReturnKeywords =
	| ['void', GroovyTokenId.VOID];

export type TsscmfvMethodThrowsKeywords =
	| ['throws', GroovyTokenId.THROWS];

export type TsscmfvKeywords =
	| TsscmfvModifierKeywords
	| TsscmfvTypeKeywords | TsscmfvTypeInheritKeywords
	| TsscmfvMethodReturnKeywords | TsscmfvMethodThrowsKeywords;
