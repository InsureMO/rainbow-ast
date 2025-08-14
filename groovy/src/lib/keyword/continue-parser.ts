import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {IdentifierParser, SemicolonParserInstance, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class ContinueParser extends KeywordTokenParser {
	private static Selector = new ParserSelector({
		parsers: [SemicolonParserInstance, IdentifierParser.instance, MLCommentParser.instance, WsTabParsers]
	});

	protected constructor() {
		super('continue');
	}

	protected getTokenId(): GroovyTokenId {
		return T.CONTINUE;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const decl = new BlockToken(T.ContinueState, keyword);
		context.sink(decl);
		context.forward(8);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return ContinueParser.Selector;
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

	static readonly instance = new ContinueParser();
}
