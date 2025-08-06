import {CommentParsers} from '../../comment';
import {AssignParserInstance, CommaParserInstance, VariableNameParser, WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector, ParserSelectorArgs} from '../../token-parser';
import {T} from '../../tokens';

/**
 * find assign (=), comma (,).
 * - no newline before comma,
 */
export class TsscmfvFieldOrVariableParser {
	private static readonly StartSelector = new ParserSelector({
		parsers: [
			AssignParserInstance,
			CommaParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterCommaSelector = new ParserSelector({
		parsers: [
			VariableNameParser.instance,
			CommaParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static ValueSelector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (TsscmfvFieldOrVariableParser.ValueSelector != null) {
			throw new Error('TsscmfvFieldOrVariableParser.Selector is initialized.');
		}
		TsscmfvFieldOrVariableParser.ValueSelector = new ParserSelector({parsers});
	}

	try(context: ParseContext): void {
		let selector = TsscmfvFieldOrVariableParser.StartSelector;

		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			if (parser === AssignParserInstance || parser == CommaParserInstance) {
				const block = context.block();
				if (block.id === T.TsscmfvDecl) {
					const parentOfBlock = block.parent;
					if (parentOfBlock.id === T.TypeBody) {
						// field
						block.rewriteId(T.FieldDecl);
					} else {
						block.rewriteId(T.VarDecl);
					}
				}
			}
			parser.parse(c, context);
			if (parser === CommaParserInstance) {
				selector = TsscmfvFieldOrVariableParser.AfterCommaSelector;
			} else if (parser === AssignParserInstance) {
				selector = TsscmfvFieldOrVariableParser.ValueSelector;
			} else if (parser === VariableNameParser.instance) {
				selector = TsscmfvFieldOrVariableParser.StartSelector;
			}
			c = context.char();
		}
	}

	static readonly instance = new TsscmfvFieldOrVariableParser();
}
