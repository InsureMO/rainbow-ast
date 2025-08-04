import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId} from '../tokens';
import {TsscmfvTypeKeywords} from './tsscmfv-keywords-types';

export class TypeKeywordParser<A extends TsscmfvTypeKeywords> extends SingleKeywordTokenParser {
	private readonly _tokenId: A[1];

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	static readonly instanceAtInterface = new TypeKeywordParser('@interface', GroovyTokenId.AT_INTERFACE);
	static readonly instanceClass = new TypeKeywordParser('class', GroovyTokenId.CLASS);
	static readonly instanceEnum = new TypeKeywordParser('enum', GroovyTokenId.ENUM);
	static readonly instanceInterface = new TypeKeywordParser('interface', GroovyTokenId.INTERFACE);
	static readonly instanceRecord = new TypeKeywordParser('record', GroovyTokenId.RECORD);
	static readonly instanceTrait = new TypeKeywordParser('trait', GroovyTokenId.TRAIT);
}

export const TKP = TypeKeywordParser;
