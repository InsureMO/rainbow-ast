import {CharacterDataSelector} from './character-data-selector';

export class Character {
	static isIdentifierIgnorable(codePoint: number): boolean {
		return CharacterDataSelector.of(codePoint).isIdentifierIgnorable(codePoint);
	}

	static isJavaIdentifierStart(codePoint: number): boolean {
		return CharacterDataSelector.of(codePoint).isJavaIdentifierStart(codePoint);
	}

	static isJavaIdentifierPart(codePoint: number): boolean {
		return CharacterDataSelector.of(codePoint).isJavaIdentifierPart(codePoint);
	}

	static isJavaIdentifierStartAndNotIdentifierIgnorable(codePoint: number): boolean {
		return Character.isJavaIdentifierStart(codePoint) && !Character.isIdentifierIgnorable(codePoint);
	}

	static isJavaIdentifierPartAndNotIdentifierIgnorable(codePoint: number): boolean {
		return Character.isJavaIdentifierPart(codePoint) && !Character.isIdentifierIgnorable(codePoint);
	}
}