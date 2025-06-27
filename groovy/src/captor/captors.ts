import {AstBuildContext, AstBuildState, AstBuildStateName} from '../ast';
import {TokenCaptor} from './captor';
import {TokenCaptorSelector} from './captor-selector';

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
	private readonly _state: AstBuildState;
	private readonly _name: AstBuildStateName;
	private readonly _selector: TokenCaptorSelector = new TokenCaptorSelector();

	constructor(name: AstBuildStateName) {
		this._name = name;
		this._state = AstBuildState[this._name];
	}

	get state(): AstBuildState {
		return this._state;
	}

	get name(): AstBuildStateName {
		return this._name;
	}

	get selector(): TokenCaptorSelector {
		return this._selector;
	}

	addCaptors(captors: TokenCaptor | Array<TokenCaptor>): void {
		this._selector.addCaptors(captors);
	}

	/**
	 * if any token captured, it will change the context, including:
	 * - token tree,
	 * - state of context, optional
	 * - containers of context, optional
	 * - char index of context,
	 */
	capture(context: AstBuildContext): TokenCaptureStatus {
		const [captor, capturedChars] = this._selector.precapture(context);
		if (captor == null) {
			return TokenCaptureStatus.None;
		}

		// TODO when the last char match of captor is CharMatchThenEndBeforeMe, remove the last char

		// TODO use captor to create token, and do create container, append into ast, etc.

		return TokenCaptureStatus.Captured;
	}
}
