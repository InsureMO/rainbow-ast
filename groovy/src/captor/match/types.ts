/* single char */
export type Char = string;
/** multiple chars, at least 2 chars */
export type Chars = string;
/* single char match function */
export type CharMatchFn = (char: Char) => boolean;
export type CharMatches = Char | CharMatchFn;
export type CharMatchRule = { rule: CharMatches };
export type CharMatchOnceOrNot = { onceOrNot: true };
export type CharMatchAnyTimes = { anyTimes: true };
/**
 * - min must be greater than or equal 0
 * - max must be greater than or equal min
 */
export type CharMatchSpecificTimes = { min: number, max: number };
export type CharMatchThenEndBeforeMe = { endBeforeMe: true };
export type CharMatchRestriction =
	| CharMatchOnceOrNot
	| CharMatchAnyTimes
	| CharMatchSpecificTimes
	| CharMatchThenEndBeforeMe;
export type CharMatch = CharMatchRule & CharMatchRestriction

export enum TokenCharMatchUsage {
	ONCE = 0, ANY_TIMES = 1, END_BEFORE_ME = 2
}

export type TokenCharMatchOnce = CharMatchRule & { usage: TokenCharMatchUsage.ONCE };
export type TokenCharMatchAnyTimes = CharMatchRule & { usage: TokenCharMatchUsage.ANY_TIMES };
export type TokenCharMatchEndBeforeMe = CharMatchRule & { usage: TokenCharMatchUsage.END_BEFORE_ME };
export type TokenCharMatch =
	| TokenCharMatchOnce
	| TokenCharMatchAnyTimes
	| TokenCharMatchEndBeforeMe
export type TokenMatch =
	| Array<TokenCharMatchOnce>
	| [...Array<TokenCharMatchOnce>, TokenCharMatchAnyTimes]
	| [...Array<TokenCharMatchOnce>, TokenCharMatchEndBeforeMe]
	| [...Array<TokenCharMatchOnce>, TokenCharMatchAnyTimes, TokenCharMatchEndBeforeMe]
	| [TokenCharMatchAnyTimes]
	| [TokenCharMatchAnyTimes, TokenCharMatchEndBeforeMe];
