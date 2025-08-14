import {BlockToken, Char} from '@rainbow-ast/core';
import {CommentParsers, MLCommentParser} from '../comment';
import {DotParserInstance, PackageNameParser, WsTabNlParsers, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export abstract class AsParser extends KeywordTokenParser {
	protected constructor() {
		super('as');
	}

	protected getTokenId(): GroovyTokenId {
		return T.AS;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const decl = new BlockToken(T.AsDecl, keyword);
		context.sink(decl);
		context.forward(2);
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}
}

export class AsTypeDeclParser extends AsParser {
	private static readonly Selector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterNameSelector = new ParserSelector({
		parsers: [
			DotParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly AfterDotSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			MLCommentParser.instance, WsTabParsers
		]
	});

	protected getInitBlockParserSelector(): ParserSelector {
		return AsTypeDeclParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === PackageNameParser.instance) {
			return AsTypeDeclParser.AfterNameSelector;
		} else if (parser === DotParserInstance) {
			return AsTypeDeclParser.AfterDotSelector;
		} else {
			return (void 0);
		}
	}

	static readonly instance = new AsTypeDeclParser();
}
