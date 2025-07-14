import {AstBuildContext} from '../context';
import {BlockToken, Token} from '../token';
import {AstBuildState, AstBuildStateName} from '../types';
import {
	BeforeCollectTokenActionType,
	CollectTokenActionType,
	CreateAndEndBlock,
	CreateBlock,
	SwitchState,
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
		if (capturedToken == null) {
			// there are some troubles with the scenarios here. consider the following scenarios:
			// when the char(s) at the context position cannot be captured by the selected captor, there are two scenarios:
			// - the captor is defined incorrectly. in this case, an exception should be thrown.
			// - the current captors truly cannot capture the char(s).
			//   that is to say, the char(s) at the current context position does not belong to the current context state,
			//   so it really should not be captured.
			//   in this case, an un-captured state should be returned.
			// then the subtle difference between these two situations lies in
			// that if the selected captor is the fallback captor of the current captor group,
			// it can be considered that all standard captors are inappropriate,
			// and at the same time, the fallback captor is also inappropriate.
			// we can conclude that it does not belong to this captor group (returns un-captured state, #2).
			// in other cases, it should obviously be captured (throw exception, #1).
			if (captor === this._selector.fallbackCaptor) {
				return [TokenCaptureStatus.None];
			} else {
				throw new Error(`Cannot capture token from context, starts at char index[${context.charIndex}].`);
			}
		}
		const {text} = capturedToken;

		const beforeCollectAction = captor.beforeCollectAction;
		switch (beforeCollectAction?.[0]) {
			case BeforeCollectTokenActionType.EndBlock: {
				// end current block
				context.endCurrentBlock();
				break;
			}
			case BeforeCollectTokenActionType.Custom: {
				// execute the custom action
				beforeCollectAction[1](capturedToken, context);
				break;
			}
			default: {
				// do nothing
				break;
			}
		}

		const collectAction = captor.collectAction;
		switch (collectAction?.[0]) {
			case CollectTokenActionType.CreateBlock: {
				const [, tokenId, state] = collectAction as CreateBlock;
				const blockToken = new BlockToken(tokenId, capturedToken);
				context.appendBlock(blockToken, state);
				break;
			}
			case CollectTokenActionType.EndBlock: {
				context.appendAtomic(capturedToken).endCurrentBlock();
				break;
			}
			case CollectTokenActionType.SwitchState: {
				const [, state] = collectAction as SwitchState;
				context.appendAtomic(capturedToken).replaceState(state);
				break;
			}
			case CollectTokenActionType.CreateAndEndBlock: {
				const [, tokenId, state] = collectAction as CreateAndEndBlock;
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
