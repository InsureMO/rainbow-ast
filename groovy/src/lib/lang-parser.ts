import {CompilationUnit} from '@rainbow-ast/core';

export interface GroovyLangParseArgs {
	shebang: boolean;
	jdkVersion: number;
	compilationUnit: CompilationUnit;
}

export class GroovyLangParser {
	private readonly _shebangEnabled?: boolean;
	private readonly _jdkVersion?: number;
	private readonly _cu: CompilationUnit;
	private readonly _document: string;

	private _charIndex = 0;

	private constructor(args: GroovyLangParseArgs) {
		// to avoid extend
		this._shebangEnabled = args.shebang;
		this._jdkVersion = args.jdkVersion;
		this._cu = args.compilationUnit;
		this._document = this._cu.text;
	}

	static parse(args: GroovyLangParseArgs) {
		const parser = new GroovyLangParser(args);
		parser.parse();
	}

	parse(): void {
		if (this._document.length === 0) {
			return;
		}
	}
}
