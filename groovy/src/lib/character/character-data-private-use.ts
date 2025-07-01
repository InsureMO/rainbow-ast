import {AbstractCharacterData} from './abstract-character-data';

export class CharacterDataPrivateUse extends AbstractCharacterData {
	static instance = new CharacterDataPrivateUse();
}