import {TokenId, TokenIds} from '../types';
import {PrintUtils} from '../utils';
import {BlockToken} from './block-token';

export abstract class Token {
	protected _id: TokenId;
	protected _parent?: BlockToken;

	protected constructor(id: TokenId) {
		this._id = id;
	}

	get id(): TokenId {
		return this._id;
	}

	abstract get text(): string;

	abstract get start(): number;

	abstract get end(): number;

	abstract get line(): number;

	abstract get column(): number;

	get parent(): BlockToken | undefined {
		return this._parent;
	}

	setParent(parent: BlockToken): void {
		this._parent = parent;
	}

	get ancestors(): ReadonlyArray<BlockToken> {
		const ancestors: Array<BlockToken> = [];
		let ancestor = this.parent;
		while (ancestor != null) {
			ancestors.unshift(ancestor);
			ancestor = ancestor.parent;
		}
		return ancestors;
	}

	get root(): Token {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let root: Token = this;
		let parent = this.parent;
		while (parent != null) {
			root = parent;
			parent = parent.parent;
		}
		return root;
	}

	get previousSiblings(): ReadonlyArray<Token> {
		const parent = this._parent;
		if (parent != null) {
			const children = parent.children;
			const myIndex = children.indexOf(this);
			return myIndex === 0 ? [] : children.slice(0, myIndex);
		} else {
			return [];
		}
	}

	get previousSibling(): Token | undefined {
		const parent = this._parent;
		if (parent != null) {
			const children = parent.children;
			const myIndex = children.indexOf(this);
			return myIndex === 0 ? (void 0) : children[myIndex - 1];
		} else {
			return (void 0);
		}
	}

	get nextSiblings(): ReadonlyArray<Token> {
		const parent = this._parent;
		if (parent != null) {
			const children = parent.children;
			const myIndex = children.indexOf(this);
			return (myIndex === children.length - 1) ? [] : children.slice(myIndex + 1);
		} else {
			return [];
		}
	}

	get nextSibling(): Token | undefined {
		const parent = this._parent;
		if (parent != null) {
			const children = parent.children;
			const myIndex = children.indexOf(this);
			return (myIndex === children.length - 1) ? (void 0) : children[myIndex + 1];
		} else {
			return (void 0);
		}
	}

	stringify(tokenIds: TokenIds): string {
		return [
			tokenIds[this.id],
			'[',
			[
				['id', this.id],
				['offsetInDoc', `${this.start}, ${this.end}`],
				['xyInDoc', `${this.line}, ${this.column}`],
				['text', PrintUtils.escapeForPrint(this.text)]
			].map(attr => attr.join('=')).join(','),
			']'
		].join('');
	}

	// write methods
	rewriteId(id: TokenId): void {
		this._id = id;
	}
}
