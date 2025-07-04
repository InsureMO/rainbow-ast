import {EndBlockOnPostTokenCaptured, PostTokenCapturedActionType, TokenCaptorStateInclusion} from '@rainbow-ast/core';
import {GroovyAstBuildState} from './ast-build-state';
import {GroovyTokenId} from './token';

export const T = GroovyTokenId;
export const S = GroovyAstBuildState;

export const Incl = TokenCaptorStateInclusion.Include;
export const Excl = TokenCaptorStateInclusion.Exclude;
export const Fbof = TokenCaptorStateInclusion.FallbackOf;
export const Fbex = TokenCaptorStateInclusion.FallbackOfExclude;

export const CB = PostTokenCapturedActionType.CreateBlock;
export const SS = PostTokenCapturedActionType.SwitchState;
export const EB: EndBlockOnPostTokenCaptured = [PostTokenCapturedActionType.EndBlock];
