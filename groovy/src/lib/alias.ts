import {
	BeforeCollectTokenActionType,
	CollectTokenActionType,
	EndBlock,
	EndBlockBeforeCollect,
	TokenCaptorStateInclusion
} from '@rainbow-ast/core';
import {GroovyAstBuildState} from './ast-build-state';
import {GroovyTokenId} from './token';

export const T = GroovyTokenId;
export const S = GroovyAstBuildState;

export const Incl = TokenCaptorStateInclusion.Include;
export const Excl = TokenCaptorStateInclusion.Exclude;
export const Fbof = TokenCaptorStateInclusion.FallbackOf;
export const Fbex = TokenCaptorStateInclusion.FallbackOfExclude;

export const CB = CollectTokenActionType.CreateBlock;
export const SS = CollectTokenActionType.SwitchState;
export const EB: EndBlock = [CollectTokenActionType.EndBlock];
export const CE = CollectTokenActionType.CreateAndEndBlock;

export const EBBC: EndBlockBeforeCollect = [BeforeCollectTokenActionType.EndBlock];
