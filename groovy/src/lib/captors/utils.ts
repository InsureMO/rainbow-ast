import {
	AstBuildState,
	AstBuildStates,
	BuildUtils,
	TokenCaptorOfStates,
	TokenCaptors,
	TokenIds,
	TokenMatcherBuilder
} from '@rainbow-ast/core';
import {GroovyAstBuildState, GroovyAstBuildStateName} from '../ast-build-state';
import {GroovyAstBuilder} from '../ast-builder';
import {GroovyTokenId, GroovyTokenName} from '../token';
import {GroovyTokenCapturePriorities} from '../token-priorities';
import {S} from './alias';
import {GroovyTokenCaptorDefs} from './types';

export const AllCUStates = [
	S.CompilationUnit,
	S.CompilationUnitOmitScriptCommand
];
export const CommentStates = [
	S.ScriptCommand,
	S.SLComment,
	S.MLComment
];
export const NumberLiteralStates = [
	S.BinNumLiteralStarted,
	S.BinNumLiteralNumEd,
	S.BinNumLiteralSepEd,
	S.HexNumLiteralStarted,
	S.HexNumLiteralNumEd,
	S.HexNumLiteralSepEd,
	S.NumLiteralIntEd,
	S.NumLiteralIntSepEd,
	S.NumLiteralDotEd,
	S.NumLiteralFracEd,
	S.NumLiteralFracSepEd,
	S.NumLiteralExpSignEd,
	S.NumLiteralExpNumEd,
	S.NumLiteralExpNumSepEd
];
export const StringLiteralStates = [
	S.StringLiteral,
	S.GStringLiteral,
	S.SlashyGStringLiteral,
	S.DollarSlashyGStringLiteral
];
export const CommentNumberString = [...CommentStates, ...NumberLiteralStates, ...StringLiteralStates];

export const GroovyTokenMatcherBuilder = TokenMatcherBuilder.create({LongestKeywordLength: 'synchronized'.length});

export const buildTokenCaptors = (defs: GroovyTokenCaptorDefs, ...more: Array<GroovyTokenCaptorDefs>): TokenCaptorOfStates<GroovyAstBuildStateName> => {
	return BuildUtils.buildTokenCaptors({
		defs: [defs, ...more],
		tokenIdMap: GroovyTokenId as unknown as Record<GroovyTokenName, GroovyTokenId>,
		stateNameMap: GroovyAstBuildState,
		tokenMatcherBuilder: GroovyTokenMatcherBuilder
	});
};

export type GroovyLanguage = {
	verbose?: boolean;
	initState?: GroovyAstBuildState;
	captors: TokenCaptorOfStates<GroovyAstBuildStateName>;
}

export const buildAstBuilder = (language: GroovyLanguage): GroovyAstBuilder => {
	const {verbose, initState, captors} = language;

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
			}, {} as Record<AstBuildState, TokenCaptors>)
		}
	});
};
