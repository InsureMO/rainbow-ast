import {CommentParsers} from '../comment';
import {UndeterminedCharParser, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ShebangParser} from '../shebang';
import {ParserSelector} from '../token-parser';
import {T} from '../tokens';

export class CompilationUnitParser {
	private static readonly Parsers = [
		CommentParsers,
		WsTabNlParsers,
		UndeterminedCharParser.instance
	];
	private static readonly WithShebang: ParserSelector = new ParserSelector({
		parsers: [
			ShebangParser.instance,
			...CompilationUnitParser.Parsers
		]
	});
	private static readonly NoShebang: ParserSelector = new ParserSelector({
		parsers: CompilationUnitParser.Parsers
	});

	/**
	 * returns false when any of following matched
	 * 1. line > 1
	 * 2. any token but whitespaces or tabs determined
	 */
	private isShebangAllowed(context: ParseContext): boolean {
		if (context.line !== 1) {
			return false;
		}
		if (context.column === 1) {
			return context.shebangEnabled;
		}
		const children = context.block().children;
		return !children.some(c => c.id !== T.Whitespaces && c.id !== T.Tabs);
	}

	parse(context: ParseContext): boolean {
		let c = context.char();

		while (c != null) {
			const selector = this.isShebangAllowed(context) ? CompilationUnitParser.WithShebang : CompilationUnitParser.NoShebang;
			const parser = selector.find(c, context);
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
