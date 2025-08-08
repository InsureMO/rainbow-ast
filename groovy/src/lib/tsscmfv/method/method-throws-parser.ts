import {AtomicToken, BlockToken} from '@rainbow-ast/core';
import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers, MLCommentParser} from '../../comment';
import {
	CommaParserInstance,
	DotParserInstance,
	PackageNameParser,
	WsTabNlParsers,
	WsTabParsers
} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector, SingleKeywordTokenParser} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';

export type TsscmfvMethodThrowsKeywords =
	| ['throws', GroovyTokenId.THROWS];

/**
 * throws keyword can:
 * - start a method throws declaration
 */
export class ThrowsParser extends SingleKeywordTokenParser {
	constructor() {
		super('throws');
	}

	protected getTokenId(): GroovyTokenId {
		return T.THROWS;
	}

	static readonly instance = new ThrowsParser();
}

/**
 * annotation is allowed before and after keyword or comma.
 */
export class TsscmfvMethodThrowsParser {
	private static readonly StartSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance,
			ThrowsParser.instance, CommentParsers, WsTabNlParsers
		]
	});
	private static readonly StartedSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance, CommaParserInstance,
			PackageNameParser.instance, CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterNameSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance, CommaParserInstance,
			DotParserInstance, MLCommentParser.instance, WsTabParsers]
	});
	private static readonly AfterDotSelector = new ParserSelector({
		parsers: [
			CommaParserInstance,
			PackageNameParser.instance, MLCommentParser.instance, WsTabParsers
		]
	});

	private subsequent(selector: ParserSelector, context: ParseContext): void {
		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			if (parser === ThrowsParser.instance) {
				const block = context.block();
				if (block.id === T.TsscmfvDecl) {
					block.rewriteId(T.MethodDecl);
				}
				if (block.id !== T.MethodThrowsSeg) {
					const decl = new BlockToken(T.MethodThrowsSeg);
					context.sink(decl);
				}
			}
			parser.parse(c, context);
			if (parser === ThrowsParser.instance || parser === CommaParserInstance) {
				selector = TsscmfvMethodThrowsParser.StartedSelector;
			} else if (parser === PackageNameParser.instance) {
				selector = TsscmfvMethodThrowsParser.AfterNameSelector;
			} else if (parser === DotParserInstance) {
				selector = TsscmfvMethodThrowsParser.AfterDotSelector;
			}
			c = context.char();
		}
	}

	parse(token: AtomicToken, context: ParseContext): boolean {
		const block = context.block();
		if (block.id === T.TsscmfvDecl) {
			block.rewriteId(T.MethodDecl);
		} else if (block.id === T.MethodDecl) {
			// because of throws keyword collected, do nothing
		} else {
			const decl = new BlockToken(T.MethodDecl);
			context.sink(decl);
		}
		const decl = new BlockToken(T.MethodThrowsSeg, token);
		context.sink(decl);
		context.forward(token.text.length);

		this.subsequent(TsscmfvMethodThrowsParser.StartedSelector, context);

		context.rise();
		return true;
	}

	try(context: ParseContext): void {
		this.subsequent(TsscmfvMethodThrowsParser.StartSelector, context);
		if (context.block().id === T.MethodThrowsSeg) {
			context.rise();
		}
	}

	static readonly instance = new TsscmfvMethodThrowsParser();
}
