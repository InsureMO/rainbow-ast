import {combineConfig, EditorState, Facet} from '@codemirror/state';
import {SyntaxNodeRef} from '@lezer/common';
import {Ast, BlockToken, CompilationUnit, Token} from '@rainbow-ast/core';

export interface ClassDocsHook {
	toggle(): void;
}

export interface GroovyFacetHooks {
	classDoc?: ClassDocsHook;
}

export interface GroovyFacetInputData {
	document: GroovyFacetDocument;
	hooks?: GroovyFacetHooks;
}

export interface GroovyFacetData {
	document: GroovyFacetDocument;
	hooks?: GroovyFacetHooks;
}

/**
 * This is how the ts-related extensions are
 * configured: this facet sets the path of the file
 * and the environment to use, and the rest of
 * the extensions, like tsLint and tsAutocomplete,
 * pull those settings automatically from editor state.
 */
export const GroovyFacet = Facet.define<GroovyFacetInputData, GroovyFacetData>({
	combine(configs: readonly GroovyFacetInputData[]): GroovyFacetData {
		return combineConfig(configs, {});
	}
});

export class GroovyFacetDocument {
	private static EMPTY_AST = new Ast(new CompilationUnit(''));
	private _ast: Ast;
	private _atomicTokens: Array<Token> = [];

	ast(): Ast {
		return this._ast ?? GroovyFacetDocument.EMPTY_AST;
	}

	install(ast: Ast): void {
		this._ast = ast;
		const atomicTokens: Array<Token> = [];
		const tokens: Array<Token> = [...(ast.tokens ?? [])];
		while (tokens.length > 0) {
			const currentToken = tokens.shift();
			if (currentToken instanceof BlockToken) {
				tokens.unshift(...(currentToken.children ?? []));
			} else {
				atomicTokens.push(currentToken);
			}
		}
		this._atomicTokens = atomicTokens;
	}

	findToken(ref: SyntaxNodeRef, state: EditorState): Token {
		const {from} = ref;
		let left = 0;
		let right = this._atomicTokens.length - 1;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			const midToken = this._atomicTokens[mid];

			if (midToken.start === from) {
				return midToken;
			} else if (midToken.start < from) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}
		throw new Error(`No token found for syntax node[name=${ref.name}, text=${state.sliceDoc(ref.from, ref.to)}, from=${ref.from}, to=${ref.to}].`);
	}

}
