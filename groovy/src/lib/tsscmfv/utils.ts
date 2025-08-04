import {GroovyTokenId, T} from '../tokens';

export class TsscmfvKeywordUtils {
	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// avoid extends
	}

	static isTypeKeyword(tokenId: GroovyTokenId): boolean {
		return [T.AT_INTERFACE, T.CLASS, T.ENUM, T.INTERFACE, T.RECORD, T.TRAIT].includes(tokenId);
	}

	static isInheritKeyword(tokenId: GroovyTokenId): boolean {
		return [T.EXTENDS, T.IMPLEMENTS, T.PERMITS].includes(tokenId);
	}

	static isModifierKeyword(tokenId: GroovyTokenId): boolean {
		return [
			T.ABSTRACT, T.FINAL, T.STATIC, T.STRICTFP,
			T.DEF,
			T.NON_SEALED, T.SEALED,
			T.PRIVATE, T.PROTECTED, T.PUBLIC
		].includes(tokenId);
	}
}