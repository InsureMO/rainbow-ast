import {
	EndBlockOnPostTokenCaptured,
	PostTokenCapturedActionType,
	TokenCaptorStateInclusion,
	TokenCaptorStates
} from '@rainbow-ast/core';
import {GroovyAstBuildState} from './ast-build-state';
import {GroovyTokenId} from './token';

export const T = GroovyTokenId;
export const S = GroovyAstBuildState;

export const Incl = TokenCaptorStateInclusion.Include;
export const Excl = TokenCaptorStateInclusion.Exclude;
/** -1 is not a valid state, excludes -1 equals includes all */
export const InclAll: TokenCaptorStates<GroovyAstBuildState> = [Excl, -1 as GroovyAstBuildState];

export const CB = PostTokenCapturedActionType.CreateBlock;
export const SS = PostTokenCapturedActionType.SwitchState;
export const EB: EndBlockOnPostTokenCaptured = [PostTokenCapturedActionType.EndBlock];
