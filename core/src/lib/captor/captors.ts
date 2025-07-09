import {AstBuildContext} from '../context';
import {BlockToken, Token} from '../token';
import {AstBuildState, AstBuildStateName} from '../types';
import {
	CreateAndEndBlockOnPostTokenCaptured,
	CreateBlockTokenOnPostTokenCaptured,
	PostTokenCapturedActionType,
	SwitchStateToOnPostTokenCaptured,
	TokenCaptor
} from './captor';
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
	fallbackCaptor?: TokenCaptor;
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
		if (options.fallbackCaptor != null) {
			this._selector.fallbackBy(options.fallbackCaptor);
		}
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
	capture(context: AstBuildContext): [TokenCaptureStatus] | [TokenCaptureStatus, Token] {
		const [captor] = this._selector.select(context);
		if (captor == null) {
			return [TokenCaptureStatus.None];
		}

		const capturedToken = captor.capture(context);
		const {text} = capturedToken;

		const postAction = captor.postAction;
		switch (postAction?.[0]) {
			case PostTokenCapturedActionType.CreateBlock: {
				const [, tokenId, state] = postAction as CreateBlockTokenOnPostTokenCaptured;
				const blockToken = new BlockToken(tokenId, capturedToken);
				context.appendBlock(blockToken, state);
				break;
			}
			case PostTokenCapturedActionType.EndBlock: {
				context.appendAtomic(capturedToken).endCurrentBlock();
				break;
			}
			case PostTokenCapturedActionType.SwitchState: {
				const [, state] = postAction as SwitchStateToOnPostTokenCaptured;
				context.appendAtomic(capturedToken).replaceState(state);
				break;
			}
			case PostTokenCapturedActionType.CreateAndEndBlock: {
				const [, tokenId, state] = postAction as CreateAndEndBlockOnPostTokenCaptured;
				const blockToken = new BlockToken(tokenId, capturedToken);
				context.appendBlock(blockToken, state).endCurrentBlock();
				break;
			}
			default : {
				context.appendAtomic(capturedToken);
				break;
			}
		}

		let {line, column} = capturedToken;
		const lastNewlineIndex = text.lastIndexOf('\n');
		if (lastNewlineIndex === -1) {
			// no newline
			column = column + text.length;
		} else {
			line = line + text.split('\n').length - 1;
			column = text.slice(lastNewlineIndex).length;
		}
		context.moveCharIndexTo(context.charIndex + text.length).moveLineTo(line).moveColumnTo(column);

		return [TokenCaptureStatus.Captured, capturedToken];
	}
}
