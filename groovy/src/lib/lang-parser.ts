import {CompilationUnit} from '@rainbow-ast/core';
import {ParseContext} from './parse-context';
import {CompilationUnitParser} from './compilation-unit-parser';

export interface GroovyLangParseArgs {
	shebang: boolean;
	jdkVersion: number;
	compilationUnit: CompilationUnit;
}

export class GroovyLangParser {
	private readonly _cu: CompilationUnit;

	private readonly _context: ParseContext;

	private constructor(args: GroovyLangParseArgs) {
		// to avoid extend
		this._cu = args.compilationUnit;
		this._context = new ParseContext(this._cu, args);
	}

	static parse(args: GroovyLangParseArgs) {
		const parser = new GroovyLangParser(args);
		parser.parse();
	}

	parse(): void {
		if (this._cu.text.length === 0) {
			return;
		}

		CompilationUnitParser.instance.parse(this._context);
	}
}
