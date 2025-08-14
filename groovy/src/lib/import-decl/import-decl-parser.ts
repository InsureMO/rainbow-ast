import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {
	AsteriskParserInstance,
	DotParserInstance,
	PackageNameParser,
	SemicolonParserInstance,
	WsTabParsers
} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';
import {AsAliasDeclParser} from './as-alias-decl-parser';
import {StaticImportParser} from './static-import-parser';

/**
 * multiple static keywords is allowed, it is incorrect.
 */
export class ImportDeclParser extends KeywordTokenParser {
	private static readonly StaticAndNameSelector = new ParserSelector({
		parsers: [
			StaticImportParser.instance,
			PackageNameParser.instance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly DotSelector = new ParserSelector({
		parsers: [
			AsAliasDeclParser.instance,
			DotParserInstance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly NameAndAsteriskSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			AsteriskParserInstance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly AsSelector = new ParserSelector({
		parsers: [
			AsAliasDeclParser.instance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly EndSelector = new ParserSelector({
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

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const decl = new BlockToken(T.ImportDecl, keyword);
		context.sink(decl);
		context.forward(6);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return ImportDeclParser.StaticAndNameSelector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === PackageNameParser.instance) {
			return ImportDeclParser.DotSelector;
		} else if (parser === DotParserInstance) {
			return ImportDeclParser.NameAndAsteriskSelector;
		} else if (parser === AsteriskParserInstance) {
			return ImportDeclParser.AsSelector;
		} else if (parser === AsAliasDeclParser.instance) {
			return ImportDeclParser.EndSelector;
		} else if (parser === SemicolonParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new ImportDeclParser();
}
