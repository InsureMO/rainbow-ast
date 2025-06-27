// TODO this enumeration should be auto generated
export enum AstBuildState {
	CompilationUnit,
	CompilationUnitOmitScriptCommand
}

export type AstBuildStateName = Exclude<keyof typeof AstBuildState, number>;
