import {AstBuildContext, DefaultTokenIdPriority, TokenIdPriority} from '../ast';
import {TokenCaptor} from './captor';
import {Char, CharMatches, CharMatchFn, TokenCharMatchUsage} from './match';

export type TokenCaptorOrSelector = TokenCaptor | TokenCaptorSelector;
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
 */
export class TokenCaptorSelector {
	private readonly _byChar: Map<Char, TokenCaptorOrSelector> = new Map();
	// function might be sharing
	private readonly _byFunc: Map<CharMatchFn, TokenCaptorOrSelector> = new Map();
	private _fallback: TokenCaptor | undefined = (void 0);

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
				throw new Error(`Multiple captors with same rule[${captor.description}].`);
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
		let rule = match.rule;
		if (typeof rule === 'string') {
			this.doAddCaptor(captor, matchIndex, rule, this._byChar);
		} else {
			this.doAddCaptor(captor, matchIndex, rule, this._byFunc);
		}
	}

	addCaptors(captors: TokenCaptor | Array<TokenCaptor>): void {
		(Array.isArray(captors) ? captors : [captors]).forEach(captor => this.addCaptor(captor));
	}

	fallbackBy(captor: TokenCaptor): void {
		if (this._fallback != null) {
			// the exists fallback captor has exact same rule with given captor, raise error
			throw new Error(`Multiple captors with same rule[${captor.description}].`);
		}
		this._fallback = captor;
	}

	get byCharCaptors(): ReadonlyMap<Char, TokenCaptorOrSelector> {
		return this._byChar;
	}

	get byFuncCaptors(): ReadonlyMap<CharMatchFn, TokenCaptorOrSelector> {
		return this._byFunc;
	}

	get fallbackCaptor(): TokenCaptor | undefined {
		return this._fallback;
	}

	protected doPrecapture(context: AstBuildContext, precaptureContext: PrecaptureContext): [TokenCaptor | undefined, CapturedChars: string] {
		const document = context.document;
		const charIndex = precaptureContext.charIndex;
		const char = document[charIndex];

		// for matched once
		const {captors: matchedCaptors, selectors: matchedSelectors} = [
			this._byChar.get(char),
			...[...this._byFunc.keys()].filter(func => func(char)).map(func => this._byFunc.get(func))
		]
			.filter(matched => matched != null)
			.reduce((grouped, matched) => {
				if (matched instanceof TokenCaptor) {
					grouped.captors.push(matched);
				} else {
					grouped.selectors.push(matched);
				}
				return grouped;
			}, {captors: [] as Array<TokenCaptor>, selectors: [] as Array<TokenCaptorSelector>});

		// try to precapture next char
		// by matched selectors first
		const precaptureContextOfNextChar: PrecaptureContext = {
			charIndex: precaptureContext.charIndex + 1,
			charMatchIndex: precaptureContext.charMatchIndex + 1,
			captured: precaptureContext.captured + char
		};
		const matchedCaptorsByMatchedSelectors = matchedSelectors
			.map(selector => selector.doPrecapture(context, precaptureContextOfNextChar))
			.filter(([captor]) => captor != null);
		// check the captured chars length, find the longest
		// theoretically, there should be only one captor
		const captured = [
			...matchedCaptors.map<[TokenCaptor, CapturedChars: string]>(captor => {
				if (captor.matcher.matches[captor.matcher.matches.length - 1].usage === TokenCharMatchUsage.END_BEFORE_ME) {
					return [captor, precaptureContext.captured];
				} else {
					return [captor, precaptureContext.captured + char];
				}
			}),
			...matchedCaptorsByMatchedSelectors
		];
		const longestLength = captured.reduce((length, [, captured]) => Math.max(length, captured.length), 0);
		const matched = captured.filter(([, captured]) => captured.length === longestLength);
		if (matched.length > 1) {
			// multiple captor found, check priority
			const priority = TokenIdPriority[context.state] ?? TokenIdPriority.$Default;
			const withPriorityMatched = matched.map(matched => {
				return [...matched, priority[matched[0].name] ?? DefaultTokenIdPriority];
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
					return `Captor[name=${captor.name}, description=${captor.description}]`;
				}).join(', ');
				throw new Error(`Multiple captors[${captorsInfo}] found for text(${matched[0][1]}].`);
			} else {
				// never be 0
				return withPriorityMatched[0];
			}
		} else if (matched.length === 1) {
			return matched[0];
		} else if (this._fallback == null) {
			return [(void 0), ''];
		} else {
			return [this._fallback, precaptureContext.captured];
		}
	}

	/**
	 * make sure the context is not eof, otherwise raise error.
	 */
	precapture(context: AstBuildContext): [TokenCaptor | undefined, CapturedChars: string] {
		if (context.eof) {
			throw new Error(`Meat EOF at index[${context.charIndex}].`);
		}
		return this.doPrecapture(context, {charIndex: context.charIndex, charMatchIndex: 0, captured: ''});
	}
}
