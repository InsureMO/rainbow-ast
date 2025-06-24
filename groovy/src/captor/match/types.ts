/** single char */
export type Char = string;
export type CharMatchFn = (char: Char) => boolean;
export type CharMatch = Char | CharMatchFn;
/** times must >= 1 */
export type RepeatedCharMatch = { times: number, match: CharMatch };
/** match as many characters as possible */
export type EagerCharsMatch = { times: -1, match: CharMatch };
export type TokenMatch =
// @formatter:off
	/** for a finite number of strings */
	| Array<CharMatch | RepeatedCharMatch>
	/** for an infinite number of strings */
	| [...Array<CharMatch | RepeatedCharMatch>, EagerCharsMatch];
// @formatter:on
