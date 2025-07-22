export interface CharacterData {
	isIdentifierIgnorable(codePoint: number): boolean;
	isJavaIdentifierStart(codePoint: number): boolean;
	isJavaIdentifierPart(codePoint: number): boolean;
	isWhitespace(codePoint: number): boolean;
}
