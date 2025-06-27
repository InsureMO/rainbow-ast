// TODO this enumeration should be auto generated
import {GroovyTokenName} from '../token';

export enum AstBuildState {
	CompilationUnit,
	CompilationUnitOmitScriptCommand
}

export type AstBuildStateName = Exclude<keyof typeof AstBuildState, number>;

export const DefaultTokenIdPriority = Infinity;
export const TokenIdPriority: {
	$Default: Partial<Record<GroovyTokenName, number>>
} & Partial<Record<AstBuildStateName, Partial<Record<GroovyTokenName, number>>>> = {
	$Default: {
		Identifier: -100
	}
};
