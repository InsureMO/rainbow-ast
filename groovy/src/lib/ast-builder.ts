import {AstBuilder, AstBuilderConstructOptions} from '@rainbow-ast/core';

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
}
