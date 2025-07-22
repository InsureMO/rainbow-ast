import {CharacterData} from './character-data';

export abstract class AbstractCharacterData implements CharacterData {
	/** same as java {@code (char) value}, value is an int value */
	javaCastToChar(codePoint: number): number {
		return codePoint & 0xFFFF;
	}

	/** default return false */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isIdentifierIgnorable(_codePoint: number): boolean {
		return false;
	}

	/** default return false */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isJavaIdentifierPart(_codePoint: number): boolean {
		return false;
	}

	/** default return false */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isJavaIdentifierStart(_codePoint: number): boolean {
		return false;
	}

	/** default return false */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isWhitespace(_codePoint: number): boolean {
		return false;
	}
}