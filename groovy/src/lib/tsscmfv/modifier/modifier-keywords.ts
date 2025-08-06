import {SingleKeywordTokenParser} from '../../token-parser';
import {GroovyTokenId} from '../../tokens';

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

export class TsscmfvModifierKeywordParser<A extends TsscmfvModifierKeywords> extends SingleKeywordTokenParser {
	private readonly _tokenId: A[1];

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	static readonly instanceAbstract = new TsscmfvModifierKeywordParser('abstract', GroovyTokenId.ABSTRACT);
	static readonly instanceDef = new TsscmfvModifierKeywordParser('def', GroovyTokenId.DEF);
	static readonly instanceDefault = new TsscmfvModifierKeywordParser('default', GroovyTokenId.DEFAULT);
	static readonly instanceFinal = new TsscmfvModifierKeywordParser('final', GroovyTokenId.FINAL);
	static readonly instanceNative = new TsscmfvModifierKeywordParser('native', GroovyTokenId.NATIVE);
	static readonly instanceNonSealed = new TsscmfvModifierKeywordParser('non-sealed', GroovyTokenId.NON_SEALED);
	static readonly instancePrivate = new TsscmfvModifierKeywordParser('private', GroovyTokenId.PRIVATE);
	static readonly instanceProtected = new TsscmfvModifierKeywordParser('protected', GroovyTokenId.PROTECTED);
	static readonly instancePublic = new TsscmfvModifierKeywordParser('public', GroovyTokenId.PUBLIC);
	static readonly instanceSealed = new TsscmfvModifierKeywordParser('sealed', GroovyTokenId.SEALED);
	static readonly instanceStatic = new TsscmfvModifierKeywordParser('static', GroovyTokenId.STATIC);
	static readonly instanceStrictfp = new TsscmfvModifierKeywordParser('strictfp', GroovyTokenId.STRICTFP);
	static readonly instanceSynchronized = new TsscmfvModifierKeywordParser('synchronized', GroovyTokenId.SYNCHRONIZED);
	static readonly instanceTransient = new TsscmfvModifierKeywordParser('transient', GroovyTokenId.TRANSIENT);
	static readonly instanceVar = new TsscmfvModifierKeywordParser('var', GroovyTokenId.VAR);
	static readonly instanceVolatile = new TsscmfvModifierKeywordParser('volatile', GroovyTokenId.VOLATILE);
}

export const TsscmfvMKP = TsscmfvModifierKeywordParser;
