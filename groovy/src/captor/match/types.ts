/* single char */
export type Char = string;
/* single char match function */
export type CharMatchFn = (char: Char) => boolean;
export type CharMatch = {
	char: Char | CharMatchFn;
	/**
	 * number is integral, and is greater than or equals 0. cannot be infinity
	 * - ignored when anti is true.
	 */
	minTimes: number;
	/**
	 * number is integral, and greater than minTimes. can be infinity
	 * - ignored when anti is true.
	 */
	maxTimes: number;
	/** anti-rule */
	anti: boolean;
};

export type TokenMatch = Array<CharMatch>;
