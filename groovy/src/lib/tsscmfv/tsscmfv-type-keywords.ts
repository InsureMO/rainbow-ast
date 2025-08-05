import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId} from '../tokens';
import {TsscmfvTypeKeywords} from './tsscmfv-keywords-types';

export class TsscmfvTypeKeywordParser<A extends TsscmfvTypeKeywords> extends SingleKeywordTokenParser {
	private readonly _tokenId: A[1];

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	static readonly instanceAtInterface = new TsscmfvTypeKeywordParser('@interface', GroovyTokenId.AT_INTERFACE);
	static readonly instanceClass = new TsscmfvTypeKeywordParser('class', GroovyTokenId.CLASS);
	static readonly instanceEnum = new TsscmfvTypeKeywordParser('enum', GroovyTokenId.ENUM);
	static readonly instanceInterface = new TsscmfvTypeKeywordParser('interface', GroovyTokenId.INTERFACE);
	static readonly instanceRecord = new TsscmfvTypeKeywordParser('record', GroovyTokenId.RECORD);
	static readonly instanceTrait = new TsscmfvTypeKeywordParser('trait', GroovyTokenId.TRAIT);
}

export const TsscmfvTKP = TsscmfvTypeKeywordParser;
