import {ParseContext} from './parse-context';
import {ByFuncTokenParser, ParserSelector, TabsParser, WhitespacesParser} from './token-parser';
import {T} from './tokens';

export class CompilationUnitParser {
	private static ByFunc: Array<ByFuncTokenParser> = [
		WhitespacesParser.instance,
		TabsParser.instance
	];
	private static readonly WithShebang: ParserSelector = new ParserSelector({
		byFunc: CompilationUnitParser.ByFunc
	});
	private static readonly NoShebang: ParserSelector = new ParserSelector({
		byFunc: CompilationUnitParser.ByFunc
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
		let ch = context.char();

		while (ch != null) {
			const selector = this.isShebangAllowed(context) ? CompilationUnitParser.WithShebang : CompilationUnitParser.NoShebang;
			selector.find(ch, context).parse(ch, context);
			ch = context.char();
		}

		return true;
	}

	static readonly instance = new CompilationUnitParser();
}
