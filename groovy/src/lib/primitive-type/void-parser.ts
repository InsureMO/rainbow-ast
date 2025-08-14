import {SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

/**
 * void type can:
 * - start a method declaration
 */
export class VoidParser extends SingleKeywordTokenParser {
	constructor() {
		super('void');
	}

	protected getTokenId(): GroovyTokenId {
		return T.VOID;
	}

	static readonly instance = new VoidParser();
}
