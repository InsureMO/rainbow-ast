// token id and name
import {TokenCaptors} from './captor';
import {TokenPointcut} from './pointcut';

/**
 * integral, 0 or positive, continuous.
 * 0 is compilation unit.
 */
export type TokenId = number;
export type TokenName = 'CompilationUnit' | string;
/**
 * enum actually, according to ts compile way
 */
export type FixedTokenIds = { CompilationUnit: 0, 0: 'CompilationUnit' };
/**
 * value number must > 0, integral, continuous, no duplication.
 * enum actually, according to ts compile way
 */
export type LanguageTokenIds = Record<TokenId, TokenName> & Record<TokenName, TokenId>;
export type TokenIds<T extends LanguageTokenIds = LanguageTokenIds> = FixedTokenIds & T;

// ast build state
/**
 * integral.
 * 0 is compilation unit.
 */
export type AstBuildState = number;
export type AstBuildStateName = 'CompilationUnit' | string;
/**
 * enum actually, according to ts compile way
 */
export type FixedAstBuildStates = { CompilationUnit: 0, 0: 'CompilationUnit' };
/**
 * value number must > 0, integral, no duplication.
 * enum actually, according to ts compile way
 */
export type LanguageAstBuildStates =
	& Record<AstBuildStateName, AstBuildState>
	& Record<AstBuildState, AstBuildStateName>;
export type AstBuildStates<T extends LanguageAstBuildStates = LanguageAstBuildStates> = FixedAstBuildStates & T;

// token id priority on ast build state
export type TokenCapturePriority = number;
export type TokenCapturePrioritiesOfState = Partial<Record<TokenId, TokenCapturePriority>>;
export type TokenCapturePriorities =
	& { $Default?: TokenCapturePrioritiesOfState }
	& { [K in AstBuildStateName]?: TokenCapturePrioritiesOfState };

// language
export type Language<T extends LanguageTokenIds = LanguageTokenIds, S extends LanguageAstBuildStates = LanguageAstBuildStates> = {
	tokenIds: TokenIds<T>;
	states: AstBuildStates<S>;
	initState: AstBuildState;
	tokenCapturePriorities: TokenCapturePriorities;
	captors: Record<AstBuildState, TokenCaptors>;
	pointcuts?: Record<TokenId, TokenPointcut>;
}
