import {PrintUtils} from '../utils';
import {IContainerToken, IToken} from './token';
import {TokenId, TokenIds} from './token-id';

export abstract class AbstractToken implements IToken {
	protected _id: TokenId;
	protected _parent?: IContainerToken;

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

	get parent(): IContainerToken | undefined {
		return this._parent;
	}

	get ancestors(): ReadonlyArray<IContainerToken> {
		const ancestors: Array<IContainerToken> = [];
		let ancestor = this.parent;
		while (ancestor != null) {
			ancestors.unshift(ancestor);
			ancestor = ancestor.parent;
		}
		return ancestors;
	}

	get root(): IToken {
		let root: IToken = this;
		let parent = this.parent;
		while (parent != null) {
			root = parent;
			parent = parent.parent;
		}
		return root;
	}

	get previousSiblings(): ReadonlyArray<IToken> {
		const parent = this._parent;
		if (parent != null) {
			const children = parent.children;
			const myIndex = children.indexOf(this);
			return myIndex === 0 ? [] : children.slice(0, myIndex);
		} else {
			return [];
		}
	}

	get previousSibling(): IToken | undefined {
		const parent = this._parent;
		if (parent != null) {
			const children = parent.children;
			const myIndex = children.indexOf(this);
			return myIndex === 0 ? (void 0) : children[myIndex - 1];
		} else {
			return (void 0);
		}
	}

	get nextSiblings(): ReadonlyArray<IToken> {
		const parent = this._parent;
		if (parent != null) {
			const children = parent.children;
			const myIndex = children.indexOf(this);
			return (myIndex === children.length - 1) ? [] : children.slice(myIndex + 1);
		} else {
			return [];
		}
	}

	get nextSibling(): IToken | undefined {
		const parent = this._parent;
		if (parent != null) {
			const children = parent.children;
			const myIndex = children.indexOf(this);
			return (myIndex === children.length - 1) ? (void 0) : children[myIndex + 1];
		} else {
			return (void 0);
		}
	}

	stringify(ids: TokenIds): string {
		return [
			ids[this.id],
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
}
