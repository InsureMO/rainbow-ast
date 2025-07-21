import {AstBuilder, AstBuildStates, BuildUtils, TokenCaptorOfStates, TokenIds, TokenPointcuts} from '@rainbow-ast/core';
import {S} from './alias';
import {GroovyAstBuildState, GroovyAstBuildStateName} from './ast-build-state';
import {buildTokenCaptors, TokenCaptorDefs} from './captors';
import {buildTokenPointcuts, TokenPointcutDefs} from './pointcuts';
import {GroovyTokenId, GroovyTokenName} from './token';
import {GroovyTokenCapturePriorities} from './token-priorities';

export type GroovyLanguage = {
	scriptCommandEnabled?: boolean;
	jdkVersion?: number;
};

export type GroovyLanguageOptions = GroovyLanguage & {
	verbose?: boolean;
	captors: TokenCaptorOfStates<GroovyAstBuildStateName>;
	pointcuts: TokenPointcuts<GroovyTokenName>;
}

export const buildAstBuilder = (language: GroovyLanguageOptions): AstBuilder => {
	const {
		verbose = false, scriptCommandEnabled = true, jdkVersion = 17,
		captors, pointcuts
	} = language;

	return new AstBuilder({
		verbose: verbose,
		language: {
			tokenIds: GroovyTokenId as unknown as TokenIds,
			states: GroovyAstBuildState as unknown as AstBuildStates,
			initState: scriptCommandEnabled ? S.CU : S.CUOmitScriptCmd,
			tokenCapturePriorities: GroovyTokenCapturePriorities,
			captors: BuildUtils.buildLanguageCaptors(captors, GroovyAstBuildState),
			pointcuts: BuildUtils.buildLanguagePointcuts(pointcuts, GroovyTokenId),

			scriptCommandEnabled,
			jdkVersion
		}
	});
};

export const createDefaultAstBuilder = (language?: Omit<GroovyLanguageOptions, 'captors' | 'pointcuts'>): AstBuilder => {
	return buildAstBuilder({
		...language,
		captors: buildTokenCaptors(TokenCaptorDefs),
		pointcuts: buildTokenPointcuts(TokenPointcutDefs)
	});
};

