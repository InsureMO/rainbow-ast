export const PrimitiveTypePatterns = {
	BOOLEAN: 'boolean;fn#NotJNamePart:!',
	CHAR: 'char;NoJNamePart:!',
	BYTE: 'byte;fn#NotJNamePart:!',
	SHORT: 'short;fn#NotJNamePart:!',
	INT: 'int;fn#NotJNamePart:!',
	LONG: 'long;fn#NotJNamePart:!',
	FLOAT: 'float;fn#NotJNamePart:!',
	DOUBLE: 'double;fn#NotJNamePart:!'
};

/**
 * 8 base primitive types: boolean, char, byte, short, int, long, float and double.
 * Possible scenarios:
 * 1. start a def statement:
 *    - "boolean abc": define a variable
 * 2. start a field declaration:
 *    - "boolean abc": declare a field, current parent must be class body
 * 3. start a method declaration:
 *    - "boolean abc()": declare a method, current parent must be class body, or compilation unit
 * 4. cast:
 *    - "(boolean) abc": cast abs to boolean
 * 5. as type:
 *    - "abc as boolean": declare abs as type boolean
 * 6. class:
 *    - "[1: boolean]": boolean class
 * 7. string: (captured by identifier)
 *    - "[boolean: 1]"
 *    - "test.boolean"
 */
// export const PrimitiveTypeTokenMatchers = buildTokenMatchers(PrimitiveTypePatterns);
