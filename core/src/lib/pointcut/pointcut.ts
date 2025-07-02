import {AstBuildContext} from '../context';
import {BlockToken} from '../token';

export type OnBlockTokenEnd = (block: BlockToken, context: AstBuildContext) => void;

export type TokenPointcutConstructOptions = {
	onEnd?: OnBlockTokenEnd;
}

export class TokenPointcut {
	private readonly _onEnd?: OnBlockTokenEnd;

	constructor(options: TokenPointcutConstructOptions) {
		this._onEnd = options.onEnd;
	}

	onEnd(block: BlockToken, context: AstBuildContext): void {
		this._onEnd?.(block, context);
	}
}
