import {AbstractAstParser, Ast, CompilationUnit} from '@rainbow-ast/core';
import {GroovyLangParseArgs, GroovyLangParser} from './lang-parser';

export type GroovyParserArgs = Partial<Omit<GroovyLangParseArgs, 'compilationUnit'>> & {
	verbose?: boolean;
};

export class GroovyParser extends AbstractAstParser {
	private doParse(document: string = '', args?: GroovyParserArgs): Ast {
		const cu = new CompilationUnit(document);
		GroovyLangParser.parse({
			shebang: args?.shebang ?? false,
			jdkVersion: args?.jdkVersion ?? 17,
			compilationUnit: cu
		});
		return new Ast(cu);
	}

	parse(document: string = '', args?: GroovyParserArgs): Ast {
		if (args?.verbose === true) {
			const label = `Parse document[length=${document.length}], groovy language.`;
			console.time(label);
			try {
				return this.doParse(document, args);
			} finally {
				console.timeEnd(label);
			}
		} else {
			return this.doParse(document, args);
		}
	}
}

export const DGP = new GroovyParser();
