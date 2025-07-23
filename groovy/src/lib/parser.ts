import {AbstractAstParser, Ast, CompilationUnit} from '@rainbow-ast/core';
import {GroovyLangParseArgs, GroovyLangParser} from './lang-parser';

export type GroovyParserArgs = Partial<Omit<GroovyLangParseArgs, 'compilationUnit'>>;

export class GroovyParser extends AbstractAstParser {
	parse(document: string = '', args?: GroovyParserArgs): Ast {
		const cu = new CompilationUnit(document);
		GroovyLangParser.parse({
			shebang: args?.shebang ?? false,
			jdkVersion: args.jdkVersion ?? 17,
			compilationUnit: cu
		});
		return new Ast(cu);
	}
}

export const DGP = new GroovyParser();
