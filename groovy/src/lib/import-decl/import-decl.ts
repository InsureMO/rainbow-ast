import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {
	AsteriskParserInstance,
	DotParserInstance,
	QualifiedNameParser,
	SemicolonParserInstance,
	WsTabParsers
} from '../common-token';
import {StaticKwOnlyParser} from '../keyword';
import {ParseContext} from '../parse-context';
import {KeywordTokenParser, ParserSelector} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class ImportDeclParser extends KeywordTokenParser {
	private static readonly StaticAndQualifiedNameSelector: ParserSelector = new ParserSelector({
		parsers: [
			StaticKwOnlyParser.instance,
			QualifiedNameParser.instance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly QualifiedNameSelector: ParserSelector = new ParserSelector({
		parsers: [
			QualifiedNameParser.instance,
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
	private static readonly QualifiedNameAndAsteriskSelector: ParserSelector = new ParserSelector({
		parsers: [
			QualifiedNameParser.instance,
			AsteriskParserInstance,
			SemicolonParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});

	constructor() {
		super('package');
	}

	protected getTokenId(): GroovyTokenId {
		return T.IMPORT;
	}

	private startBlock(ch: Char, context: ParseContext): void {
		const keyword = this.createToken(ch, context);
		const decl = new BlockToken(T.ImportDecl, keyword);
		context.sink(decl);
		context.forward(7);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let selector = ImportDeclParser.StaticAndQualifiedNameSelector;

		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser === SemicolonParserInstance) {
				break;
			} else if (parser === StaticKwOnlyParser.instance) {
				selector = ImportDeclParser.QualifiedNameSelector;
			} else if (parser === QualifiedNameParser.instance) {
				selector = ImportDeclParser.DotSelector;
			} else if (parser === DotParserInstance) {
				selector = ImportDeclParser.QualifiedNameAndAsteriskSelector;
			} else if (parser === AsteriskParserInstance) {
				
			}
			c = context.char();
		}

		context.rise();

		return true;
	}

	static readonly instance = new ImportDeclParser();
}
