import {CompilationUnit, ContainerToken} from '@rainbow-ast/core';
import {AstBuildState} from './state';

export class AstBuildContext {
	private readonly _compilationUnit: CompilationUnit;
	private readonly _document: string;
	private readonly _documentLength: number;
	/**
	 * the index of the char waiting to be recognized.
	 */
	private _charIndex: number = 0;
	private _line: number = 1;
	private _column: number = 1;
	/**
	 * the states start from the closest one.
	 * that is to say, the one with index 0 is the current state, the one with index 1 is a higher-level state, and so on.
	 */
	private _states: Array<AstBuildState> = [];
	/**
	 * the containers start from the closest one.
	 * that is to say, the one with index 0 is the current container, the one with index 1 is a higher-level container, and so on.
	 */
	private _containers: Array<ContainerToken> = [];

	constructor(compilationUnit: CompilationUnit, initState: AstBuildState) {
		// readonly context
		this._compilationUnit = compilationUnit;
		this._document = this._compilationUnit.text;
		this._documentLength = this._document.length;

		// initialize
		this._states.unshift(initState);
		this._containers.unshift(this._compilationUnit);
	}

	get compilationUnit(): CompilationUnit {
		return this._compilationUnit;
	}

	get document(): string {
		return this._document;
	}

	get documentLength(): number {
		return this._documentLength;
	}

	get charIndex(): number {
		return this._charIndex;
	}

	moveCharIndexTo(charIndex: number): this {
		this._charIndex = charIndex;
		return this;
	}

	get line(): number {
		return this._line;
	}

	moveLineTo(line: number): this {
		this._line = line;
		return this;
	}

	get column(): number {
		return this._column;
	}

	moveColumnTo(column: number): this {
		this._column = column;
		return this;
	}

	get eof(): boolean {
		return this._charIndex >= this._documentLength;
	}

	consumeChars(count: number) {
		this._charIndex += count;
	}

	get state(): AstBuildState {
		return this._states[0];
	}

	appendState(state: AstBuildState): this {
		this._states.push(state);
		return this;
	}

	closeState(): this {
		this._states.shift();
		return this;
	}

	replaceState(state: AstBuildState): this {
		this._states[0] = state;
		return this;
	}

	get containers(): Array<ContainerToken> {
		return this._containers;
	}

	get currentContainer(): ContainerToken {
		return this._containers[0];
	}

	closeContainer(): this {
		this._containers.shift();
		return this;
	}

	appendContainer(container: ContainerToken): this {
		this._containers.unshift(container);
		return this;
	}

	get isTopLevel(): boolean {
		return this.containers.length === 1;
	}
}
