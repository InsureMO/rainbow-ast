import {BlockToken, Char} from '@rainbow-ast/core';
import {CommentParsers} from '../../comment';
import {SemicolonParserInstance, WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';
import {TryCatchFinallyBodyParser} from './body-parser';
import {CatchParser} from './catch-parser';
import {FinallyParser} from './finally-parser';
import {TryExpressionParser} from './try-expression-parser';

export class TryParser extends KeywordTokenParser {
	/**
	 * newline is not allowed between try keyword and expression,
	 */
	private static readonly Selector = new ParserSelector({
		parsers: [
			TryExpressionParser.instance, TryCatchFinallyBodyParser.instanceTryBody,
			CatchParser.instance, FinallyParser.instance,
			SemicolonParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterTryExprSelector = new ParserSelector({
		parsers: [
			TryCatchFinallyBodyParser.instanceTryBody,
			CatchParser.instance, FinallyParser.instance,
			SemicolonParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterTryBodySelector = new ParserSelector({
		parsers: [
			CatchParser.instance, FinallyParser.instance,
			SemicolonParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});

	protected constructor() {
		super('try');
	}

	protected getTokenId(): GroovyTokenId {
		return T.TRY;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		context.sink(new BlockToken(T.TryCatchStat));
		const decl = new BlockToken(T.TryStat, keyword);
		context.sink(decl);
		context.forward(3);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TryParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === TryExpressionParser.instance) {
			return TryParser.AfterTryExprSelector;
		} else if (parser === TryCatchFinallyBodyParser.instanceTryBody) {
			return TryParser.AfterTryBodySelector;
		} else if (parser === SemicolonParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.parseAsBlock(ch, context);
		/** rise {@link T.TryCatchStat} */
		context.rise();
		return true;
	}

	static readonly instance = new TryParser();
}
