import {GroovyTokenId, T} from '../tokens';
import {TsscmfvModifierKeywordParser} from './tsscmfv-modifier-keyword';

/**
 * abstract keyword.
 * can be modifier of type, constructor, method.
 */
export class AbstractParser extends TsscmfvModifierKeywordParser<['abstract', GroovyTokenId.ABSTRACT]> {
	constructor() {
		super('abstract', T.ABSTRACT);
	}

	static readonly instance = new AbstractParser();
}
