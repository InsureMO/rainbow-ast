import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

/**
 * skw = Single keyword
 */
export class SkwStaticParser extends SingleKeywordTokenParser {
	constructor() {
		super('static');
	}

	protected getTokenId(): GroovyTokenId {
		return T.STATIC;
	}

	static readonly instance = new SkwStaticParser();
}
