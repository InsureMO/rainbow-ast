import {PostTokenCapturedAction, TokenCaptor} from '../captor';
import {TokenPointcut, TokenPointcutConstructOptions} from '../pointcut';
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

export type TokenCaptorDefs<S extends AstBuildState, Tn extends TokenName> = Readonly<Partial<{
	[K in Tn]: TokenCaptorDef<S> | TokenCaptorDefForStates<S> | Array<TokenCaptorDef<S> | TokenCaptorDefForStates<S>>;
}>>;

export type TokenCaptorOfStates<Sn extends AstBuildStateName> = Readonly<Partial<{
	[K in Sn]: Array<TokenCaptor>;
}>>;

export type TokenPointcutDefs<Tn extends TokenName> = Readonly<Partial<{
	[K in Tn]: TokenPointcutConstructOptions;
}>>;

export type TokenPointcuts<Tn extends TokenName> = Readonly<Partial<{ [K in Tn]: TokenPointcut }>>;

export class BuildUtils {
	// const TMB: TokenMatcherBuilder = TokenMatcherBuilder.create({LongestKeywordLength: 'synchronized'.length});
	//
	// // according to typescript enum compile rule, need to omit the string values
	// const AllGroovyAstBuildState: Array<GroovyAstBuildState> = Object.values(GroovyAstBuildState)
	// 	.filter(x => typeof x !== 'string')
	// 	.map(v => v as unknown as GroovyAstBuildState);

	private static mergeCaptorToState<Sn extends AstBuildStateName>(options: {
		target: TokenCaptorOfStates<Sn>;
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

	private static mergeTokenCaptors<S extends AstBuildState, Tn extends TokenName, Sn extends AstBuildStateName>(options: {
		target: TokenCaptorOfStates<Sn>;
		defs: TokenCaptorDefs<S, Tn>;
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

	static buildTokenCaptors<S extends AstBuildState, Tn extends TokenName, Sn extends AstBuildStateName>(options: {
		defs: Array<TokenCaptorDefs<S, Tn>>;
		tokenIdMap: Record<TokenName, TokenId>;
		stateNameMap: Record<AstBuildState, AstBuildStateName>;
		tokenMatcherBuilder: TokenMatcherBuilder;
	}): TokenCaptorOfStates<Sn> {
		const {defs, tokenIdMap, stateNameMap, tokenMatcherBuilder} = options;

		const target = {} as TokenCaptorOfStates<Sn>;
		defs.forEach(defs => BuildUtils.mergeTokenCaptors({
			target, defs, tokenIdMap, stateNameMap, tokenMatcherBuilder
		}));
		return target;
	}

	static buildTokenPointcuts<Tn extends TokenName>(options: {
		defs: Array<TokenPointcutDefs<Tn>>;
	}): TokenPointcuts<Tn> {
		const {defs} = options;

		const target = {} as TokenPointcuts<Tn>;
		defs.forEach(def => {
			for (const key of Object.keys(def)) {
				target[key] = new TokenPointcut(def[key as TokenName]);
			}
		});

		return target;
	}
}
