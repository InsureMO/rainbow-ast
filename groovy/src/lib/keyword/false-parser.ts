import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class FalseParser extends SingleKeywordTokenParser {
	protected constructor() {
		super('false');
	}

	protected getTokenId(): GroovyTokenId {
		return T.False;
	}

	static readonly instance = new FalseParser();
}
