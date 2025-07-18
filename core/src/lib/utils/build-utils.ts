import {
	BeforeCollectTokenAction,
	CollectTokenAction,
	TokenCaptor,
	TokenCaptorAvailableCheck,
	TokenCaptors
} from '../captor';
import {TokenPointcut, TokenPointcutConstructOptions} from '../pointcut';
import {TokenMatcherBuilder} from '../token-match';
import {AstBuildState, AstBuildStateName, TokenId, TokenName} from '../types';
import {PrintUtils} from './print-utils';

export enum TokenCaptorStateInclusion {
	Include = 'Incl', Exclude = 'Excl', FallbackOf = 'Fbof', FallbackOfExclude = 'Fbex'
}

export type TokenCaptorStates<S extends AstBuildState> = Readonly<[
	TokenCaptorStateInclusion, S | ReadonlyArray<S>, ...Array<S | ReadonlyArray<S>>
]>;

export type TokenCaptorDef<S extends AstBuildState> = Readonly<{
	patterns: string | ReadonlyArray<string>;
	forStates: TokenCaptorStates<S>;
	enabledWhen?: TokenCaptorAvailableCheck;
	beforeCollect?: BeforeCollectTokenAction;
	collect?: CollectTokenAction;
}>;

export type TokenCaptorDefForStates<S extends AstBuildState> = Readonly<
	& Pick<TokenCaptorDef<S>, 'patterns'>
	& { forks: ReadonlyArray<Omit<TokenCaptorDef<S>, 'patterns'>> }
>;

export type TokenCaptorDefs<S extends AstBuildState, Tn extends TokenName> = Readonly<Partial<{
	[K in Tn]: TokenCaptorDef<S> | TokenCaptorDefForStates<S> | Array<TokenCaptorDef<S> | TokenCaptorDefForStates<S>>;
}>>;

export type TokenCaptorOfStates<Sn extends AstBuildStateName> = Readonly<Partial<{
	[K in Sn]: ReadonlyArray<TokenCaptor | [TokenCaptorStateInclusion.FallbackOf, TokenCaptor]>;
}>>;

export type TokenPointcutDefs<Tn extends TokenName> = Readonly<Partial<{
	[K in Tn]: TokenPointcutConstructOptions;
}>>;

export type TokenPointcuts<Tn extends TokenName> = Readonly<Partial<{ [K in Tn]: TokenPointcut }>>;

export class BuildUtils {
	private static mergeCaptorToState<Sn extends AstBuildStateName>(options: {
		target: TokenCaptorOfStates<Sn>;
		state: AstBuildState;
		captors: Array<TokenCaptor>;
		stateNameMap: Record<AstBuildState, AstBuildStateName>;
		asFallback: boolean;
	}): void {
		const {target, state, captors, stateNameMap, asFallback} = options;

		const stateName = stateNameMap[state];
		const existing = target[stateName];
		if (existing == null) {
			target[stateName] = [];
		}
		if (asFallback) {
			target[stateName].push(...captors.map(captor => [TokenCaptorStateInclusion.FallbackOf, captor]));
		} else {
			target[stateName].push(...captors);
		}
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
					const {forStates, enabledWhen, beforeCollect, collect} = def;
					const captors: Array<TokenCaptor> = matchers.map(matcher => new TokenCaptor({
						tokenId, name: key, matcher,
						availableCheck: enabledWhen,
						beforeCollect, collect
					}));

					const [forStatesType, ...definedStates] = forStates;
					const states: Array<AstBuildState> = definedStates.flat();
					switch (forStatesType) {
						case TokenCaptorStateInclusion.Exclude: {
							allStates
								.filter(state => !states.includes(state))
								.forEach((state: AstBuildState) => BuildUtils.mergeCaptorToState({
									target, state, captors, stateNameMap, asFallback: false
								}));
							break;
						}
						case TokenCaptorStateInclusion.FallbackOfExclude: {
							allStates
								.filter(state => !states.includes(state))
								.forEach((state: AstBuildState) => BuildUtils.mergeCaptorToState({
									target, state, captors, stateNameMap, asFallback: true
								}));
							break;
						}
						case TokenCaptorStateInclusion.FallbackOf: {
							states.forEach((state: AstBuildState) => BuildUtils.mergeCaptorToState({
								target, state, captors, stateNameMap, asFallback: true
							}));
							break;
						}
						case TokenCaptorStateInclusion.Include:
						default: {
							states.forEach((state: AstBuildState) => BuildUtils.mergeCaptorToState({
								target, state, captors, stateNameMap, asFallback: false
							}));
							break;
						}
					}
				}
			}
		}
	}

	static buildTokenCaptors<S extends AstBuildState, Tn extends TokenName, Sn extends AstBuildStateName>(options: {
		defs: ReadonlyArray<TokenCaptorDefs<S, Tn>>;
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
		defs: ReadonlyArray<TokenPointcutDefs<Tn>>;
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

	static buildLanguageCaptors<Sn extends AstBuildStateName>(captors: TokenCaptorOfStates<Sn>, states: Record<Sn, AstBuildState>): Record<AstBuildState, TokenCaptors> {
		return Object.keys(captors).reduce((rst, name) => {
			const state = states[name];
			type GroupedCaptors = { standard: Array<TokenCaptor>, fallback?: TokenCaptor };
			type DefinedCaptor = TokenCaptor | [TokenCaptorStateInclusion.FallbackOf, TokenCaptor];
			const {
				standard: standardCaptors, fallback: fallbackCaptor
			} = captors[name].reduce((rst: GroupedCaptors, item: DefinedCaptor) => {
				if (Array.isArray(item)) {
					if (rst.fallback != null) {
						throw new Error('Only one fallback captor is allowed, ' +
							`now [tokenId=${rst.fallback.tokenId}, name=${rst.fallback.tokenName}, description=${PrintUtils.escapeForPrint(rst.fallback.description)}] ` +
							`and [tokenId=${item[1].tokenId}, name=${item[1].tokenName}, description=${PrintUtils.escapeForPrint(item[1].description)}] detected.`);
					}
					rst.fallback = item[1];
				} else {
					rst.standard.push(item);
				}
				return rst;
			}, {standard: []} as GroupedCaptors);
			rst[state] = new TokenCaptors({state, name, captors: standardCaptors, fallbackCaptor});
			return rst;
		}, {} as Record<AstBuildState, TokenCaptors>);
	}

	static buildLanguagePointcuts<Tn extends TokenName>(pointcuts: TokenPointcuts<Tn>, tokenIds: Record<Tn, TokenId>): Record<TokenId, TokenPointcut> {
		return Object.keys(pointcuts).reduce((rst, name: Tn) => {
			const tokenId = tokenIds[name];
			rst[tokenId] = pointcuts[name];
			return rst;
		}, {} as Record<TokenId, TokenPointcut>);
	}
}
