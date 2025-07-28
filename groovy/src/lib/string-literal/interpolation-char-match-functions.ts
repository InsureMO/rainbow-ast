import {Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';

export class InterpolationCharMatchFunctions {
	static INameStart(char: Char): boolean {
		// eof
		if (char == null) {
			return false;
		}

		if (char === '$') {
			return false;
		}

		return JCM.JNameStart(char);
	}

	static INamePart(char: Char): boolean {
		// eof
		if (char == null) {
			return false;
		}

		if (char === '$') {
			return false;
		}

		return JCM.JNamePart(char);
	}
}

export const ICM = InterpolationCharMatchFunctions;
