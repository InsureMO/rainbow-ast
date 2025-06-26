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

export type TokenMatch = Array<CharMatch>;
