import {GroovyTokenId, T} from '../tokens';
import {TsscmfvModifierKeywordParser} from './tsscmfv-modifier-keyword';

/**
 * strictfp keyword.
 * can be modifier of type, constructor, method.
 */
export class StrictfpParser extends TsscmfvModifierKeywordParser<['strictfp', GroovyTokenId.STRICTFP]> {
	constructor() {
		super('strictfp', T.STRICTFP);
	}

	static readonly instance = new StrictfpParser();
}
