import {AstBuildContext} from '../ast';
import {TokenCaptor} from './captor';
import {Char, CharMatches, CharMatchFn, TokenCharMatchUsage} from './match';

export type TokenCaptorOrSelector = TokenCaptor | TokenCaptorSelector;

/**
 * selector has 3 parts:
 * - by char map: given char matched exactly,
 * - by function map: given char matches function,
 * - by char or function, but current char match restriction is any times,
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
 *  ╠  - anyTimes:
 *  ║     ╚  - c: captors #10 -> capture "c+",
 *  ║             "+" means 1+ times,
 *  ╚  - fallback: captor #11 -> any char not "a" or "b".
 * </pre>
 */
export class TokenCaptorSelector {
	private readonly _byChar: Map<Char, TokenCaptorOrSelector> = new Map();
	// function might be sharing
	private readonly _byFunc: Map<CharMatchFn, TokenCaptorOrSelector> = new Map();
	// captors with any times
	private readonly _anyTimes: Map<CharMatches, Array<TokenCaptor>> = new Map();
	private _fallback: TokenCaptor | undefined = (void 0);

	/**
	 * check char match's rule and restriction:
	 * - if restriction is any times
	 */
	private doAddCaptor<R extends CharMatches>(captor: TokenCaptor, matchIndex: number, rule: R, map: Map<R, TokenCaptorOrSelector>): void {
		const matches = captor.matcher.matches;

		// if current char match is any times, push into
		const charMatch = matches[matchIndex];
		if (charMatch.usage === TokenCharMatchUsage.ANY_TIMES) {
			const existing = this._anyTimes.get(rule);
			if (existing == null) {
				this._anyTimes.set(rule, [captor]);
			} else {
				existing.push(captor);
			}
			return;
		}

		const existing = map.get(rule);
		if (matches.length - 1 === matchIndex) {
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

	protected doPrecapture(context: AstBuildContext, charMatchIndex: number): [TokenCaptor | undefined, CapturedChars: Array<Char>] {
		const document = context.document;
		const charIndex = context.charIndex;
		const char = document[charIndex];

		const matched = [
			this._byChar.get(char),
			...[...this._byFunc.keys()].filter(func => func(char)).map(func => this._byFunc.get(func))
		].filter(matched => matched != null);

		return [(void 0), []];
	}

	/**
	 * make sure the context is not eof, otherwise raise error.
	 */
	precapture(context: AstBuildContext): [TokenCaptor | undefined, CapturedChars: Array<Char>] {
		if (context.eof) {
			throw new Error(`Meat EOF at index[${context.charIndex}].`);
		}
		return this.doPrecapture(context, 0);
	}
}
