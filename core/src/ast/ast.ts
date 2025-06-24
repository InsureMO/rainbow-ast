import {CompilationUnit, ContainerToken, IToken, TokenIds} from '../token';

export interface AstBuilder {
	get ids(): TokenIds;

	build(cu: CompilationUnit): void;
}

export abstract class AbstractAst {
	protected readonly _compilationUnit: CompilationUnit;
	protected readonly _builder: AstBuilder;

	protected constructor(document?: string) {
		document = document ?? '';
		this._compilationUnit = this.createCompilationUnit(document);
		this._builder = this.createBuilder();
		this._builder.build(this._compilationUnit);
	}

	protected createCompilationUnit(document: string): CompilationUnit {
		return new CompilationUnit(document);
	};

	protected abstract createBuilder(): AstBuilder;

	get compilationUnit(): CompilationUnit {
		return this._compilationUnit;
	}

	get document(): string {
		return this._compilationUnit.text;
	}

	get documentLength(): number {
		return this._compilationUnit.text.length;
	}

	get tokens(): ReadonlyArray<IToken> {
		return this._compilationUnit.children;
	}

	toString() {
		const lines: Array<string> = [];
		const stringify = (token: IToken, indent: string): void => {
			lines.push(indent + token.stringify(this._builder.ids));
			if (token instanceof ContainerToken) {
				token.children.map(child => stringify(child, indent + '\t'));
			}
		};

		const indent = '\t';
		lines.push(this.compilationUnit.stringify(this._builder.ids));
		this.compilationUnit.children.map(child => stringify(child, indent));
		return lines.join('\n') + '\n';
	}
}
