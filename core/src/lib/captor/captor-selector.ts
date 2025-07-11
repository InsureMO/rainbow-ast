import {DefaultTokenIdPriority} from '../consts';
import {AstBuildContext} from '../context';
import {Char, CharMatches, CharMatchFn, TokenCharMatchUsage} from '../token-match';
import {TokenCaptor} from './captor';
import {MultiChoicesCaptor} from './multi-choices-captor';

export type TokenCaptorOrSelector = TokenCaptor | MultiChoicesCaptor | TokenCaptorSelector;
export type PrecaptureContext = {
	/** char index in document */
	charIndex: number;
	/** char match index of token match */
	charMatchIndex: number;
	/** captured chars */
	captured: string;
}

/**
 * selector has 3 parts:
 * - by char map: given char matched exactly,
 * - by function map: given char matches function,
 * - fallback: given char doesn't match, which means the fallback captor can not capture given char.
 *
 * when a char passed to selector, select the available captors or sub selectors by char map or by function map,
 * if no captor found from char map and function map, returns fallback (could be undefined).
 *
 * a possible selector might be as below,
 *
 * <pre>
 * selector #1
 *  ╠  - a: captor #1 -> capture char "a"
 *  ╠  - b: selector #2 -> capture chars starts with "b", or char "b"
 *  ║     ╠  - 1: captor #3 -> capture chars "b1"
 *  ║     ╠  - 2: captor #4 -> capture chars "b2"
 *  ║     ╠  - fn#1: captor #5 -> capture chars "b*",
 *  ║     ║          "*" needs to be checked by fn#1 (can be 1 and 2)
 *  ║     ╠  - fn#2: selector #6 -> capture chars "b*",
 *  ║     ║     ║    "*" needs to be checked by fn#2 (can be 1 and 2)
 *  ║     ║     ╠  - x: captor #7 -> capture chars "b*x",
 *  ║     ║     ╚  - y: captor #8 -> capture chars "b*y",
 *  ║     ╚  - fallback: captor #9 -> char "b",
 *  ╚  - fallback: captor #11 -> any char not "a" or "b".
 * </pre>
 *
 * To improve the selection efficiency of the captor, the selector performs matching on a char-by-char basis.
 * For chars with the rule of "Any times", theoretically, they can occur an infinite number of times, which does not match the actual scenario.
 * Therefore, when creating a captor, rules containing "Any Times" will be unfolded into multiple ones for selection.
 *
 * For example, the string "inx" should be matched by the Identifier rule.
 * In Java, the matching rule of Identifier is actually "JNameStart;JNamePart:*;NotJNamePart:!".
 * If the "*" rule is not unfolded, only three characters can be matched, and the third character "x" cannot be matched.
 * Therefore, the matching of Identifier will actually be unfolded as follows:
 *
 * - "JNameStart;NotJNamePart:!",
 * - "JNameStart;JNamePart;NotJNamePart:!",
 * - "JNameStart;JNamePart:2;NotJNamePart:!",
 * - "JNameStart;JNamePart:3;NotJNamePart:!",
 * - ...
 * - "JNameStart;JNamePart:n;JNamePart:*;NotJNamePart:!" (determined by TokenMatcherBuilder.LongestKeywordLength, which is 12 in Java).
 *
 * In this way, "inx" will be matched by "JNameStart;JNamePart:2;NotJNamePart:!", and there is no problem with "Any Times".
 *
 * The reason for setting the maximum keyword length is that the rules of Identifier usually completely overlap with those of Keyword at the beginning.
 * Therefore, a sufficient length will ensure that strings of the appropriate length are correctly captured.
 * Consider the keyword "synchronized" (12 characters). Its keyword matching rule is "synchronized", a total of 13 characters.
 * After the Identifier rule is expanded, the longest rule that does not contain "Any times" is "JNameStart;JNamePart:12;NotJNamePart:!", which is 14 characters.
 * If there is a string "synchronrized1", obviously it will be captured by the Identifier rule.
 *
 * The final question is, if the string "synchronized" is captured, is it a keyword or an Identifier?
 * Since effective judgment can no longer be made at this point, we introduce the setting of priorities.
 * Usually, it should be recognized as a keyword, which means that keywords have a higher priority than Identifiers.
 */
export class TokenCaptorSelector {
	private readonly _byChar: Map<Char, TokenCaptorOrSelector> = new Map();
	// function might be sharing
	private readonly _byFunc: Map<CharMatchFn, TokenCaptorOrSelector> = new Map();
	private _fallback: TokenCaptor | MultiChoicesCaptor | undefined = (void 0);

	/**
	 * check char match's rule and restriction:
	 * - if restriction is any times
	 */
	private doAddCaptor<R extends CharMatches>(captor: TokenCaptor, matchIndex: number, rule: R, map: Map<R, TokenCaptorOrSelector>): void {
		const existing = map.get(rule);
		if (captor.matcher.matches.length - 1 === matchIndex) {
			// it is last match
			if (existing == null) {
				// no captor for this function yet
				map.set(rule, captor);
			} else if (existing instanceof TokenCaptor) {
				// the existing captor has exact same rule with given captor, raise error
				// throw new Error(`Multiple captors with same rule[${captor.description}].`);
				if (existing.availableCheck == null || captor.availableCheck == null) {
					throw new Error(`Multiple captors with same rule[${captor.description}], and at least one has no available check.`);
				}
				map.set(rule, new MultiChoicesCaptor().with(existing).and(captor));
			} else if (existing instanceof MultiChoicesCaptor) {
				if (captor.availableCheck == null) {
					throw new Error(`Multiple captors with same rule[${captor.description}], and at least one has no available check.`);
				}
				existing.and(captor);
			} else if (existing instanceof TokenCaptorSelector) {
				// at least one captor has same match rules as heading part already
				existing.fallbackBy(captor);
			} else {
				// never happen, theoretically
				throw new Error(`Unsupported existing data[${existing}].`);
			}
		} else {
			// not last match
			if (existing == null) {
				// no captor for this char yet
				const selector = new TokenCaptorSelector();
				map.set(rule, selector);
				selector.addCaptor(captor, matchIndex + 1);
			} else if (existing instanceof TokenCaptor) {
				// the existing captor's match rules are same as given captor's heading part
				// let existing captor to be fallback
				const selector = new TokenCaptorSelector();
				selector.fallbackBy(existing);
				map.set(rule, selector);
				selector.addCaptor(captor, matchIndex + 1);
			} else if (existing instanceof MultiChoicesCaptor) {
				const selector = new TokenCaptorSelector();
				selector.fallbackBy(existing);
				map.set(rule, selector);
				selector.addCaptor(captor, matchIndex + 1);
			} else if (existing instanceof TokenCaptorSelector) {
				// at least one captor has same match rules as heading part already
				// join them
				existing.addCaptor(captor, matchIndex + 1);
			} else {
				// never happen, theoretically
				throw new Error(`Unsupported existing data[${existing}].`);
			}
		}
	}

	addCaptor(captor: TokenCaptor, matchIndex: number = 0): void {
		const matches = captor.matcher.matches;
		const match = matches[matchIndex];
		const rule = match.rule;
		if (typeof rule === 'string') {
			this.doAddCaptor(captor, matchIndex, rule, this._byChar);
		} else {
			this.doAddCaptor(captor, matchIndex, rule, this._byFunc);
		}
	}

	addCaptors(captors: TokenCaptor | Array<TokenCaptor>): void {
		(Array.isArray(captors) ? captors : [captors]).forEach(captor => this.addCaptor(captor));
	}

	fallbackBy(captor: TokenCaptor | MultiChoicesCaptor): void {
		if (this._fallback != null) {
			// the exists fallback captor has exact same rule with given captor, raise error
			// throw new Error(`Multiple captors with same rule[${captor.description}].`);
			if (this._fallback instanceof TokenCaptor) {
				if (this._fallback.availableCheck == null) {
					throw new Error(`Multiple captors with same rule[${this._fallback.description}], and at least one has no available check.`);
				}
				if (captor instanceof MultiChoicesCaptor) {
					this._fallback = captor.and(this._fallback);
				} else if (captor.availableCheck == null) {
					throw new Error(`Multiple captors with same rule[${captor.description}], and at least one has no available check.`);
				} else {
					this._fallback = new MultiChoicesCaptor().with(this._fallback).and(captor);
				}
			} else {
				if (captor instanceof TokenCaptor && captor.availableCheck == null) {
					throw new Error(`Multiple captors with same rule[${captor.description}], and at least one has no available check.`);
				}
				this._fallback.and(captor);
			}
		} else {
			this._fallback = captor;
		}
	}

	// noinspection JSUnusedGlobalSymbols
	get byCharCaptors(): ReadonlyMap<Char, TokenCaptorOrSelector> {
		return this._byChar;
	}

	// noinspection JSUnusedGlobalSymbols
	get byFuncCaptors(): ReadonlyMap<CharMatchFn, TokenCaptorOrSelector> {
		return this._byFunc;
	}

	// noinspection JSUnusedGlobalSymbols
	get fallbackCaptor(): TokenCaptor | MultiChoicesCaptor | undefined {
		return this._fallback;
	}

	/**
	 * found captors are exactly matched,
	 * found selectors are matched the heading part
	 */
	// @formatter:off
	private findCaptorsAndSelectors(char: Char, context: AstBuildContext): { captors: Array<TokenCaptor>, selectors: Array<TokenCaptorSelector> } {
		// @formatter:on
		return [
			this._byChar.get(char),
			...[...this._byFunc.keys()].filter(func => func(char)).map(func => this._byFunc.get(func))
		].filter(matched => matched != null)
			.reduce((grouped, matched) => {
				if (matched instanceof TokenCaptor) {
					const availableCheck = matched.availableCheck;
					if (availableCheck == null || availableCheck(context)) {
						grouped.captors.push(matched);
					}
				} else if (matched instanceof MultiChoicesCaptor) {
					const choice = matched.select(context);
					if (choice != null) {
						grouped.captors.push(choice);
					}
				} else {
					grouped.selectors.push(matched);
				}
				return grouped;
			}, {captors: [] as Array<TokenCaptor>, selectors: [] as Array<TokenCaptorSelector>});
	}

	private computeCaptureChars(captor: TokenCaptor, precaptureContext: PrecaptureContext, char: string): [TokenCaptor, CapturedChars: string] {
		if (captor.matcher.matches[captor.matcher.matches.length - 1].usage === TokenCharMatchUsage.END_BEFORE_ME) {
			// continuous EndBeforeMe rules
			// the char captured by last char match isn't appended to captured text yet
			// so the trailing trim count is all trailing EndBeforeMe rules count - 1
			let trimTrailingCharCount = 0;
			for (let index = captor.matcher.matches.length - 2; index >= 0; index--) {
				if (captor.matcher.matches[index].usage === TokenCharMatchUsage.END_BEFORE_ME) {
					trimTrailingCharCount++;
				}
			}
			if (trimTrailingCharCount === 0) {
				return [captor, precaptureContext.captured];
			} else {
				return [captor, precaptureContext.captured.slice(0, -trimTrailingCharCount)];
			}
		} else {
			return [captor, precaptureContext.captured + char];
		}
	}

	/**
	 * continue find captors, all found captors are exactly matched.
	 *
	 * @see #findCaptorsAndSelectors
	 */
	private findMatchedCaptorsOfSelectorsByNextChar(context: AstBuildContext, precaptureContext: PrecaptureContext, thisChar: Char, matchedSelectors: Array<TokenCaptorSelector>): Array<[TokenCaptor, CapturedChars: string]> {
		const precaptureContextOfNextChar: PrecaptureContext = {
			charIndex: precaptureContext.charIndex + 1, charMatchIndex: precaptureContext.charMatchIndex + 1,
			captured: precaptureContext.captured + thisChar
		};
		return matchedSelectors
			.map(selector => selector.doSelect(context, precaptureContextOfNextChar))
			.filter(([captor]) => captor != null);
	}

	private findCaptorByPriority(context: AstBuildContext, matched: Array<[TokenCaptor, CapturedChars: string]>): [TokenCaptor, CapturedChars: string] {
		const tokenCapturePriorities = context.tokenCapturePrioritiesOfCurrentState;
		const withPriorityMatched = matched.map(matched => {
			return [...matched, tokenCapturePriorities?.[matched[0].tokenName] ?? DefaultTokenIdPriority];
		}).reduce((result, matched) => {
			if (matched[2] === result.priority) {
				result.matched.push([matched[0], matched[1]]);
			} else if (matched[2] > result.priority) {
				result.matched.length = 0;
				result.matched.push([matched[0], matched[1]]);
				result.priority = matched[2];
			}
			return result;
		}, {priority: -Infinity, matched: [] as Array<[TokenCaptor, CapturedChars: string]>}).matched;
		if (withPriorityMatched.length > 1) {
			const captorsInfo = withPriorityMatched.map(([captor]) => {
				return `Captor[name=${captor.tokenName}, description=${captor.description}]`;
			}).join(', ');
			throw new Error(`Multiple captors[${captorsInfo}] found for text(${matched[0][1]}].`);
		} else {
			// never be 0
			return withPriorityMatched[0];
		}
	}

	/**
	 * follow steps as below,
	 * 1. find captors and selectors by this char,
	 * 2. find captors of selectors (found in step #1) by next char,
	 * 3. find captors that with longest captured chars,
	 * 4. if there are multiple captors, compare the priority, select the captor with the highest priority.
	 *    if there are still multiple captors, raise error,
	 * 5. if there is only one captor left, return it,
	 * 6. if there is no captor left, also return.
	 *
	 * It should be noted that the "captured chars" in the returned data only represent the characters captured during the process of selecting the captor,
	 * and do not represent all the content that the captor can capture.
	 * Considering that if the rule for the last character of the captor is an arbitrary number of occurrences,
	 * if the subsequent characters in the context string still meet this rule, they should actually be captured.
	 * However, in reality, they will not be captured during the process of selecting the captor.
	 */
	protected doSelect(context: AstBuildContext, precaptureContext: PrecaptureContext): [TokenCaptor | undefined, CapturedChars: string] {
		const document = context.document;
		const charIndex = precaptureContext.charIndex;
		const char = document[charIndex];

		// find captors and selectors by given char
		const {captors: matchedCaptors, selectors: matchedSelectors} = this.findCaptorsAndSelectors(char, context);
		// check the captured chars length, find the longest
		// theoretically, there should be only one captor
		const captured = [
			...matchedCaptors.map<[TokenCaptor, CapturedChars: string]>(captor => this.computeCaptureChars(captor, precaptureContext, char)),
			...this.findMatchedCaptorsOfSelectorsByNextChar(context, precaptureContext, char, matchedSelectors)
		];
		// selected the longest captured as result
		const longestLength = captured.reduce((length, [, captured]) => Math.max(length, captured.length), 0);
		const matched = captured.filter(([, captured]) => captured.length === longestLength);
		if (matched.length > 1) {
			// multiple captor found, check priority
			return this.findCaptorByPriority(context, matched);
		} else if (matched.length === 1) {
			return matched[0];
		} else if (this._fallback == null) {
			return [(void 0), ''];
		} else if (this._fallback instanceof MultiChoicesCaptor) {
			const fb = this._fallback.select(context);
			if (fb == null) {
				return [(void 0), ''];
			} else {
				return [fb, precaptureContext.captured];
			}
		} else {
			return [this._fallback, precaptureContext.captured];
		}
	}

	/**
	 * make sure the context is not eof, otherwise raise error.
	 */
	select(context: AstBuildContext): [TokenCaptor | undefined, CapturedChars: string] {
		if (context.eof) {
			throw new Error(`Meat EOF at index[${context.charIndex}].`);
		}
		return this.doSelect(context, {charIndex: context.charIndex, charMatchIndex: 0, captured: ''});
	}
}
