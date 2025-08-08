import {AnnotationDeclParser} from '../../annotation';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {SynchronizedExpressionParser} from './synchronized-expression-parser';

/**
 * parse only when current document matches synchronized expression
 *
 * annotation is allowed before or after synchronized expression.
 */
export class TrySynchronizedExpressionParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [AnnotationDeclParser.instance, SynchronizedExpressionParser.instance]
	});

	try(context: ParseContext): void {
		const c = context.char();
		if (c != null) {
			const parser = TrySynchronizedExpressionParser.Selector.find(c, context);
			if (parser != null) {
				if (parser === SynchronizedExpressionParser.instance) {
					context.block().rewriteId(T.SyncBlockDecl);
				}
				parser.parse(c, context);
			}
		}
	}

	static readonly instance = new TrySynchronizedExpressionParser();
}
