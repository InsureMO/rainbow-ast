import {CommentParsers} from '../../comment';
import {CommaParserInstance, WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';

export class TsscmfvFieldOrVariableParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [
			CommaParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});

	try(context: ParseContext): void {
		const c = context.char();
		if (c != null) {
			const parser = TsscmfvFieldOrVariableParser.Selector.find(c, context);
			if (parser != null) {
				context.block().rewriteId(T.MethodDecl);
				parser.parse(c, context);
			}
		}
	}

	static readonly instance = new TsscmfvFieldOrVariableParser();
}
