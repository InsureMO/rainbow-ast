import {CharMatchFunctions} from './char-match-functions';
import {CharMatch, TokenMatch} from './types';

const BySemicolon = /(?<!\\);/g;
const ByColon = /(?<!\\):/g;

export class TokenMatcher {
	private readonly _matches: TokenMatch;
	private readonly _description: string;

	constructor(matches: TokenMatch, description: string) {
		this._matches = matches;
		this._description = description;
	}

	get matches(): TokenMatch {
		return this._matches;
	}

	get description(): string {
		return this._description;
	}

	get first(): CharMatch {
		return this._matches[0];
	}

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
	 */
	static build(pattern: string): TokenMatcher {
		const rules = pattern.split(BySemicolon)
			.map(rule => rule.split(ByColon))
			.map(([name, times]) => {
				const [times1, times2] = times == null ? [(void 0), (void 0)] : times.split(',');
				if (name.endsWith('\\ ')) {
					name = name.replace(/^\s+/, '');
				} else {
					name = name.trim();
				}
				return [name, times1?.trim(), times2?.trim()];
			})
			.map(([name, times1, times2]) => {
				let restriction: Omit<CharMatch, 'char'>;
				if (times1 === '!') {
					restriction = {minTimes: 1, maxTimes: 1, anti: true};
				} else if (times1 === '*') {
					restriction = {minTimes: 0, maxTimes: Infinity, anti: false};
				} else if (times1 === '?') {
					restriction = {minTimes: 0, maxTimes: 1, anti: false};
				} else {
					restriction = {minTimes: parseInt(times1) || -1, maxTimes: parseInt(times2) || -1, anti: false};
					if (restriction.minTimes <= 0 && restriction.maxTimes <= 0) {
						// guard, both times <= 0, set both to 1
						restriction.minTimes = 1;
						restriction.maxTimes = 1;
					} else if (restriction.minTimes <= 0 && restriction.maxTimes > 0) {
						// guard, min <= 0 and max > 0, set min to 0
						restriction.minTimes = 0;
					} else if (restriction.maxTimes <= 0) {
						// guard, max <= 0 and min > 0, set max to min
						restriction.maxTimes = restriction.minTimes;
					} else if (restriction.maxTimes < restriction.minTimes) {
						// guard, both times >= 0 and max < min, set max to min
						restriction.maxTimes = restriction.minTimes;
					}
				}
				if (name.startsWith('fn#') && name.length > 3) {
					return {char: name, ...restriction};
				} else {
					name = name.split('').reduce((rst, char, index, chars) => {
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
					return {char: name, ...restriction};
				}
			});
		const description = rules.map(rule => {
			return [
				rule.char.replace(/[\\\t\n\r;: ]/g, (match, char) => {
					return {
						'\\': '\\\\',
						'\t': '\\t',
						'\r': '\\r',
						'\n': '\\n',
						':': '\\:',
						';': '\\;',
						' ': '\\ '
					}[match];
				}),
				rule.anti ? '-' : (void 0),
				(!rule.anti && rule.minTimes === rule.maxTimes && rule.minTimes !== 1) ? rule.minTimes : (void 0),
				(!rule.anti && rule.minTimes === 0 && rule.maxTimes === Infinity) ? '*' : (void 0),
				(!rule.anti && rule.minTimes === 0 && rule.maxTimes === 1) ? '?' : (void 0),
				(!rule.anti && rule.minTimes !== rule.maxTimes) ? `${rule.minTimes}, ${rule.maxTimes}` : (void 0)
			].filter(x => x != null).join(': ');
		}).join('; ');

		return new TokenMatcher(rules.map(rule => {
			if (rule.char.startsWith('fn#') && rule.char.length > 3) {
				const fn = CharMatchFunctions.findByName(rule.char.slice(3));
				if (rule.anti) {
					return {char: fn, minTimes: 1, maxTimes: 1, anti: true};
				} else if (rule.minTimes === rule.maxTimes) {
					return new Array(rule.minTimes).fill({char: fn, minTimes: 1, maxTimes: 1, anti: false});
				} else {
					return {...rule, char: fn};
				}
			} else if (rule.char.length > 1) {
				if (rule.anti) {
					return {char: rule.char[0], minTimes: 1, maxTimes: 1, anti: true};
				} else {
					return rule.char.split('').map(char => ({char, minTimes: 1, maxTimes: 1, anti: false}));
				}
			} else if (rule.anti) {
				return {char: rule.char, minTimes: 1, maxTimes: 1, anti: false};
			} else if (rule.minTimes === rule.maxTimes) {
				return new Array(rule.minTimes).fill({char: rule.char, minTimes: 1, maxTimes: 1, anti: false});
			} else {
				return rule;
			}
		}).flat(), description);
	}
}
