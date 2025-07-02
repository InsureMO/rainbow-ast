// TODO this enumeration should be auto generated
export enum GroovyAstBuildState {
	CompilationUnit,
	CompilationUnitOmitScriptCommand,

	// shebang command
	ScriptCommand,
	// comments
	SLComment,
	MLComment,
	// number literals
	BinaryLiteralStarted,
	BinaryLiteralNumCaptured,
	OctalLiteral,
	IntegralLiteral,
	HexadecimalLiteralStarted,
	HexadecimalLiteralNumCaptured,
	DecimalLiteral,
	// string literals
	StringLiteral,
	GStringLiteral,
	SlashyGStringLiteral,
	DollarSlashyGStringLiteral,
}

export type GroovyAstBuildStateName = Exclude<keyof typeof GroovyAstBuildState, number>;
