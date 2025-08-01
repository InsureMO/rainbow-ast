import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId} from '../tokens';
import {TsscmfvParserArgs} from './tsscmfv-args';

export class TsscmfvKeywordParser<A extends TsscmfvParserArgs> extends SingleKeywordTokenParser {
	private readonly _tokenId: A[1];

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	static readonly instanceAtInterface = new TsscmfvKeywordParser('@interface', GroovyTokenId.AT_INTERFACE);
	static readonly instanceAbstract = new TsscmfvKeywordParser('abstract', GroovyTokenId.ABSTRACT);
	static readonly instanceClass = new TsscmfvKeywordParser('class', GroovyTokenId.CLASS);
	static readonly instanceDef = new TsscmfvKeywordParser('def', GroovyTokenId.DEF);
	static readonly instanceEnum = new TsscmfvKeywordParser('enum', GroovyTokenId.ENUM);
	static readonly instanceExtends = new TsscmfvKeywordParser('extends', GroovyTokenId.EXTENDS);
	static readonly instanceFinal = new TsscmfvKeywordParser('final', GroovyTokenId.FINAL);
	static readonly instanceImplements = new TsscmfvKeywordParser('implements', GroovyTokenId.IMPLEMENTS);
	static readonly instanceInterface = new TsscmfvKeywordParser('interface', GroovyTokenId.INTERFACE);
	static readonly instanceNonSealed = new TsscmfvKeywordParser('non-sealed', GroovyTokenId.NON_SEALED);
	static readonly instancePrivate = new TsscmfvKeywordParser('private', GroovyTokenId.PRIVATE);
	static readonly instanceProtected = new TsscmfvKeywordParser('protected', GroovyTokenId.PROTECTED);
	static readonly instancePublic = new TsscmfvKeywordParser('public', GroovyTokenId.PUBLIC);
	static readonly instanceRecord = new TsscmfvKeywordParser('record', GroovyTokenId.RECORD);
	static readonly instanceSealed = new TsscmfvKeywordParser('sealed', GroovyTokenId.SEALED);
	static readonly instanceStatic = new TsscmfvKeywordParser('static', GroovyTokenId.STATIC);
	static readonly instanceStrictfp = new TsscmfvKeywordParser('strictfp', GroovyTokenId.STRICTFP);
	static readonly instanceTrait = new TsscmfvKeywordParser('trait', GroovyTokenId.TRAIT);
}

export const TKP = TsscmfvKeywordParser;