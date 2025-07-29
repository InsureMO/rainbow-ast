import {ParseContext} from '../parse-context';
import {ShebangParser} from '../shebang';
import {ParserSelector, ParserSelectorArgs} from '../token-parser';

export class CompilationUnitParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (CompilationUnitParser.Selector != null) {
			throw new Error('CompilationUnitParser.Selector is initialized.');
		}
		CompilationUnitParser.Selector = new ParserSelector({
			parsers: [
				ShebangParser.instance,
				...parsers
			]
		});
	}

	parse(context: ParseContext): boolean {
		let c = context.char();

		while (c != null) {
			const parser = CompilationUnitParser.Selector.find(c, context);
			if (parser == null) {
				throw new Error(`No token parser found for char[${c}] at [offset=${context.charIndex}, line=${context.line}, column=${context.column}].`);
			}
			parser.parse(c, context);
			c = context.char();
		}

		return true;
	}

	static readonly instance = new CompilationUnitParser();
}
