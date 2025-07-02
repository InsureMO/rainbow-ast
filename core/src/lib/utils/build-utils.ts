import {PostTokenCapturedAction, TokenCaptor} from '../captor';
import {TokenMatcherBuilder} from '../token-match';
import {AstBuildState, AstBuildStateName, TokenId, TokenName} from '../types';

export enum TokenCaptorStateInclusion {
	Include = 'Inc', Exclude = 'Exc'
}

export type TokenCaptorStates<S extends AstBuildState> = Readonly<[
	TokenCaptorStateInclusion, S | ReadonlyArray<S>, ...Array<S | ReadonlyArray<S>>
]>;

export type TokenCaptorDef<S extends AstBuildState> = Readonly<{
	patterns: string | ReadonlyArray<string>;
	forStates: TokenCaptorStates<S>;
	onCaptured?: PostTokenCapturedAction;
}>;

export type TokenCaptorDefForStates<S extends AstBuildState> = Readonly<
	& Pick<TokenCaptorDef<S>, 'patterns'>
	& { forks: Array<Omit<TokenCaptorDef<S>, 'patterns'>> }
>;

export type TokenCaptorDefs<S extends AstBuildState, TN extends TokenName> = Readonly<Partial<{
	[K in TN]: TokenCaptorDef<S> | TokenCaptorDefForStates<S> | Array<TokenCaptorDef<S> | TokenCaptorDefForStates<S>>;
}>>;

export type TokenCaptorOfStates<SN extends AstBuildStateName> = Readonly<Partial<{
	[K in SN]: Array<TokenCaptor>;
}>>;

export class BuildUtils {
	// const TMB: TokenMatcherBuilder = TokenMatcherBuilder.create({LongestKeywordLength: 'synchronized'.length});
	//
	// // according to typescript enum compile rule, need to omit the string values
	// const AllGroovyAstBuildState: Array<GroovyAstBuildState> = Object.values(GroovyAstBuildState)
	// 	.filter(x => typeof x !== 'string')
	// 	.map(v => v as unknown as GroovyAstBuildState);

	private static mergeCaptorToState<SN extends AstBuildStateName>(options: {
		target: TokenCaptorOfStates<SN>;
		state: AstBuildState;
		captors: Array<TokenCaptor>;
		stateNameMap: Record<AstBuildState, AstBuildStateName>;
	}): void {
		const {target, state, captors, stateNameMap} = options;

		const stateName = stateNameMap[state];
		const existing = target[stateName];
		if (existing == null) {
			target[stateName] = [];
		}
		target[stateName].push(...captors);
	}

	private static mergeTokenCaptors<S extends AstBuildState, TN extends TokenName, SN extends AstBuildStateName>(options: {
		target: TokenCaptorOfStates<SN>;
		defs: TokenCaptorDefs<S, TN>;
		tokenIdMap: Record<TokenName, TokenId>;
		stateNameMap: Record<AstBuildState, AstBuildStateName>;
		tokenMatcherBuilder: TokenMatcherBuilder;
	}): void {
		const {target, defs, tokenIdMap, stateNameMap, tokenMatcherBuilder} = options;
		// according to typescript enum compile rule, need to omit the string values
		const allStates: Array<AstBuildState> = Object.values(stateNameMap)
			.filter(x => typeof x !== 'string')
			.map(v => v as unknown as AstBuildState);

		const keys = Object.keys(defs);

		for (const key of keys) {
			const tokenId: TokenId = Number(tokenIdMap[key]);
			const defOfKey = defs[key as TokenName];
			for (const oneOfDefOfKey of ((Array.isArray(defOfKey) ? defOfKey : [defOfKey]))) {
				const patterns = oneOfDefOfKey.patterns;
				const matchers = (Array.isArray(patterns) ? patterns : [patterns]).map(pattern => tokenMatcherBuilder.build(pattern)).flat();
				for (const def of ((oneOfDefOfKey as TokenCaptorDefForStates<S>).forks != null ? (oneOfDefOfKey as TokenCaptorDefForStates<S>).forks : [oneOfDefOfKey as TokenCaptorDef<S>])) {
					const {forStates, onCaptured} = def;
					const captors: Array<TokenCaptor> = matchers.map(matcher => new TokenCaptor({
						tokenId, name: key, matcher, postAction: onCaptured
					}));

					const [forStatesType, ...definedStates] = forStates;
					const states: Array<AstBuildState> = definedStates.flat();
					switch (forStatesType) {
						case TokenCaptorStateInclusion.Exclude: {
							allStates
								.filter(state => !states.includes(state))
								.forEach((state: AstBuildState) => BuildUtils.mergeCaptorToState({
									target, state, captors, stateNameMap
								}));
							break;
						}
						case TokenCaptorStateInclusion.Include:
						default: {
							states.forEach((state: AstBuildState) => BuildUtils.mergeCaptorToState({
								target, state, captors, stateNameMap
							}));
							break;
						}
					}
				}
			}
		}
	}

	static buildTokenCaptors<S extends AstBuildState, TN extends TokenName, SN extends AstBuildStateName>(options: {
		defs: Array<TokenCaptorDefs<S, TN>>;
		tokenIdMap: Record<TokenName, TokenId>;
		stateNameMap: Record<AstBuildState, AstBuildStateName>;
		tokenMatcherBuilder: TokenMatcherBuilder;
	}): TokenCaptorOfStates<SN> {
		const {defs, tokenIdMap, stateNameMap, tokenMatcherBuilder} = options;

		const target = {} as TokenCaptorOfStates<SN>;
		defs.forEach(defs => BuildUtils.mergeTokenCaptors({
			target, defs, tokenIdMap, stateNameMap, tokenMatcherBuilder
		}));
		return target;
	}
}