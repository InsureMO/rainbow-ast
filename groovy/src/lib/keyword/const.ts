import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class ConstParser extends SingleKeywordTokenParser {
	protected constructor() {
		super('const');
	}

	protected getTokenId(): GroovyTokenId {
		return T.CONST;
	}

	static readonly instance = new ConstParser();
}
