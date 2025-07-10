import {AstBuildContext} from '../context';
import {BlockToken} from '../token';

export type OnBlockTokenEnd = (block: BlockToken, context: AstBuildContext) => void;

export type TokenPointcutConstructOptions = {
	onBlockEnded?: OnBlockTokenEnd;
}

export class TokenPointcut {
	private readonly _onBlockEnded?: OnBlockTokenEnd;

	constructor(options: TokenPointcutConstructOptions) {
		this._onBlockEnded = options.onBlockEnded;
	}

	onBlockEnded(block: BlockToken, context: AstBuildContext): void {
		this._onBlockEnded?.(block, context);
	}
}
