import {Char, CharMatchFunctions} from '@rainbow-ast/core';
import {JavaCharMatchFunctions} from '@rainbow-ast/java-base';

export class GroovyCharMatchFunctions {
	static JNameStartExcl$(char: Char): boolean {
		if (char === '$') {
			return false;
		}
		return JavaCharMatchFunctions.JNameStart(char);
	}

	static JNamePartExcl$(char: Char): boolean {
		if (char === '$') {
			return false;
		}
		return JavaCharMatchFunctions.JNamePart(char);
	}

	static $OrNotJNameStart(char: Char): boolean {
		if (char === '$') {
			return true;
		}
		return !JavaCharMatchFunctions.JNameStart(char);
	}

	static $OrNotJNamePart(char: Char): boolean {
		if (char === '$') {
			return true;
		}
		return !JavaCharMatchFunctions.JNamePart(char);
	}
}

CharMatchFunctions.register('JNameStart', JavaCharMatchFunctions.JNameStart);
CharMatchFunctions.register('JNameStartExcl$', GroovyCharMatchFunctions.JNameStartExcl$);
CharMatchFunctions.register('$OrNotJNameStart', GroovyCharMatchFunctions.$OrNotJNameStart);
CharMatchFunctions.register('JNamePart', JavaCharMatchFunctions.JNamePart);
CharMatchFunctions.register('NotJNamePart', JavaCharMatchFunctions.NotJNamePart);
CharMatchFunctions.register('JNamePartExcl$', GroovyCharMatchFunctions.JNamePartExcl$);
CharMatchFunctions.register('$OrNotJNamePart', GroovyCharMatchFunctions.$OrNotJNamePart);
CharMatchFunctions.register('Word', JavaCharMatchFunctions.Word);
CharMatchFunctions.register('Bin', JavaCharMatchFunctions.Bin);
CharMatchFunctions.register('Oct', JavaCharMatchFunctions.Oct);
CharMatchFunctions.register('Num', JavaCharMatchFunctions.Num);
CharMatchFunctions.register('Hex', JavaCharMatchFunctions.Hex);
CharMatchFunctions.register('IntSuffix', JavaCharMatchFunctions.IntSuffix);
CharMatchFunctions.register('DecSuffix', JavaCharMatchFunctions.DecSuffix);
CharMatchFunctions.register('DecGSuffix', JavaCharMatchFunctions.DecGSuffix);
CharMatchFunctions.register('NotWTN', JavaCharMatchFunctions.AnyButWhitespaceTabNewline);
