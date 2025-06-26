import {TokenCaptor} from './captor';
import {Char, CharMatches, CharMatchFn} from './match';

/**
 * selector has 3 parts:
 * - by char map,
 * - by function map,
 * - fallback.
 *
 * when a char passed to selector, select the available captors or sub selectors by char map or by function map,
 * if no captor found from char map and function map, returns fallback (could be undefined).
 *
 * a possible selector might be as below,
 *
 * <pre>
 * selector #1
 *  ╠  - a: captor -> capture char "a"
 *  ╠  - b: selector #2 -> capture chars starts with "b", or char "b"
 *  ║     ╠  - 1: captor -> capture chars "b1"
 *  ║     ╠  - 2: captor -> capture chars "b2"
 *  ║     ╠  - fn#1: captor -> capture chars "b*",
 *  ║     ║          "*" needs to be checked by fn#1 (can be 1 and 2)
 *  ║     ╠  - fn#2: selector #3 -> capture chars "b*",
 *  ║     ║     ║    "*" needs to be checked by fn#2 (can be 1 and 2)
 *  ║     ║     ╠  - x: captor -> capture chars "b*x",
 *  ║     ║     ╚  - y: captor -> capture chars "b*y",
 *  ║     ╚  - fallback: captor -> char "b"
 *  ╚ - fallback: captor -> any char not "a" or "b".
 * </pre>
 */
export class TokenCaptorSelector {
	private readonly _byChar: Map<Char, TokenCaptor | TokenCaptorSelector> = new Map();
	// function might be sharing
	private readonly _byFunc: Map<CharMatchFn, TokenCaptor | TokenCaptorSelector> = new Map();
	private _fallback: TokenCaptor | undefined = (void 0);

	private doAddCaptor<R extends CharMatches>(captor: TokenCaptor, matchIndex: number, rule: R, map: Map<R, TokenCaptor | TokenCaptorSelector>): void {
		const matches = captor.matcher.matches;
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

	getFallback(): TokenCaptor | undefined {
		return this._fallback;
	}
}
