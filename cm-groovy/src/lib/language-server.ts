import {Ast} from '@rainbow-ast/core';
import {DGP, GroovyParserArgs} from '@rainbow-ast/groovy';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GroovyLanguageServerArgs extends GroovyParserArgs {
}

export class GroovyLanguageServer {
	private readonly _options: GroovyLanguageServerArgs;

	constructor(options?: GroovyLanguageServerArgs) {
		this._options = options;
	}

	parse(source: string): Ast {
		return DGP.parse(source, this._options);
	}
}
