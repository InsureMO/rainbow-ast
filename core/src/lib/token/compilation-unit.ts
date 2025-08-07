import {CompilationUnitTokenId} from '../consts';
import {BlockToken} from './block-token';
import {Token} from './token';

/**
 * compilation unit token, root token.
 */
export class CompilationUnit extends BlockToken {
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

	hasAttr(key: string): boolean {
		return false;
	}

	getAttr<V>(key: string): V | undefined {
		return (void 0);
	}

	setAttr<V>(_1: string, _2: V | null | undefined): void {
		throw new Error('Attribute is not available on compilation unit.');
	}

	removeAttr(_: string): void {
		throw new Error('Attribute is not available on compilation unit.');
	}

	get parent(): BlockToken | undefined {
		return (void 0);
	}

	get ancestors(): ReadonlyArray<BlockToken> {
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
