import {AstBuilder, CompilationUnit, TokenIds} from '@rainbow-ast/core';
import {GroovyTokenIds} from '../token';
import {GroovyAstBuildContext} from './context';

export class GroovyAstBuilder implements AstBuilder {
	private constructor() {
		// avoid extend
	}

	get ids(): TokenIds {
		return GroovyTokenIds;
	}

	build(cu: CompilationUnit): void {
		const context = new GroovyAstBuildContext(cu);

	}

	static readonly INSTANCE = new GroovyAstBuilder();
}
