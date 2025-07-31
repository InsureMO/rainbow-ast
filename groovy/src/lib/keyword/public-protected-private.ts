import {GroovyTokenId, T} from '../tokens';
import {TsscmfvModifierKeywordParser} from './tsscmfv-modifier-keyword';

/**
 * public keyword.
 * can be modifier of type, constructor, method and field.
 */
export class PublicParser extends TsscmfvModifierKeywordParser<['public', GroovyTokenId.PUBLIC]> {
	protected constructor() {
		super('public', T.PUBLIC);
	}

	static readonly instance = new PublicParser();
}

/**
 * protected keyword.
 * can be modifier of type, constructor, method and field.
 */
export class ProtectedParser extends TsscmfvModifierKeywordParser<['protected', GroovyTokenId.PROTECTED]> {
	protected constructor() {
		super('protected', T.PROTECTED);
	}

	static readonly instance = new ProtectedParser();
}

/**
 * private keyword.
 * can be modifier of type, constructor, method and field.
 */
export class PrivateParser extends TsscmfvModifierKeywordParser<['private', GroovyTokenId.PRIVATE]> {
	protected constructor() {
		super('private', T.PRIVATE);
	}

	static readonly instance = new PrivateParser();
}
