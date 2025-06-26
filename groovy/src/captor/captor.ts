import {TokenId} from '@rainbow-ast/core';
import {GroovyAstBuildContext, GroovyAstBuildState, GroovyAstBuildStateName} from '../ast';
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

export enum TokenCaptureStatus {
	/** token captured */
	Captured,
	/** not captured */
	None,
}

/**
 * for each ast build state, there will be one or more token captors corresponding to it.
 */
export class TokenCaptors {
	private readonly _state: GroovyAstBuildState;
	private readonly _name: GroovyAstBuildStateName;
	private readonly _captors: Array<TokenCaptor>;

	constructor(name: GroovyAstBuildStateName) {
		this._name = name;
		this._state = GroovyAstBuildState[this._name];
	}

	get state(): GroovyAstBuildState {
		return this._state;
	}

	get name(): GroovyAstBuildStateName {
		return this._name;
	}

	addCaptor(captor: TokenCaptor): void {
		// TODO
	}

	/**
	 * if any token captured, it will change the context, including:
	 * - token tree,
	 * - state of context, optional
	 * - containers of context, optional
	 * - char index of context,
	 */
	capture(context: GroovyAstBuildContext): TokenCaptureStatus {
		// TODO
		return TokenCaptureStatus.None;
	}
}
