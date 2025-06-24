import {AbstractToken} from './abstract-token';
import {IContainerToken, IToken} from './token';

export class ContainerToken extends AbstractToken implements IContainerToken {
	protected readonly _children?: Array<IToken> = [];

	get text(): string {
		const root = this.root;
		if (root == this) {
			return '';
		}
		return root.text.slice(this.start, this.end);
	}

	/**
	 * return start of first child
	 */
	get start(): number {
		return this._children[0]?.start ?? -1;
	}

	/**
	 * return end of last child
	 */
	get end(): number {
		return this._children[this._children.length - 1]?.end ?? -1;
	}

	/**
	 * return line of first child
	 */
	get line(): number {
		return this._children[0]?.line ?? -1;
	}

	/**
	 * return column of first child
	 */
	get column(): number {
		return this._children[0]?.column ?? -1;
	}

	get children(): ReadonlyArray<IToken> {
		return this._children;
	}
}