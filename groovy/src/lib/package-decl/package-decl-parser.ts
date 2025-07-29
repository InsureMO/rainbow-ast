import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {DotParserInstance, QualifiedNameParser, SemicolonParserInstance, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {KeywordTokenParser, ParserSelector} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class PackageDeclParser extends KeywordTokenParser {
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

	constructor() {
		super('package');
	}

	protected getTokenId(): GroovyTokenId {
		return T.PACKAGE;
	}

	private startBlock(ch: Char, context: ParseContext): void {
		const keyword = this.createToken(ch, context);
		const decl = new BlockToken(T.PackageDecl, keyword);
		context.sink(decl);
		context.forward(7);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let selector = PackageDeclParser.QualifiedNameSelector;

		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser === SemicolonParserInstance) {
				break;
			} else if (parser === QualifiedNameParser.instance) {
				selector = PackageDeclParser.DotSelector;
			} else if (parser === DotParserInstance) {
				selector = PackageDeclParser.QualifiedNameSelector;
			}
			c = context.char();
		}

		context.rise();

		return true;
	}

	static readonly instance = new PackageDeclParser();
}
