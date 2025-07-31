import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {GroovyTokenId, T} from '../tokens';
import {TsscmfvModifierKeywordParser} from './tsscmfv-modifier-keyword';

/**
 * static keyword.
 * can be modifier of type, method, field.
 * can be modifier of import declaration.
 */
export class StaticParser extends TsscmfvModifierKeywordParser<['static', GroovyTokenId.STATIC]> {
	constructor() {
		super('static', T.STATIC);
	}

	/**
	 * for {@link T.ImportDecl}, {@link T.TsscmfvDecl}, parse as keyword.
	 * otherwise start a {@link T.TsscmfvDecl}.
	 */
	parse(ch: Char, context: ParseContext): boolean {
		const block = context.block();
		if (block.id === T.ImportDecl) {
			return this.collectToken(ch, context);
		} else {
			return super.parse(ch, context);
		}
	}

	static readonly instance = new StaticParser();
}
