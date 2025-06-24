import {CompilationUnit} from '@rainbow-ast/core';

export enum GroovyAstBuildState {
	CompilationUnit
}

export class GroovyAstBuildContext {
	private readonly _compilationUnit: CompilationUnit;
	private readonly _document: string;

	/**
	 * the index of the char waiting to be recognized.
	 */
	private _charIndex: number = 0;
	/**
	 * the states start from the closest one.
	 * that is to say, the one with index 0 is the current state, the one with index 1 is a higher-level state, and so on.
	 */
	private _states: ReadonlyArray<GroovyAstBuildState> = [GroovyAstBuildState.CompilationUnit];

	constructor(compilationUnit: CompilationUnit) {
		this._compilationUnit = compilationUnit;
		this._document = this._compilationUnit.text;
	}

	get compilationUnit(): CompilationUnit {
		return this._compilationUnit;
	}

	get document(): string {
		return this._document;
	}

	get charIndex(): number {
		return this._charIndex;
	}

	get states(): GroovyAstBuildState {
		return this._states[0];
	}
}
