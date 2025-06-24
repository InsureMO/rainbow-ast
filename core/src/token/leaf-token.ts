import {AbstractToken} from './abstract-token';
import {TokenId} from './token-id';

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

export class LeafToken extends AbstractToken {
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
