import {GroovyTokenId} from '../tokens';

export type TsscmfvParserArgs =
	| ['@interface', GroovyTokenId.AT_INTERFACE]
	| ['abstract', GroovyTokenId.ABSTRACT]
	| ['class', GroovyTokenId.CLASS]
	| ['def', GroovyTokenId.DEF]
	| ['enum', GroovyTokenId.ENUM]
	| ['extends', GroovyTokenId.EXTENDS]
	| ['final', GroovyTokenId.FINAL]
	| ['implements', GroovyTokenId.IMPLEMENTS]
	| ['interface', GroovyTokenId.INTERFACE]
	| ['non-sealed', GroovyTokenId.NON_SEALED]
	| ['permits', GroovyTokenId.PERMITS]
	| ['private', GroovyTokenId.PRIVATE]
	| ['protected', GroovyTokenId.PROTECTED]
	| ['public', GroovyTokenId.PUBLIC]
	| ['record', GroovyTokenId.RECORD]
	| ['sealed', GroovyTokenId.SEALED]
	| ['static', GroovyTokenId.STATIC]
	| ['strictfp', GroovyTokenId.STRICTFP]
	| ['trait', GroovyTokenId.TRAIT];
