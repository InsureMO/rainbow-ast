import {AbstractAst, AstBuilder} from '@rainbow-ast/core';
import {GroovyAstBuilder} from './builder';

export class GroovyAst extends AbstractAst {
	protected createBuilder(): AstBuilder {
		return GroovyAstBuilder.INSTANCE;
	}
}
