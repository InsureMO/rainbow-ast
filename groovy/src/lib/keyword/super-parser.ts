import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class SuperParser extends SingleKeywordTokenParser {
	protected constructor() {
		super('super');
	}

	protected getTokenId(): GroovyTokenId {
		return T.SUPER;
	}

	static readonly instance = new SuperParser();
}
