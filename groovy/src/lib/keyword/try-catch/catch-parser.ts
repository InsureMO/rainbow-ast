import {BlockToken, Char} from '@rainbow-ast/core';
import {CommentParsers} from '../../comment';
import {SemicolonParserInstance, WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';
import {TryCatchFinallyBodyParser} from './body-parser';
import {CatchExpressionParser} from './catch-expression-parser';

export class CatchParser extends KeywordTokenParser {
	/**
	 * newline is not allowed between catch keyword and expression,
	 */
	private static readonly Selector = new ParserSelector({
		parsers: [
			CatchExpressionParser.instance, TryCatchFinallyBodyParser.instanceCatchBody,
			SemicolonParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterExprSelector = new ParserSelector({
		parsers: [
			TryCatchFinallyBodyParser.instanceCatchBody,
			SemicolonParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});

	protected constructor() {
		super('catch');
	}

	protected getTokenId(): GroovyTokenId {
		return T.CATCH;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const block = context.block();
		if (block.id !== T.TryCatchStat) {
			context.sink(new BlockToken(T.TryCatchStat));
		}
		const decl = new BlockToken(T.CatchStat, keyword);
		context.sink(decl);
		context.forward(5);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return CatchParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === CatchExpressionParser.instance) {
			return CatchParser.AfterExprSelector;
		} else if (parser === TryCatchFinallyBodyParser.instanceCatchBody) {
			return 'break';
		} else if (parser === SemicolonParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.parseAsBlock(ch, context);
		const block = context.block();
		if (block.children[0].id === T.CatchStat) {
			// the try-catch statement is started with catch keyword, close it immediately
			// no matter what follows
			context.rise();
		}
		return;
	}

	static readonly instance = new CatchParser();
}
