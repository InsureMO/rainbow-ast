import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class NullParser extends SingleKeywordTokenParser {
	protected constructor() {
		super('null');
	}

	protected getTokenId(): GroovyTokenId {
		return T.NULL;
	}

	static readonly instance = new NullParser();
}
