import {CompilationUnit, Token} from './token';

export class Ast {
	private readonly _compilationUnit: CompilationUnit;

	constructor(compilationUnit: CompilationUnit) {
		this._compilationUnit = compilationUnit;
	}

	get compilationUnit(): CompilationUnit {
		return this._compilationUnit;
	}

	get document(): string {
		return this._compilationUnit.text;
	}

	get tokens(): ReadonlyArray<Token> {
		return this._compilationUnit.children;
	}
}