import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {IdentifierParser, SemicolonParserInstance, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class BreakParser extends KeywordTokenParser {
	private static Selector = new ParserSelector({
		parsers: [SemicolonParserInstance, IdentifierParser.instance, MLCommentParser.instance, WsTabParsers]
	});

	protected constructor() {
		super('break');
	}

	protected getTokenId(): GroovyTokenId {
		return T.BREAK;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const decl = new BlockToken(T.BreakStat, keyword);
		context.sink(decl);
		context.forward(5);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return BreakParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === SemicolonParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new BreakParser();
}
