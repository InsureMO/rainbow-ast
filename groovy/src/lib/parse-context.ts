import {BlockToken, Char, CompilationUnit} from '@rainbow-ast/core';

export interface ParseContextArgs {
	shebang: boolean;
	jdkVersion: number;
}

export class ParseContext {
	private readonly _shebangEnabled?: boolean;
	private readonly _jdkVersion?: number;

	private readonly _cu: CompilationUnit;
	private readonly _document: string;

	private readonly _blocks: Array<BlockToken>;

	private _charIndex = 0;
	private _line = 1;
	private _column = 1;

	constructor(cu: CompilationUnit, args: ParseContextArgs) {
		this._shebangEnabled = args.shebang;
		this._jdkVersion = args.jdkVersion;

		this._cu = cu;
		this._document = this._cu.text;
		this._blocks = [cu];
	}

	get shebangEnabled(): boolean {
		return this._shebangEnabled;
	}

	get jdkVersion(): number {
		return this._jdkVersion;
	}

	isRecordClassEnabled(): boolean {
		return this._jdkVersion >= 14;
	}

	isSealedClassEnabled(): boolean {
		return this._jdkVersion >= 15;
	}

	isNonSealedClassEnabled(): boolean {
		return this._jdkVersion >= 17;
	}

	get charIndex(): number {
		return this._charIndex;
	}

	set charIndex(value: number) {
		this._charIndex = value;
	}

	get line(): number {
		return this._line;
	}

	set line(value: number) {
		this._line = value;
	}

	get column(): number {
		return this._column;
	}

	set column(value: number) {
		this._column = value;
	}

	char(): Char | undefined {
		return this._document[this._charIndex];
	}

	charAt(index: number): Char | undefined {
		return this._document[index];
	}

	nextChar(): Char | undefined {
		return this._document[this._charIndex + 1];
	}

	/**
	 * get next chars by given count, and also returns the next char after this char sequence.
	 * e.g. "abcdefg": current char index is 0, count is 3, then returns ["bcd", "e"].
	 * Usually use to check keyword.
	 */
	nextChars(count: number): [string, Char | undefined] {
		return [this._document.slice(this._charIndex + 1, this._charIndex + 1 + count), this._document[this._charIndex + 1 + count]];
	}

	text(start: number, end: number): string {
		return this._document.slice(start, end);
	}

	block(): BlockToken {
		return this._blocks[this._blocks.length - 1];
	}

	sink(block: BlockToken): void {
		const current = this.block();
		current.appendChild(block);
		this._blocks.push(block);
	}

	rise(): void {
		this._blocks.pop();
	}

	/**
	 * inline move forward
	 */
	forward(chars: number): void {
		this._charIndex += chars;
		this._column += chars;
	}

	newline(chars: 1 | 2): void {
		this._charIndex += chars;
		this._line += 1;
		this._column = 1;
	}
}