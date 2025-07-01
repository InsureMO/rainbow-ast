import {
	AstBuildState,
	AstBuildStates,
	TokenCaptor,
	TokenCaptors,
	TokenIds,
	TokenMatcherBuilder
} from '@rainbow-ast/core';
import {GroovyAstBuildState} from '../ast-build-state';
import {GroovyAstBuilder} from '../ast-builder';
import {GroovyTokenId} from '../token';
import {GroovyTokenCapturePriorities} from '../token-priorities';
import {TokenCaptorDefs, TokenCaptorOfStates, TokenCaptorStateInclusion} from './types';

export const AllCUStates = [
	GroovyAstBuildState.CompilationUnit,
	GroovyAstBuildState.CompilationUnitOmitScriptCommand
];
export const CommentStates = [
	GroovyAstBuildState.ScriptCommand,
	GroovyAstBuildState.SLComment,
	GroovyAstBuildState.MLComment
];
export const NumberLiteralStates = [
	GroovyAstBuildState.BinaryLiteralExpectNumber,
	GroovyAstBuildState.BinaryLiteralExpectSuffix,
	GroovyAstBuildState.OctalLiteral,
	GroovyAstBuildState.IntegralLiteral,
	GroovyAstBuildState.HexadecimalLiteral,
	GroovyAstBuildState.DecimalLiteral
];
export const StringLiteralStates = [
	GroovyAstBuildState.StringLiteral,
	GroovyAstBuildState.GStringLiteral,
	GroovyAstBuildState.SlashyGStringLiteral,
	GroovyAstBuildState.DollarSlashyGStringLiteral
];
export const CommentNumberString = [...CommentStates, ...NumberLiteralStates, ...StringLiteralStates];

const TMB = TokenMatcherBuilder.create({LongestKeywordLength: 'synchronized'.length});
// according to typescript enum compile rule, need to omit the string values */
const AllGroovyAstBuildState = Object.values(GroovyAstBuildState).filter(x => typeof x === 'string').map(v => v as unknown as GroovyAstBuildState);
export const buildTokenCaptors = (defs: TokenCaptorDefs): TokenCaptorOfStates => {
	return Object.keys(defs).reduce((tcs, key) => {
		const {patterns, forStates: [forStatesType, ...states], onCaptured} = defs[key];
		const tokenId: GroovyTokenId = Number(GroovyTokenId[key]);
		const matchers = (Array.isArray(patterns) ? patterns : [patterns]).map(pattern => {
			return TMB.build(pattern);
		}).flat();
		const captors: Array<TokenCaptor> = matchers.map(matcher => new TokenCaptor({
			tokenId, name: key, matcher, postAction: onCaptured
		}));
		switch (forStatesType) {
			case TokenCaptorStateInclusion.Exclude: {
				AllGroovyAstBuildState.filter(state => !states.includes(state))
					.forEach((state: GroovyAstBuildState) => {
						const existing = tcs[GroovyAstBuildState[state]];
						if (existing == null) {
							tcs[GroovyAstBuildState[state]] = [];
						}
						tcs[GroovyAstBuildState[state]].push(...captors);
					});
				break;
			}
			case TokenCaptorStateInclusion.Include:
			default: {
				states.forEach((state: GroovyAstBuildState) => {
					const existing = tcs[GroovyAstBuildState[state]];
					if (existing == null) {
						tcs[GroovyAstBuildState[state]] = [];
					}
					tcs[GroovyAstBuildState[state]].push(...captors);
				});
				break;
			}
		}
		return tcs;
	}, {} as TokenCaptorOfStates);
};

export type GroovyLanguage = {
	verbose?: boolean;
	initState?: GroovyAstBuildState;
	captors: TokenCaptorOfStates;
}
export const buildAstBuilder = (language: GroovyLanguage): GroovyAstBuilder => {
	const {verbose, initState, captors} = language;

	return new GroovyAstBuilder({
		verbose: verbose ?? false,
		language: {
			tokenIds: GroovyTokenId as unknown as TokenIds,
			states: GroovyAstBuildState as unknown as AstBuildStates,
			initState: initState ?? GroovyAstBuildState.CompilationUnit,
			tokenCapturePriorities: GroovyTokenCapturePriorities,
			captors: Object.keys(captors).reduce((rst, name) => {
				const state = GroovyAstBuildState[name];
				rst[state] = new TokenCaptors({state, name, captors: captors[name]});
				return rst;
			}, {} as Record<AstBuildState, TokenCaptors>)
		}
	});
};
