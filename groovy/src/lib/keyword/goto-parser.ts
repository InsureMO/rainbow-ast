import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class GotoParser extends SingleKeywordTokenParser {
	protected constructor() {
		super('goto');
	}

	protected getTokenId(): GroovyTokenId {
		return T.GOTO;
	}

	static readonly instance = new GotoParser();
}
