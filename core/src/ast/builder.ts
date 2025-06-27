import {CompilationUnit, ContainerToken, Token, TokenIds} from '../token';

export interface AstBuildOptions {
	verbose?: boolean;
}

export abstract class AbstractAstBuilder<Opt extends AstBuildOptions> {
	protected readonly _options: Required<Opt>;

	protected constructor(options?: Opt) {
		this._options = this.initOptions(options);
	}

	abstract get tokenIds(): TokenIds;

	protected abstract initOptions(options?: Opt): Required<Opt>;

	get options(): Required<Opt> {
		return this._options;
	}

	get verboseEnabled(): boolean {
		return this.options.verbose;
	}

	ast(document?: string): CompilationUnit {
		const cu = new CompilationUnit(document ?? '');
		this.parse(cu);
		return cu;
	}

	protected abstract parse(compilationUnit: CompilationUnit): void;

	protected doStringify(token: Token, indent: string, lines: Array<string>): void {
		lines.push(indent + token.stringify(this.tokenIds));
		if (token instanceof ContainerToken) {
			token.children.map(child => this.doStringify(child, indent + '\t', lines));
		}
	}

	stringify(token: Token): string {
		const lines: Array<string> = [];
		this.doStringify(token, '', lines);
		return lines.join('\n') + '\n';
	}
}
