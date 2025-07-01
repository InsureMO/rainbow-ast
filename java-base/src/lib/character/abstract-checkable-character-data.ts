import {AbstractCharacterData} from './abstract-character-data';

export abstract class AbstractCheckableCharacterData extends AbstractCharacterData {
	protected abstract getProperties(codePoint: number): number;

	isIdentifierIgnorable(codePoint: number): boolean {
		return ((this.getProperties(codePoint) & 0x00007000) === 0x00001000);
	}

	isJavaIdentifierPart(codePoint: number): boolean {
		return ((this.getProperties(codePoint) & 0x00003000) !== 0);
	}

	isJavaIdentifierStart(codePoint: number): boolean {
		return ((this.getProperties(codePoint) & 0x00007000) >= 0x00005000);
	}
}