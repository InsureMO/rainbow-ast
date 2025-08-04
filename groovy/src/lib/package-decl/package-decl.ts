import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {DotParserInstance, PackageNameParser, SemicolonParserInstance, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class PackageDeclParser extends KeywordTokenParser {
	private static readonly NameSelector: ParserSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly DotSelector: ParserSelector = new ParserSelector({
		parsers: [
			DotParserInstance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});

	constructor() {
		super('package');
	}

	protected getTokenId(): GroovyTokenId {
		return T.PACKAGE;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const decl = new BlockToken(T.PackageDecl, keyword);
		context.sink(decl);
		context.forward(7);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return PackageDeclParser.NameSelector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === SemicolonParserInstance) {
			return 'break';
		} else if (parser === PackageNameParser.instance) {
			return PackageDeclParser.DotSelector;
		} else if (parser === DotParserInstance) {
			return PackageDeclParser.NameSelector;
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new PackageDeclParser();
}
