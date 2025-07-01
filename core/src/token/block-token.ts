import {TokenId} from '../types';
import {Token} from './token';

/**
 * a block token, contains a set of {@link AtomicToken}.
 */
export class BlockToken extends Token {
	static readonly UNKNOWN_POSITION = -1;
	protected readonly _children?: Array<Token> = [];

	constructor(id: TokenId, firstChild: Token) {
		super(id);
		this._children.push(firstChild);
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

	appendChild(token: Token): void {
		this._children.push(token);
	}
}
