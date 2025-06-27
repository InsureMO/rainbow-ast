import {TokenCaptors, TokenCaptureStatus} from './captor';
import {AstBuildContext} from './context';
import {BlockToken, CompilationUnit, Token} from './token';
import {Language, LanguageAstBuildStates, LanguageTokenIds} from './types';

export type AstBuilderConstructOptions<
	T extends LanguageTokenIds = LanguageTokenIds,
	S extends LanguageAstBuildStates = LanguageAstBuildStates,
	L extends Language<T, S> = Language<T, S>
> = {
	verbose?: boolean;
	language: L;
}

/**
 * concurrent safety
 */
export class AstBuilder<
	T extends LanguageTokenIds = LanguageTokenIds,
	S extends LanguageAstBuildStates = LanguageAstBuildStates,
	L extends Language<T, S> = Language<T, S>,
	Opts extends AstBuilderConstructOptions<T, S, L> = AstBuilderConstructOptions<T, S, L>> {
	protected readonly _options: Required<Opts>;

	constructor(options: Opts) {
		this._options = this.initOptions(options);
	}

	/**
	 * assign default values, but only for optional properties of default options.
	 * extends builder and overwrite this method for customized options default values.
	 */
	protected initOptions(options: Opts): Required<Opts> {
		options.verbose = options.verbose ?? false;
		// @ts-expect-error
		return options;
	}

	get options(): Required<Opts> {
		return this._options;
	}

	get verboseEnabled(): boolean {
		return this.options.verbose;
	}

	get language(): L {
		return this._options.language;
	}

	ast(document?: string): CompilationUnit {
		const cu = new CompilationUnit(document ?? '');
		this.parse(cu);
		return cu;
	}

	protected findTokenCaptorsOfState(context: AstBuildContext<T, S, L>): TokenCaptors {
		const captors = this.language.captors[context.currentState];
		if (captors == null) {
			throw new Error(`Could not find captors for state[key=${context.currentState}, name=${this.language.states[context.currentState]}].`);
		}
		return captors;
	}

	protected doParse(cu: CompilationUnit): void {
		const context = new AstBuildContext<T, S, L>(cu, this.language);

		while (!context.eof) {
			const captors = this.findTokenCaptorsOfState(context);
			const [status] = captors.capture(context);
			if (status === TokenCaptureStatus.None) {
				// cannot capture token in current state,
				// back to parent
				context.endCurrentBlock();
				context.endCurrentState();
			}
			// otherwise continue loop
		}
	}

	protected parse(compilationUnit: CompilationUnit): void {
		if (this.verboseEnabled) {
			let label = `Parse AST[chars=${(compilationUnit.text ?? '').length}]`;
			try {
				console.time(label);
				this.doParse(compilationUnit);
			} finally {
				console.timeEnd(label);
			}
		} else {
			this.doParse(compilationUnit);
		}
	}

	protected doStringify(token: Token, indent: string, lines: Array<string>): void {
		lines.push(indent + token.stringify(this.language.tokenIds));
		if (token instanceof BlockToken) {
			token.children.map(child => this.doStringify(child, indent + '\t', lines));
		}
	}

	stringify(token: Token): string {
		const lines: Array<string> = [];
		this.doStringify(token, '', lines);
		return lines.join('\n') + '\n';
	}
}
