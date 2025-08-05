import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {SynchronizedExpressionParser} from './synchronized-expression-parser';

/**
 * parse only when current document matches synchronized expression
 */
export class TrySynchronizedExpressionParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [SynchronizedExpressionParser.instance]
	});

	try(context: ParseContext): void {
		const c = context.char();
		if (c != null) {
			const parser = TrySynchronizedExpressionParser.Selector.find(c, context);
			if (parser != null) {
				context.block().rewriteId(T.SyncBlockDecl);
				parser.parse(c, context);
			}
		}
	}

	static readonly instance = new TrySynchronizedExpressionParser();
}
