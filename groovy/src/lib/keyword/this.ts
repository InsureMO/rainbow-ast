import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class ThisParser extends SingleKeywordTokenParser {
	protected constructor() {
		super('this');
	}

	protected getTokenId(): GroovyTokenId {
		return T.THIS;
	}

	static readonly instance = new ThisParser();
}
