import {AtomicToken, BlockToken, CompilationUnit} from './token';
import {
	AstBuildState,
	Language,
	LanguageAstBuildStates,
	LanguageTokenIds,
	TokenCapturePrioritiesOfState
} from './types';

export class AstBuildContext<
	T extends LanguageTokenIds = LanguageTokenIds,
	S extends LanguageAstBuildStates = LanguageAstBuildStates,
	L extends Language<T, S> = Language<T, S>
> {
	private readonly _language: L;
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
	 * the blocks start from the closest one.
	 * that is to say, the one with index 0 is the current block, the one with index 1 is a higher-level block, and so on.
	 * the last one is compilation unit.
	 */
	private _blocks: Array<BlockToken> = [];

	constructor(compilationUnit: CompilationUnit, language: L) {
		this._language = language;

		// readonly context
		this._compilationUnit = compilationUnit;
		this._document = this._compilationUnit.text;
		this._documentLength = this._document.length;

		// initialize
		this._states.unshift(language.initState);
		this._blocks.unshift(this._compilationUnit);
	}

	get language(): L {
		return this._language;
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

	get currentState(): AstBuildState {
		return this._states[0];
	}

	replaceState(state: AstBuildState): this {
		this._states[0] = state;
		return this;
	}

	get tokenCapturePrioritiesOfCurrentState(): TokenCapturePrioritiesOfState | undefined {
		const priorities = this._language.tokenCapturePriorities;
		return priorities[this.currentState] ?? priorities.$Default;
	}

	get currentBlock(): BlockToken {
		return this._blocks[0];
	}

	isCompilationUnitBlock(): boolean {
		return this._states.length === 1;
	}

	appendBlock(token: BlockToken, state: AstBuildState): this {
		this._blocks[0].appendChild(token);
		this._blocks.unshift(token);
		this._states.unshift(state);
		return this;
	}

	endCurrentBlock(): this {
		this._states.shift();
		const block = this._blocks.shift();
		this.postBlockEnd(block);
		return this;
	}

	appendAtomic(token: AtomicToken): this {
		this._blocks[0].appendChild(token);
		return this;
	}

	postBlockEnd(block: BlockToken): void {
		const pointcut = this._language.pointcuts[block.id];
		if (pointcut != null) {
			pointcut.onBlockEnded(block, this);
		}
	}
}
