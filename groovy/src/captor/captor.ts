import {TokenId} from '@rainbow-ast/core';
import {GroovyTokenId, GroovyTokenName} from '../token';
import {TokenMatcher} from './match';

export interface TokenCaptorOptions {
	name: GroovyTokenName;
	matcher: TokenMatcher;
}

/**
 * the token captor is static. it can be referenced in one or more different context states,
 * and references in different states will not change the behavior of the captor.
 */
export class TokenCaptor {
	private readonly _tokenId: TokenId;
	private readonly _name: GroovyTokenName;
	private readonly _matcher: TokenMatcher;

	constructor(options: TokenCaptorOptions) {
		this._name = options.name;
		this._tokenId = GroovyTokenId[this._name];
		this._matcher = options.matcher;
	}

	get tokenId(): TokenId {
		return this._tokenId;
	}

	get name(): GroovyTokenName {
		return this._name;
	}

	get matcher(): TokenMatcher {
		return this._matcher;
	}

	get description(): string {
		return this._matcher.description;
	}
}

