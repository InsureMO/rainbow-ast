import {AstBuildContext} from '../context';
import {Token} from '../token';
import {AstBuildState, AstBuildStateName} from '../types';
import {TokenCaptor} from './captor';
import {TokenCaptorSelector} from './captor-selector';

export enum TokenCaptureStatus {
	/** token captured */
	Captured,
	/** not captured */
	None,
}

export type TokenCaptorsConstructOptions = {
	state: AstBuildState;
	name: AstBuildStateName;
	captors: Array<TokenCaptor>;
}

/**
 * for each ast build state, there will be one or more token captors corresponding to it.
 */
export class TokenCaptors {
	private readonly _state: AstBuildState;
	private readonly _stateName: AstBuildStateName;
	private readonly _selector: TokenCaptorSelector = new TokenCaptorSelector();

	constructor(options: TokenCaptorsConstructOptions) {
		this._state = options.state;
		this._stateName = options.name;
		this._selector.addCaptors(options.captors);
	}

	get state(): AstBuildState {
		return this._state;
	}

	get stateName(): AstBuildStateName {
		return this._stateName;
	}

	get selector(): TokenCaptorSelector {
		return this._selector;
	}

	/**
	 * if any token captured, it will change the context, including:
	 * - token tree,
	 * - state of context, optional
	 * - containers of context, optional
	 * - char index of context,
	 */
	capture(context: AstBuildContext): [TokenCaptureStatus, ...Array<Token>] {
		const [captor] = this._selector.precapture(context);
		if (captor == null) {
			return [TokenCaptureStatus.None];
		}

		const token = captor.capture(context);
		const {id, text, start, line, column} = token;
		context.moveCharIndexTo(context.charIndex + text.length).moveLineTo(line).moveColumnTo(column + text.length);

		// TODO use captor to create token, and do create container, append into ast, etc.

		return [TokenCaptureStatus.Captured, token];
	}
}
