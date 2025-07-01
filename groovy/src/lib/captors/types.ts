import {PostTokenCapturedAction, TokenCaptor} from '@rainbow-ast/core';
import {GroovyAstBuildState, GroovyAstBuildStateName} from '../ast-build-state';
import {GroovyTokenName} from '../token';

export enum TokenCaptorStateInclusion {
	Include = 'Inc', Exclude = 'Exc'
}

export type TokenCaptorStates =
	| Readonly<[TokenCaptorStateInclusion, GroovyAstBuildState, ...Array<GroovyAstBuildState>]>
	| Readonly<[TokenCaptorStateInclusion, Array<GroovyAstBuildState>]>;

export type TokenCaptorDef = Readonly<{
	patterns: string | ReadonlyArray<string>;
	forStates: TokenCaptorStates;
	onCaptured?: PostTokenCapturedAction;
}>;
export type TokenCaptorDefs = Readonly<Partial<{
	[K in GroovyTokenName]: TokenCaptorDef;
}>>;
export type TokenCaptorOfStates = Readonly<Partial<{
	[K in GroovyAstBuildStateName]: Array<TokenCaptor>;
}>>;
