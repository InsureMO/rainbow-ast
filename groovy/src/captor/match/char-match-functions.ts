import {CharMatchFn} from './types';

export class CharMatchFunctions {
	private static readonly _functions = new Map<string, CharMatchFn>();

	private constructor() {
		// to avoid extend
	}

	static findByName(name: string): CharMatchFn {
		const fn = this._functions.get(name);
		if (fn == null) {
			throw new Error(`Char match function[${name}] is not found.`);
		}
		return fn;
	}

	/**
	 * returns the old one, or undefined when no conflict
	 */
	static register(name: string, fn: CharMatchFn): CharMatchFn | undefined {
		const old = this._functions.get(name);
		this._functions.set(name, fn);
		return old;
	}
}
