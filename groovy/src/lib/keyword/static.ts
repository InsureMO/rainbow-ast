import {KeywordOnlyTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class StaticKwOnlyParser extends KeywordOnlyTokenParser {
	constructor() {
		super('static');
	}

	protected getTokenId(): GroovyTokenId {
		return T.STATIC;
	}

	static readonly instance = new StaticKwOnlyParser();
}
