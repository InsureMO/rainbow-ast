import {AstBuildContext} from '../context';
import {BlockToken} from '../token';

export type OnBlockTokenEnded = (block: BlockToken, context: AstBuildContext) => void;

export type TokenPointcutConstructOptions = {
	onBlockEnded?: OnBlockTokenEnded;
}

export class TokenPointcut {
	private readonly _onBlockEnded?: OnBlockTokenEnded;

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
