import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export type PrimitiveTypeParserArgs =
	| ['boolean', GroovyTokenId.BOOLEAN]
	| ['byte', GroovyTokenId.BYTE]
	| ['char', GroovyTokenId.CHAR]
	| ['double', GroovyTokenId.DOUBLE]
	| ['float', GroovyTokenId.FLOAT]
	| ['int', GroovyTokenId.INT]
	| ['long', GroovyTokenId.LONG]
	| ['short', GroovyTokenId.SHORT]

/**
 * primitive type can:
 * - start a field declaration
 * - start a method declaration
 * - start a variable statement
 * - type of as type declaration.
 */
export class PrimitiveTypeParser<A extends PrimitiveTypeParserArgs> extends SingleKeywordTokenParser {
	private readonly _tokenId: A[1];

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	static readonly instanceBoolean = new PrimitiveTypeParser('boolean', T.BOOLEAN);
	static readonly instanceByte = new PrimitiveTypeParser('byte', T.BYTE);
	static readonly instanceChar = new PrimitiveTypeParser('char', T.CHAR);
	static readonly instanceDouble = new PrimitiveTypeParser('double', T.DOUBLE);
	static readonly instanceFloat = new PrimitiveTypeParser('float', T.FLOAT);
	static readonly instanceInt = new PrimitiveTypeParser('int', T.INT);
	static readonly instanceLong = new PrimitiveTypeParser('long', T.LONG);
	static readonly instanceShort = new PrimitiveTypeParser('short', T.SHORT);
}
