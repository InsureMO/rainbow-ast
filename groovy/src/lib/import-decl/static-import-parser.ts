import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class StaticImportParser extends SingleKeywordTokenParser {
	constructor() {
		super('static');
	}

	protected getTokenId(): GroovyTokenId {
		return T.STATIC;
	}

	static readonly instance = new StaticImportParser();
}
