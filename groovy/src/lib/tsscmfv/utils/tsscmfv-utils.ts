import {BlockToken, Token} from '@rainbow-ast/core';
import {GroovyTokenId, T} from '../../tokens';

export class TsscmfvKeywordUtils {
	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// avoid extends
	}

	static isTypeKeyword(tokenId: GroovyTokenId): boolean {
		return [T.AT_INTERFACE, T.CLASS, T.ENUM, T.INTERFACE, T.RECORD, T.TRAIT].includes(tokenId);
	}

	static isTypeInheritKeyword(tokenId: GroovyTokenId): boolean {
		return [T.EXTENDS, T.IMPLEMENTS, T.PERMITS].includes(tokenId);
	}

	static isModifierKeyword(tokenId: GroovyTokenId): boolean {
		return [
			T.ABSTRACT, T.FINAL, T.STATIC, T.STRICTFP,
			T.DEF, T.VAR,
			T.DEFAULT, T.NATIVE,
			T.NON_SEALED, T.SEALED,
			T.PRIVATE, T.PROTECTED, T.PUBLIC,
			T.SYNCHRONIZED,
			T.TRANSIENT, T.VOLATILE
		].includes(tokenId);
	}

	static isMfvTypeKeyword(tokenId: GroovyTokenId): boolean {
		return [T.VOID, T.BOOLEAN, T.BYTE, T.CHAR, T.DOUBLE, T.FLOAT, T.INT, T.LONG, T.SHORT].includes(tokenId);
	}

	static isMethodThrowsKeyword(tokenId: GroovyTokenId): boolean {
		return [T.THROWS].includes(tokenId);
	}

	/**
	 * for declaration which has {@link T.ModifierSeg}.
	 * return empty array when no {@link T.ModifierSeg}.
	 */
	static getModifierTokens(block: BlockToken): Array<Token> {
		const firstChildOfTsscmfv = block.children[0];
		if (firstChildOfTsscmfv.id === T.ModifierSeg) {
			return (firstChildOfTsscmfv as BlockToken).children?.filter(c => TsscmfvKeywordUtils.isModifierKeyword(c.id)) ?? [];
		} else {
			return [];
		}
	}

	static onlyStaticKeywords(modifiers: Array<Token>): boolean {
		return !modifiers.some(t => t.id !== T.STATIC);
	}

	static onlySynchronizedKeywords(modifiers: Array<Token>): boolean {
		return !modifiers.some(t => t.id !== T.SYNCHRONIZED);
	}

	static couldBeSynchronizedBlock(block: BlockToken): boolean {
		const modifierTokens = TsscmfvKeywordUtils.getModifierTokens(block);
		if (TsscmfvKeywordUtils.onlySynchronizedKeywords(modifierTokens)) {
			// synchronized block
			// no check it is under some type body directly,
			// if so, it is a method; otherwise use synchronized block
			const parentBlock = block.parent;
			return parentBlock.id !== T.TypeBody;
		} else {
			return false;
		}
	}

	static couldBeStaticBlock(block: BlockToken): boolean {
		const modifierTokens = TsscmfvKeywordUtils.getModifierTokens(block);
		return TsscmfvKeywordUtils.onlyStaticKeywords(modifierTokens);
	}
}