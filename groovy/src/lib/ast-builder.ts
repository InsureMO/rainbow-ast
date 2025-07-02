import {
	AstBuilder,
	AstBuilderConstructOptions,
	AstBuildState,
	AstBuildStates,
	TokenCaptorOfStates,
	TokenCaptors,
	TokenId,
	TokenIds,
	TokenPointcut,
	TokenPointcuts
} from '@rainbow-ast/core';
import {S} from './alias';
import {GroovyAstBuildState, GroovyAstBuildStateName} from './ast-build-state';
import {GroovyTokenId, GroovyTokenName} from './token';
import {GroovyTokenCapturePriorities} from './token-priorities';

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

export type GroovyLanguage = {
	verbose?: boolean;
	initState?: GroovyAstBuildState;
	captors: TokenCaptorOfStates<GroovyAstBuildStateName>;
	pointcuts: TokenPointcuts<GroovyTokenName>;
}

export const buildAstBuilder = (language: GroovyLanguage): GroovyAstBuilder => {
	const {verbose, initState, captors, pointcuts} = language;

	return new GroovyAstBuilder({
		verbose: verbose ?? false,
		language: {
			tokenIds: GroovyTokenId as unknown as TokenIds,
			states: GroovyAstBuildState as unknown as AstBuildStates,
			initState: initState ?? S.CompilationUnit,
			tokenCapturePriorities: GroovyTokenCapturePriorities,
			captors: Object.keys(captors).reduce((rst, name) => {
				const state = GroovyAstBuildState[name];
				rst[state] = new TokenCaptors({state, name, captors: captors[name]});
				return rst;
			}, {} as Record<AstBuildState, TokenCaptors>),
			pointcuts: Object.keys(pointcuts).reduce((rst, name) => {
				const tokenId = GroovyTokenId[name];
				rst[tokenId] = pointcuts[name];
				return rst;
			}, {} as Record<TokenId, TokenPointcut>)
		}
	});
};
