import {PrintUtils} from '../utils';
import {CompilationUnitTokenId, TokenId, TokenIds} from './token-id';

export abstract class Token {
	protected _id: TokenId;
	protected _parent?: ContainerToken;

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

	get parent(): ContainerToken | undefined {
		return this._parent;
	}

	get ancestors(): ReadonlyArray<ContainerToken> {
		const ancestors: Array<ContainerToken> = [];
		let ancestor = this.parent;
		while (ancestor != null) {
			ancestors.unshift(ancestor);
			ancestor = ancestor.parent;
		}
		return ancestors;
	}

	get root(): Token {
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

export class ContainerToken extends Token {
	protected readonly _children?: Array<Token> = [];

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

	get children(): ReadonlyArray<Token> {
		return this._children;
	}
}

export type LeafTokenConstructOptions = {
	id: TokenId;
	/** start offset */
	start: number;
	/** start line */
	line: number;
	/** start column */
	column: number;
	/** text */
	text: string;
};

export class CompilationUnit extends ContainerToken {
	private readonly _text: string;
	private readonly _end: number;

	constructor(text: string) {
		super(CompilationUnitTokenId);
		this._text = text ?? '';
		this._end = this._text.length;
	}

	get text(): string {
		return this._text;
	}

	get start(): number {
		return 0;
	}

	get end(): number {
		return this._end;
	}

	get line(): number {
		return 1;
	}

	get column(): number {
		return 1;
	}

	get parent(): ContainerToken | undefined {
		return (void 0);
	}

	get ancestors(): ReadonlyArray<ContainerToken> {
		return [];
	}

	get root(): Token {
		return this;
	}

	get previousSiblings(): ReadonlyArray<Token> {
		return [];
	}

	get previousSibling(): Token | undefined {
		return (void 0);
	}

	get nextSiblings(): ReadonlyArray<Token> {
		return [];
	}

	get nextSibling(): Token | undefined {
		return (void 0);
	}
}

export class LeafToken extends Token {
	/** keep undefined when it is a container node */
	protected _text: string;
	protected _start: number;
	/** keep undefined when it is a container node */
	protected _end: number;
	protected _line: number;
	protected _column: number;

	constructor(options: LeafTokenConstructOptions) {
		super(options.id);
		this._text = options.text ?? '';
		this._start = options.start;
		this._end = options.start + this._text.length;
		this._line = options.line;
		this._column = options.column;
	}

	/**
	 * text
	 */
	get text(): string {
		return this._text;
	}

	/**
	 * start offset
	 */
	get start(): number {
		return this._start;
	}

	/**
	 * end offset
	 */
	get end(): number {
		return this._end;
	}

	/**
	 * start line
	 */
	get line(): number {
		return this._line;
	}

	/**
	 * start column
	 */
	get column(): number {
		return this._column;
	}
}
