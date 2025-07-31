import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {
	AsteriskParserInstance,
	DotParserInstance,
	PackageNameParser,
	SemicolonParserInstance,
	WsTabParsers
} from '../common-token';
import {AliasAsParser, StaticParser} from '../keyword';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class ImportDeclParser extends KeywordTokenParser {
	private static readonly StaticAndNameSelector: ParserSelector = new ParserSelector({
		parsers: [
			StaticParser.instance,
			PackageNameParser.instance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly NameSelector: ParserSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly DotSelector: ParserSelector = new ParserSelector({
		parsers: [
			AliasAsParser.instance,
			DotParserInstance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly NameAndAsteriskSelector: ParserSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			AsteriskParserInstance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly AsSelector: ParserSelector = new ParserSelector({
		parsers: [
			AliasAsParser.instance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly EndSelector: ParserSelector = new ParserSelector({
		parsers: [
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});

	constructor() {
		super('import');
	}

	protected getTokenId(): GroovyTokenId {
		return T.IMPORT;
	}

	protected startBlock(ch: Char, context: ParseContext): void {
		const keyword = this.createToken(ch, context);
		const decl = new BlockToken(T.ImportDecl, keyword);
		context.sink(decl);
		context.forward(6);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return ImportDeclParser.StaticAndNameSelector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === SemicolonParserInstance) {
			return 'break';
		} else if (parser === StaticParser.instance) {
			return ImportDeclParser.NameSelector;
		} else if (parser === PackageNameParser.instance) {
			return ImportDeclParser.DotSelector;
		} else if (parser === DotParserInstance) {
			return ImportDeclParser.NameAndAsteriskSelector;
		} else if (parser === AsteriskParserInstance) {
			return ImportDeclParser.AsSelector;
		} else if (parser === AliasAsParser.instance) {
			return ImportDeclParser.EndSelector;
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new ImportDeclParser();
}
