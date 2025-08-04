import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId} from '../tokens';
import {TsscmfvModifierKeywords} from './tsscmfv-keywords-types';

export class ModifierKeywordParser<A extends TsscmfvModifierKeywords> extends SingleKeywordTokenParser {
	private readonly _tokenId: A[1];

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	static readonly instanceAbstract = new ModifierKeywordParser('abstract', GroovyTokenId.ABSTRACT);
	static readonly instanceDef = new ModifierKeywordParser('def', GroovyTokenId.DEF);
	static readonly instanceFinal = new ModifierKeywordParser('final', GroovyTokenId.FINAL);
	static readonly instanceNonSealed = new ModifierKeywordParser('non-sealed', GroovyTokenId.NON_SEALED);
	static readonly instancePrivate = new ModifierKeywordParser('private', GroovyTokenId.PRIVATE);
	static readonly instanceProtected = new ModifierKeywordParser('protected', GroovyTokenId.PROTECTED);
	static readonly instancePublic = new ModifierKeywordParser('public', GroovyTokenId.PUBLIC);
	static readonly instanceSealed = new ModifierKeywordParser('sealed', GroovyTokenId.SEALED);
	static readonly instanceStatic = new ModifierKeywordParser('static', GroovyTokenId.STATIC);
	static readonly instanceStrictfp = new ModifierKeywordParser('strictfp', GroovyTokenId.STRICTFP);
}

export const MKP = ModifierKeywordParser;
