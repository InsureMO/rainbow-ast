import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId} from '../tokens';
import {TsscmfvModifierKeywords} from './tsscmfv-keywords-types';

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
	static readonly instanceFinal = new TsscmfvModifierKeywordParser('final', GroovyTokenId.FINAL);
	static readonly instanceNonSealed = new TsscmfvModifierKeywordParser('non-sealed', GroovyTokenId.NON_SEALED);
	static readonly instancePrivate = new TsscmfvModifierKeywordParser('private', GroovyTokenId.PRIVATE);
	static readonly instanceProtected = new TsscmfvModifierKeywordParser('protected', GroovyTokenId.PROTECTED);
	static readonly instancePublic = new TsscmfvModifierKeywordParser('public', GroovyTokenId.PUBLIC);
	static readonly instanceSealed = new TsscmfvModifierKeywordParser('sealed', GroovyTokenId.SEALED);
	static readonly instanceStatic = new TsscmfvModifierKeywordParser('static', GroovyTokenId.STATIC);
	static readonly instanceStrictfp = new TsscmfvModifierKeywordParser('strictfp', GroovyTokenId.STRICTFP);
	static readonly instanceSynchronized = new TsscmfvModifierKeywordParser('synchronized', GroovyTokenId.SYNCHRONIZED);
}

export const TsscmfvMKP = TsscmfvModifierKeywordParser;
