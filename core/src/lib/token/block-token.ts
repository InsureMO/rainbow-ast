import {TokenId} from '../types';
import {Token} from './token';

/**
 * a block token, contains a set of {@link AtomicToken}.
 */
export class BlockToken extends Token {
	static readonly UNKNOWN_POSITION = -1;
	protected readonly _children?: Array<Token> = [];

	constructor(id: TokenId, firstChild?: Token) {
		super(id);
		if (firstChild != null) {
			this.appendChild(firstChild);
		}
	}

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
		return this._children[0]?.start ?? BlockToken.UNKNOWN_POSITION;
	}

	/**
	 * return end of last child
	 */
	get end(): number {
		return this._children[this._children.length - 1]?.end ?? BlockToken.UNKNOWN_POSITION;
	}

	/**
	 * return line of first child
	 */
	get line(): number {
		return this._children[0]?.line ?? BlockToken.UNKNOWN_POSITION;
	}

	/**
	 * return column of first child
	 */
	get column(): number {
		return this._children[0]?.column ?? BlockToken.UNKNOWN_POSITION;
	}

	get children(): ReadonlyArray<Token> {
		return this._children;
	}

	// write methods
	/**
	 * append given token as last child, and set this as given token's parent
	 */
	appendChild(token: Token): void {
		token.setParent(this);
		this._children.push(token);
	}

	/**
	 * shift the first child or do nothing if there is no child
	 */
	shiftChild(): Token | undefined {
		if (this._children.length > 0) {
			return this._children.shift();
		} else {
			return (void 0);
		}
	}

	/**
	 * unshift the given tokens
	 */
	unshiftChild(token: Token, ...more: Array<Token>): void {
		const tokens = [token, ...more];
		tokens.forEach(token => token.setParent(this));
		this._children.unshift(...tokens);
	}

	/**
	 * pop a specified number of child tokens
	 */
	popChild(count: number): void {
		if (count <= 0) {
			throw new Error('The number of children to be popped must be greater than 0.');
		}
		const length = this._children.length;
		if (length < count) {
			throw new Error(`There are not enough children[count=${length}] for the pop operation[count=${count}].`);
		}
		this._children.splice(-count);
	}
}
