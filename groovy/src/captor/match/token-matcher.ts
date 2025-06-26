import {CharMatch, TokenMatch} from './types';

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
}
