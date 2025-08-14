import {BlockToken, Char} from '@rainbow-ast/core';
import {CommentParsers} from '../../comment';
import {SemicolonParserInstance, WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';
import {SwitchBodyParser} from './switch-body-parser';
import {SwitchExpressionParser} from './switch-expression-parser';

export class SwitchParser extends KeywordTokenParser {
	/**
	 * newline is not allowed between switch keyword and expression,
	 */
	private static readonly Selector = new ParserSelector({
		parsers: [
			SwitchExpressionParser.instance, SwitchBodyParser.instance,
			SemicolonParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterExprSelector = new ParserSelector({
		parsers: [
			SwitchBodyParser.instance,
			SemicolonParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});

	protected constructor() {
		super('switch');
	}

	protected getTokenId(): GroovyTokenId {
		return T.SWITCH;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const decl = new BlockToken(T.SwitchStat, keyword);
		context.sink(decl);
		context.forward(6);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return SwitchParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === SwitchExpressionParser.instance) {
			return SwitchParser.AfterExprSelector;
		} else if (parser === SwitchBodyParser.instance) {
			return 'break';
		} else if (parser === SemicolonParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new SwitchParser();
}
