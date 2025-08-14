import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class TrueParser extends SingleKeywordTokenParser {
	protected constructor() {
		super('true');
	}

	protected getTokenId(): GroovyTokenId {
		return T.True;
	}

	static readonly instance = new TrueParser();
}
