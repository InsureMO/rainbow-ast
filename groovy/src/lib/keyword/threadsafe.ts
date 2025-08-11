import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class ThreadsafeParser extends SingleKeywordTokenParser {
	protected constructor() {
		super('threadsafe');
	}

	protected getTokenId(): GroovyTokenId {
		return T.THREADSAFE;
	}

	static readonly instance = new ThreadsafeParser();
}
