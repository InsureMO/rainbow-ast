import {AstBuilder, AstBuilderConstructOptions, CompilationUnit} from '@rainbow-ast/core';
import {GroovyAstBuildState} from './ast-build-state';

export interface GroovyAstBuildOptions extends AstBuilderConstructOptions {
	scriptCommandEnabled?: boolean;
}

export class GroovyAstBuilder extends AstBuilder {
	get groovyOptions(): Required<GroovyAstBuildOptions> {
		return super.options as Required<GroovyAstBuildOptions>;
	}

	protected initOptions(options: AstBuilderConstructOptions): Required<AstBuilderConstructOptions> {
		options = super.initOptions(options);

		const extendsOptions = options as GroovyAstBuildOptions;
		extendsOptions.scriptCommandEnabled = extendsOptions.scriptCommandEnabled ?? true;

		return options as Required<AstBuilderConstructOptions>;
	}

	protected getInitState(): GroovyAstBuildState {
		return this.groovyOptions.scriptCommandEnabled
			? GroovyAstBuildState.CompilationUnit
			: GroovyAstBuildState.CompilationUnitOmitScriptCommand;
	}

	protected parse(cu: CompilationUnit): void {
		// TODO
	}
}
