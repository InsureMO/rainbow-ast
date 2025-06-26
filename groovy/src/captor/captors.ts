import {GroovyAstBuildContext, GroovyAstBuildState, GroovyAstBuildStateName} from '../ast';
import {TokenCaptor} from './captor';

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

	addCaptors(captor: TokenCaptor | Array<TokenCaptor>): void {
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
