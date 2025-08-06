import {CommentParsers, MLCommentParser} from '../../comment';
import {IdentifierParser, WsTabNlParsers, WsTabParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {StringParsers} from '../../string-literal';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {MethodParametersParser} from './method-parameters-parser';

export class TsscmfvMethodParser {
	private static readonly StartSelector = new ParserSelector({
		parsers: [
			IdentifierParser.instance, StringParsers,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterNameSelector = new ParserSelector({
		parsers: [
			MethodParametersParser.instance,
			MLCommentParser.instance, WsTabParsers
		]
	});

	continue(context: ParseContext): void {
		let selector = TsscmfvMethodParser.StartSelector;
		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			if (parser === MethodParametersParser.instance) {
				const block = context.block();
				if (block.id === T.TsscmfvDecl) {
					block.rewriteId(T.MethodDecl);
				}
			}
			parser.parse(c, context);
			if (parser === IdentifierParser.instance) {
				selector = TsscmfvMethodParser.AfterNameSelector;
			} else if (parser === MethodParametersParser.instance) {
				break;
			}
			c = context.char();
		}
	}

	static readonly instance = new TsscmfvMethodParser();
}
