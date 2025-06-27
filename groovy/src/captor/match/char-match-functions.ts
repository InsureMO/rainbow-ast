import {Character} from '../character';
import {Char, CharMatchFn} from './types';

export class CharMatchFunctions {
	private static readonly _functions = new Map<string, CharMatchFn>();

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// to avoid extend
	}

	static findByName(name: string): CharMatchFn {
		const fn = this._functions.get(name);
		if (fn == null) {
			throw new Error(`Char match function[${name}] is not found.`);
		}
		return fn;
	}

	/**
	 * returns the old one, or undefined when no conflict
	 */
	static register(name: string, fn: CharMatchFn): CharMatchFn | undefined {
		const old = this._functions.get(name);
		this._functions.set(name, fn);
		return old;
	}

	static JNameStart(char: Char): boolean {
		// eof
		if (char == null) {
			return false;
		}

		const cp = char.codePointAt(0);
		// $, _, a-z, A-Z
		if (cp === 36 || cp === 95 || (cp >= 65 && cp <= 90) || (cp >= 97 && cp <= 122)) {
			return true;
		}
		if (cp <= 127) {
			return false;
		}
		// rule check
		return Character.isJavaIdentifierStartAndNotIdentifierIgnorable(cp);
	}

	static JNamePart(char: Char): boolean {
		// eof
		if (char == null) {
			return false;
		}

		const cp = char.codePointAt(0);
		// $, _, 0-9, a-z, A-Z
		if (cp === 36 || cp === 95 || (cp >= 48 && cp <= 57) || (cp >= 65 && cp <= 90) || (cp >= 97 && cp <= 122)) {
			return true;
		}
		if (cp <= 127) {
			return false;
		}
		// rule check
		return Character.isJavaIdentifierPartAndNotIdentifierIgnorable(cp);
	}

	static NotJNamePart(char: Char): boolean {
		// eof
		if (char == null) {
			return true;
		}

		const cp = char.codePointAt(0);
		// $, _, 0-9, a-z, A-Z
		if (cp === 36 || cp === 95 || (cp >= 48 && cp <= 57) || (cp >= 65 && cp <= 90) || (cp >= 97 && cp <= 122)) {
			return false;
		}
		if (cp <= 127) {
			return true;
		}
		// rule check
		return !Character.isJavaIdentifierPart(cp) || Character.isIdentifierIgnorable(cp);
	}

	static Oct(char: Char): boolean {
		const codepoint = char?.codePointAt(0);
		// 0 -> 48, 7 -> 55
		return codepoint != null && (codepoint >= 48 && codepoint <= 55);
	}

	static Num(char: Char): boolean {
		const codepoint = char?.codePointAt(0);
		// 0 -> 48, 9 -> 57
		return codepoint != null && (codepoint >= 48 && codepoint <= 57);
	};

	static Hex(char: Char): boolean {
		const codepoint = char?.codePointAt(0);
		// 0 -> 48, 9 -> 57, a -> 97, f -> 102, A -> 65, F -> 70
		return codepoint != null && ((codepoint >= 48 && codepoint <= 57) || (codepoint >= 97 && codepoint <= 102) || (codepoint >= 65 && codepoint <= 70));
	}
}

CharMatchFunctions.register('JNameStart', CharMatchFunctions.JNameStart);
CharMatchFunctions.register('JNamePart', CharMatchFunctions.JNamePart);
CharMatchFunctions.register('NotJNamePart', CharMatchFunctions.NotJNamePart);
CharMatchFunctions.register('Oct', CharMatchFunctions.Oct);
CharMatchFunctions.register('Num', CharMatchFunctions.Num);
CharMatchFunctions.register('Hex', CharMatchFunctions.Hex);
