import {AstBuilder, CompilationUnit, TokenIds} from '@rainbow-ast/core';
import {GroovyTokenIds} from '../token';

export class GroovyAstBuilder implements AstBuilder {
	private constructor() {
		// avoid extend
	}

	get ids(): TokenIds {
		return GroovyTokenIds;
	}

	build(cu: CompilationUnit): void {
		const text = cu.text;

	}

	static readonly INSTANCE = new GroovyAstBuilder();
}
