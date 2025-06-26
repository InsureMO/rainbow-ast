import {CharacterData} from './character-data';
import {CharacterData00} from './character-data-00';
import {CharacterData01} from './character-data-01';
import {CharacterData02} from './character-data-02';
import {CharacterData0E} from './character-data-0e';
import {CharacterDataLatin1} from './character-data-latin1';
import {CharacterDataPrivateUse} from './character-data-private-use';
import {CharacterDataUndefined} from './character-data-undefined';

export class CharacterDataSelector {
	static of(codePoint: number): CharacterData {
		if (codePoint >>> 8 == 0) {     // fast-path
			// 0 - 255
			return CharacterDataLatin1.instance;
		} else {
			switch (codePoint >>> 16) {  // plane 00-16
				case(0):
					return CharacterData00.instance;
				case(1):
					return CharacterData01.instance;
				case(2):
					return CharacterData02.instance;
				case(14):
					return CharacterData0E.instance;
				case(15):   // Private Use
				case(16):   // Private Use
					return CharacterDataPrivateUse.instance;
				default:
					return CharacterDataUndefined.instance;
			}
		}
	}
}