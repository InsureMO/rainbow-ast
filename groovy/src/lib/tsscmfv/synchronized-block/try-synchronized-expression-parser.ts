import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers} from '../../comment';
import {WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {SynchronizedExpressionParser} from './synchronized-expression-parser';

/**
 * parse only when current document matches synchronized expression
 *
 * annotation is allowed before synchronized expression.
 */
export class TrySynchronizedExpressionParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance, SynchronizedExpressionParser.instance,
			CommentParsers, WsTabNlParsers
		]
	});

	try(context: ParseContext): void {
		let c = context.char();
		while (c != null) {
			const parser = TrySynchronizedExpressionParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			if (parser === SynchronizedExpressionParser.instance) {
				context.block().rewriteId(T.SyncBlockDecl);
			}
			parser.parse(c, context);
			if (parser == SynchronizedExpressionParser.instance) {
				break;
			}
			c = context.char();
		}
	}

	static readonly instance = new TrySynchronizedExpressionParser();
}
