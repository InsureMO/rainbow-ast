import {GroovyTokenId, T} from '../tokens';
import {TsscmfvModifierKeywordParser} from './tsscmfv-modifier-keyword';

/**
 * final keyword.
 * can be modifier of type, method.
 */
export class FinalParser extends TsscmfvModifierKeywordParser<['final', GroovyTokenId.FINAL]> {
	constructor() {
		super('final', T.FINAL);
	}

	static readonly instance = new FinalParser();
}
