import {
	AstBuilder,
	AstBuilderConstructOptions,
	AstBuildStates,
	BuildUtils,
	TokenCaptorOfStates,
	TokenIds,
	TokenPointcuts
} from '@rainbow-ast/core';
import {S} from './alias';
import {GroovyAstBuildState, GroovyAstBuildStateName} from './ast-build-state';
import {
	BooleanCaptorDefs,
	buildTokenCaptors,
	CharsCaptorDefs,
	IdentifierCaptorDefs,
	KeywordCaptorDefs,
	MarkCaptorDefs,
	NumberCaptorDefs, OperatorCaptorDefs,
	PrimitiveTypeCaptorDefs,
	SeparatorCaptorDefs,
	StringCaptorDefs
} from './captors';
import {buildTokenPointcuts, NumericLiteralPointcutDefs, ScriptCommandPointcutDefs} from './pointcuts';
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
			captors: BuildUtils.buildLanguageCaptors(captors, GroovyAstBuildState),
			pointcuts: BuildUtils.buildLanguagePointcuts(pointcuts, GroovyTokenId)
		}
	});
};

export const createDefaultAstBuilder = (language?: Omit<GroovyLanguage, 'captors' | 'pointcuts'>) => {
	return buildAstBuilder({
		...language,
		captors: buildTokenCaptors([
			...SeparatorCaptorDefs,
			...MarkCaptorDefs,
			CharsCaptorDefs,
			BooleanCaptorDefs,
			...NumberCaptorDefs,
			...StringCaptorDefs,
			PrimitiveTypeCaptorDefs,
			KeywordCaptorDefs,
			IdentifierCaptorDefs,
			OperatorCaptorDefs
		]),
		pointcuts: buildTokenPointcuts([
			NumericLiteralPointcutDefs,
			ScriptCommandPointcutDefs
		])
	});
};

