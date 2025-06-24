import {ContainerToken} from './container-token';
import {IContainerToken, IToken} from './token';
import {CompilationUnitTokenId} from './token-id';

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

	get parent(): IContainerToken | undefined {
		return (void 0);
	}

	get ancestors(): ReadonlyArray<IContainerToken> {
		return [];
	}

	get root(): IToken {
		return this;
	}

	get previousSiblings(): ReadonlyArray<IToken> {
		return [];
	}

	get previousSibling(): IToken | undefined {
		return (void 0);
	}

	get nextSiblings(): ReadonlyArray<IToken> {
		return [];
	}

	get nextSibling(): IToken | undefined {
		return (void 0);
	}
}
