import {AstBuildContext} from '../context';
import {BlockToken, Token} from '../token';

export type OnBeforeChildAppend = (block: BlockToken, child: Token, context: AstBuildContext) => void;
/**
 * on block ended, and given block is shifted from context block stack already.
 */
export type OnBlockTokenEnded = (block: BlockToken, context: AstBuildContext) => void;

export type TokenPointcutConstructOptions = {
	onBeforeChildAppend?: OnBeforeChildAppend;
	onBlockEnded?: OnBlockTokenEnded;
}

export class TokenPointcut {
	private readonly _onBeforeChildAppend?: OnBeforeChildAppend;
	private readonly _onAfterBlockEnd?: OnBlockTokenEnded;

	constructor(options: TokenPointcutConstructOptions) {
		this._onBeforeChildAppend = options.onBeforeChildAppend;
		this._onAfterBlockEnd = options.onBlockEnded;
	}

	onBeforeChildAppend(block: BlockToken, child: Token, context: AstBuildContext): void {
		this._onBeforeChildAppend?.(block, child, context);
	}

	/**
	 * block ended, and already unshift from context blocks stack
	 */
	onAfterBlockEnd(block: BlockToken, context: AstBuildContext): void {
		this._onAfterBlockEnd?.(block, context);
	}
}
