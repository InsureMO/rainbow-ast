import {AnnotationDeclParser} from '../../annotation';
import {MLCommentParser} from '../../comment';
import {WsTabParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {MethodParametersParser} from './method-parameters-parser';

/**
 * parse only when current document matches method parameters.
 *
 * annotation is allowed before method parameters.
 */
export class TryMethodParametersParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [AnnotationDeclParser.instance, MethodParametersParser.instance, MLCommentParser.instance, WsTabParsers]
	});

	try(context: ParseContext): void {
		let c = context.char();
		while (c != null) {
			const parser = TryMethodParametersParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			if (parser === MethodParametersParser.instance) {
				context.block().rewriteId(T.MethodDecl);
			}
			parser.parse(c, context);
			if (parser === MethodParametersParser.instance) {
				break;
			}
			c = context.char();
		}
	}

	static readonly instance = new TryMethodParametersParser();
}
