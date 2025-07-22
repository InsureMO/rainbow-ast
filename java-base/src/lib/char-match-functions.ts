import {Char} from '@rainbow-ast/core';
import {Character} from './character';

export class JavaCharMatchFunctions {
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

	static Word(char: Char): boolean {
		// eof
		if (char == null) {
			return true;
		}

		const cp = char.codePointAt(0);
		// 0-9, a-z, A-Z
		if ((cp >= 48 && cp <= 57) || (cp >= 65 && cp <= 90) || (cp >= 97 && cp <= 122)) {
			return true;
		}
		if (cp <= 127) {
			return false;
		}
		// rule check
		return !Character.isJavaIdentifierPart(cp) || Character.isIdentifierIgnorable(cp);
	}

	static Bin(char: Char): boolean {
		return char === '0' || char === '1';
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
	}

	static Hex(char: Char): boolean {
		const codepoint = char?.codePointAt(0);
		// 0 -> 48, 9 -> 57, a -> 97, f -> 102, A -> 65, F -> 70
		return codepoint != null && ((codepoint >= 48 && codepoint <= 57) || (codepoint >= 97 && codepoint <= 102) || (codepoint >= 65 && codepoint <= 70));
	}

	static NumSign(char: Char): boolean {
		return char === '+' || char === '-';
	}

	static NumExponent(char: Char): boolean {
		return char === 'e' || char === 'E';
	}

	static IntSuffix(char: Char): boolean {
		return char === 'i' || char === 'I'
			|| char === 'l' || char === 'L'
			|| char === 'g' || char === 'G';
	}

	static DecSuffix(char: Char): boolean {
		return char === 'f' || char === 'F'
			|| char === 'd' || char === 'D';
	}

	static DecGSuffix(char: Char): boolean {
		return char === 'f' || char === 'F'
			|| char === 'd' || char === 'D'
			|| char === 'g' || char === 'G';
	}

	static Any(char: Char): boolean {
		return char != null;
	}

	/**
	 * not exact same as java, it excludes tab, carriage return and newline
	 */
	static Whitespace(char: Char): boolean {
		// eof
		if (char == null) {
			return false;
		}

		if (char === '\t' || char === '\r' || char === '\n') {
			return false;
		}

		const cp = char.codePointAt(0);
		return Character.isWhitespace(cp);
	}
}

export const JCM = JavaCharMatchFunctions;
