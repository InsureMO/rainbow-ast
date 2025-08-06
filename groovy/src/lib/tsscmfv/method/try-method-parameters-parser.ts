import {MLCommentParser} from '../../comment';
import {WsTabParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {MethodParametersParser} from './method-parameters-parser';

/**
 * parse only when current document matches method parameters
 */
export class TryMethodParametersParserParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [MethodParametersParser.instance, MLCommentParser.instance, WsTabParsers]
	});

	try(context: ParseContext): void {
		const c = context.char();
		if (c != null) {
			const parser = TryMethodParametersParserParser.Selector.find(c, context);
			if (parser != null) {
				context.block().rewriteId(T.MethodDecl);
				parser.parse(c, context);
			}
		}
	}

	static readonly instance = new TryMethodParametersParserParser();
}
