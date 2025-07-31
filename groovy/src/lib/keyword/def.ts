import {GroovyTokenId, T} from '../tokens';
import {TsscmfvModifierKeywordParser} from './tsscmfv-modifier-keyword';

/**
 * def keyword.
 * can be modifier of type, constructor, method, field, variable.
 */
export class DefParser extends TsscmfvModifierKeywordParser<['def', GroovyTokenId.DEF]> {
	constructor() {
		super('def', T.DEF);
	}

	static readonly instance = new DefParser();
}
