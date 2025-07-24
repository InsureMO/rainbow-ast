import {CommentParsers} from '../comment';
import {UndeterminedCharParser, WsTabNlParsers} from '../common-token';
import {NumberParsers} from '../number-literal';
import {ParseContext} from '../parse-context';
import {ShebangParser} from '../shebang';
import {StringParsers} from '../string-literal';
import {ParserSelector} from '../token-parser';

export class CompilationUnitParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			ShebangParser.instance,
			CommentParsers,
			WsTabNlParsers,
			NumberParsers,
			StringParsers,
			UndeterminedCharParser.instance
		]
	});

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
