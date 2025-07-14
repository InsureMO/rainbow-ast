import {AstBuildContext} from '../context';
import {BlockToken} from '../token';

/**
 * on block ended, and given block is shifted from context block stack already.
 */
export type OnBlockTokenEnded = (block: BlockToken, context: AstBuildContext) => void;

export type TokenPointcutConstructOptions = {
	onBlockEnded?: OnBlockTokenEnded;
}

export class TokenPointcut {
	private readonly _onBlockEnded?: OnBlockTokenEnded | undefined;

	constructor(options: TokenPointcutConstructOptions) {
		this._onBlockEnded = options.onBlockEnded;
	}

	/**
	 * block ended, and already unshift from context blocks stack
	 */
	onBlockEnded(block: BlockToken, context: AstBuildContext): void {
		this._onBlockEnded?.(block, context);
	}
}
