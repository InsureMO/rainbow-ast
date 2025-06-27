import {CharMatchFunctions} from './char-match-functions';
import {TokenMatcher} from './token-matcher';
import {
	Char,
	CharMatch,
	CharMatchAnyTimes,
	CharMatchOnceOrNot,
	CharMatchRestriction,
	CharMatchSpecificTimes,
	CharMatchThenEndBeforeMe,
	Chars,
	TokenCharMatch,
	TokenCharMatchUsage,
	TokenMatch
} from './types';

export type ParsedCharMatch = Omit<CharMatch, 'rule'> & { rule: Char | Chars };

const BySemicolon = /(?<!\\);/g;
const ByColon = /(?<!\\):/g;
const CharMatchFnHead = 'fn#';

const parseCharMatchRule = (namePattern: string): string => {
	if (namePattern.startsWith('fn#') && namePattern.length > 3) {
		return namePattern;
	}

	return namePattern.split('').reduce((rst, char, index, chars) => {
		if (rst.ignore) {
			rst.ignore = false;
			return rst;
		}
		if (char === '\\') {
			rst.ignore = true;
			const next = chars[index + 1];
			switch (next) {
				// @formatter:off
				case '\\': { rst.text += '\\';                     break; }
				case ' ':  { rst.text += ' ';                      break; }
				case 't':  { rst.text += '\t';                     break; }
				case ';':  { rst.text += ';';                      break; }
				case ':':  { rst.text += ':';                      break; }
				case 'r':  { rst.text += '\r';                     break; }
				case 'n':  { rst.text += '\n';                     break; }
				default:   { rst.text += '\\'; rst.ignore = false; break; }
				// @formatter:on
			}
		} else {
			rst.text += char;
		}
		return rst;
	}, {text: '', ignore: false}).text;
};
const parseCharMatchRestriction = (rule: Char | Chars, restrictionPattern?: string): CharMatchRestriction => {
	const [times1, times2] = restrictionPattern == null
		? [(void 0), (void 0)]
		: restrictionPattern.split(',').map(times => times.trim());

	if (times1 === '!') {
		// CharMatchThenEndBeforeMe has top priority, and it will impact the rule chars later
		return {endBeforeMe: true};
	} else if ((rule.length > 1 && !rule.startsWith(CharMatchFnHead)) || (rule === CharMatchFnHead)) {
		// multiple chars, always match once
		return {min: 1, max: 1};
	} else if (times1 === '*') {
		return {anyTimes: true};
	} else if (times1 === '?') {
		return {onceOrNot: true};
	} else {
		const min = parseInt(times1) || -1;
		const max = parseInt(times2) || -1;
		if (min <= 0 && max <= 0) {
			// guard, both times <= 0, set both to 1
			return {min: 1, max: 1};
		} else if (min <= 0 && max > 0) {
			// guard, min <= 0 and max > 0, set min to 0
			return {min: 0, max};
		} else if (max <= 0) {
			// guard, max <= 0 and min > 0, set max to min
			return {min, max: min};
		} else if (max < min) {
			// guard, both times >= 0 and max < min, set max to min
			return {min, max: min};
		} else {
			return {min, max};
		}
	}
};
const parseCharMatch = (rulePattern: string): ParsedCharMatch | undefined => {
	let [rule, restriction] = rulePattern.split(ByColon);
	if (rule.endsWith('\\ ')) {
		// trim start only, since the last char is a blank
		rule = rule.replace(/^\s+/, '');
	} else {
		rule = rule.trim();
	}

	if (rule.length === 0) {
		return (void 0);
	}

	let parsedRule = parseCharMatchRule(rule);
	const parsedRestriction = parseCharMatchRestriction(parsedRule, restriction);
	if ((parsedRestriction as CharMatchThenEndBeforeMe).endBeforeMe) {
		// only the first char is accepted when restriction is CharMatchThenEndBeforeMe
		parsedRule = parsedRule[0];
	}
	return {rule: parsedRule, ...parsedRestriction};
};
const parseCharMatches = (pattern: string): Array<ParsedCharMatch> => {
	return pattern.split(BySemicolon)
		.filter(rulePattern => rulePattern.length > 0)
		.map(rulePattern => parseCharMatch(rulePattern))
		.filter(parsed => parsed != null);
};

const buildCharMatchRuleDescription = (match: ParsedCharMatch): string => {
	return match.rule.replace(/[\\\t\n\r;: ]/g, (match) => {
		return {
			'\\': '\\\\',
			'\t': '\\t',
			'\r': '\\r',
			'\n': '\\n',
			':': '\\:',
			';': '\\;',
			' ': '\\ '
		}[match];
	});
};
const buildCharMatchRestrictionDescription = (match: ParsedCharMatch): string => {
	if ((match as unknown as CharMatchThenEndBeforeMe).endBeforeMe) {
		return '-';
	} else if ((match as unknown as CharMatchAnyTimes).anyTimes) {
		return '*';
	} else if ((match as unknown as CharMatchOnceOrNot).onceOrNot) {
		return '?';
	} else {
		const {min, max} = match as unknown as CharMatchSpecificTimes;
		if (min === max) {
			if (min !== 1) {
				return `${min}`;
			} else {
				return (void 0);
			}
		} else {
			return `${min}, ${max}`;
		}
	}
};
const buildTokenMatcherDescription = (matches: Array<ParsedCharMatch>): string => {
	return matches.map(match => {
		return [buildCharMatchRuleDescription(match), buildCharMatchRestrictionDescription(match)].filter(x => x != null).join(': ');
	}).join('; ');
};

const buildCharMatch = ({rule, ...rest}: ParsedCharMatch): CharMatch | Array<CharMatch> => {
	if (rule.startsWith('fn#') && rule.length > 3) {
		const fn = CharMatchFunctions.findByName(rule.slice(3));
		if ((rest as CharMatchSpecificTimes).min != null) {
			const {min, max} = rest as CharMatchSpecificTimes;
			if (min === max) {
				if (min === 1) {
					return {rule: fn, min: 1, max: 1};
				} else {
					return new Array<CharMatch>(min).fill({rule: fn, min: 1, max: 1});
				}
			} else {
				return [
					...new Array<CharMatch>(min).fill({rule: fn, min: 1, max: 1}),
					{rule: fn, min: 0, max: max - min}
				];
			}
		} else {
			return {rule: fn, ...rest} as CharMatch;
		}
	} else if (rule.length > 1) {
		// multiple chars, always match once
		return rule.split('').map(char => ({rule: char, min: 1, max: 1}));
	} else if ((rest as CharMatchSpecificTimes).min != null) {
		const {min, max} = rest as CharMatchSpecificTimes;
		if (min === max) {
			if (min === 1) {
				return {rule, min: 1, max: 1};
			} else {
				return new Array<CharMatch>(min).fill({rule, min: 1, max: 1});
			}
		} else {
			return [
				...new Array<CharMatch>(min).fill({rule, min: 1, max: 1}),
				{rule, min: 0, max: max - min}
			];
		}
	} else {
		return {rule, ...rest} as CharMatch;
	}
};

// noinspection JSUnusedGlobalSymbols
export class TokenMatcherBuilder {
	static readonly BySemicolon = BySemicolon;
	static readonly ByColon = ByColon;
	static readonly CharMatchFnHead = CharMatchFnHead;

	static readonly parseCharMatch = parseCharMatch;
	static readonly parseCharMatches = parseCharMatches;

	static readonly buildCharMatchRuleDescription = buildCharMatchRuleDescription;
	static readonly buildCharMatchRestrictionDescription = buildCharMatchRestrictionDescription;
	static readonly buildTokenMatcherDescription = buildTokenMatcherDescription;

	/**
	 * - replace rule with function when it is starts with {@link CharMatchFnHead},
	 * - try to spread char matches if it is specific times. follows rules:
	 *   - when min equals max, spread to min = max = 1 with min times,
	 *   - when min less than max, spread to,
	 *     - min = max = 1 with min times
	 *     - min = 0, max = max - min
	 */
	static readonly buildCharMatch = buildCharMatch;

	/**
	 * the pattern contains multiple groups,
	 * 1. groups are separated by semicolon,
	 * 2. group pattern is one of followings:
	 * - "rule[: times]": times could be
	 *   - a number, must be greater than 0. when value is 1, this part can be ignored,
	 *   - or "*", means 0 to infinity,
	 *   - or "?" means 0 or 1,
	 * - "rule: minTimes, maxTimes":
	 *   - minTimes must be a number, and be greater than or equals 0,
	 *   - maxTimes must be a number, and be greater than minTimes,
	 * - "rule: !". anti-rule. when this rule matched, the char sequence ends with the previous char. so this rule is the last one,
	 * 3. the rule part could be:
	 * - char, times part allowed,
	 * - or chars (2 or more chars), times part now allowed. which means chars is not allowed for anti-rule ("rule: !"), or any other rules need to declare times,
	 * - or "fn#function name" (starts with "fn#"), function signature is {@link CharMatchFn}, and could be found by {@link CharMatchFunctions.findByName}.
	 * 4. in rule part, use escape to define special char:
	 * - "\ ": a blank. escaping is only required when the space character is at the beginning or the end of the rule.
	 * - "\\": a backslash. it is only necessary to use it when the next "\" is an escape character.
	 *   For example, "\\t" will be recognized as chars "\" and "t", while `\\\t` will be recognized as chars "\" and a tabulation.
	 * - "\;": a semicolon,
	 * - "\:": a colon,
	 * - "\r": a carriage return,
	 * - "\n": a new line.
	 *
	 * e.g.
	 * private                               chars "private", 1 time
	 * a                                     char "a", 1 time
	 * a: 2                                  char "a", 2 times, which is "aa"
	 * a: *                                  char "a", 0 - infinity times
	 * a: ?                                  char "a", 0 or 1 time
	 * a: 2, 3                               char "a", 2 or 3 times
	 * a: 2, 5                               char "a", 2 ~ 5 times
	 * a: -                                  cannot be char "a"
	 * fn#notJavaIdentifierChar: -           cannot matched by function notJavaIdentifierChar
	 *
	 * e.g.
	 * pri; v:1; ate: 2, 3; fn#notJavaIdentifierChar: -
	 *
	 * and token match will be spread, follows rules:
	 * - when char match restriction is specific times, then spread to max - min token matches.
	 *   e.g. *: 1,2;= -> *;= and *;*;=
	 * - when char match is once or not, then spread to one once and one not,
	 *   e.g. *: ?;= -> = and *;=
	 * - when char match is any times, then spread to one not and one once + one any times
	 *   e.g. *: *;= -> = and *;*:*;=
	 */
	static build(pattern: string): Array<TokenMatcher> {
		const parsedCharMatches = parseCharMatches(pattern);
		const description = buildTokenMatcherDescription(parsedCharMatches);
		const charMatches = parsedCharMatches.map(parsed => buildCharMatch(parsed)).flat();

		// spread
		// undefined means this char match could be ignored
		// e.g. *: ? -> undefined, {min: 1, max: 1}
		type SpreadCharMatch = Array<TokenCharMatch>;
		type SpreadCharMatchAtIndex = Array<SpreadCharMatch>;
		const spreadCharMatches: Array<SpreadCharMatchAtIndex> = [];
		charMatches.forEach(({rule, ...rest}) => {
			const spreadCharMatchAtIndex: SpreadCharMatchAtIndex = [];
			spreadCharMatches.push(spreadCharMatchAtIndex);
			if ((rest as CharMatchOnceOrNot).onceOrNot) {
				// ignored
				spreadCharMatchAtIndex.push([]);
				// once
				spreadCharMatchAtIndex.push([{rule, usage: TokenCharMatchUsage.ONCE}]);
			} else if ((rest as CharMatchAnyTimes).anyTimes) {
				// ignored
				spreadCharMatchAtIndex.push([]);
				spreadCharMatchAtIndex.push([
					{rule, usage: TokenCharMatchUsage.ONCE},
					{rule, usage: TokenCharMatchUsage.ANY_TIMES}
				]);
			} else if ((rest as CharMatchSpecificTimes).min != null) {
				const {min, max} = rest as CharMatchSpecificTimes;
				const oneTime = {rule, usage: TokenCharMatchUsage.ONCE};
				if (min === max) {
					// spread to min (also max) times
					spreadCharMatchAtIndex.push(new Array<TokenCharMatch>(min).fill(oneTime));
				} else {
					// spread to min times, min + 1 times, .... max times
					if (min === 0) {
						spreadCharMatchAtIndex.push([]);
					}
					// min times ... max times,
					// starts from 1 if min is 0
					for (let times = Math.max(min, 1); times <= max; times++) {
						spreadCharMatchAtIndex.push(new Array<TokenCharMatch>(times).fill(oneTime));
					}
				}
			} else {
				// CharMatchThenEndBeforeMe, do nothing
				spreadCharMatchAtIndex.push([{rule, usage: TokenCharMatchUsage.END_BEFORE_ME}]);
			}
		});
		// build cartesian product
		const tokenMatches: Array<TokenMatch> = spreadCharMatches.reduce((tokenMatches: Array<TokenMatch>, spreadCharMatchAtIndex) => {
			if (tokenMatches.length === 0) {
				return spreadCharMatchAtIndex.map(charMatch => [...charMatch] as TokenMatch);
			}
			return tokenMatches.flatMap(tokenMatch => spreadCharMatchAtIndex.map(spreadCharMatch => [...tokenMatch, ...spreadCharMatch] as TokenMatch));
		}, [] as Array<TokenMatch>);

		return tokenMatches.map(tokenMatch => new TokenMatcher(tokenMatch, description));
	}
}
