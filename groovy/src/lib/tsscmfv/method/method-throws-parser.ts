import {AtomicToken, BlockToken} from '@rainbow-ast/core';
import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers} from '../../comment';
import {CommaParserInstance, DotParserInstance, PackageNameParser, WsTabNlParsers} from '../../common-token';
import {GenericTypeParser} from '../../generic-type';
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
 * - annotation is allowed before and after keyword or comma
 * - generic type is allowed after name
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
			CommaParserInstance, GenericTypeParser.instance, DotParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterDotSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance, GenericTypeParser.instance, CommaParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterGenTSelector: ParserSelector = new ParserSelector({
		parsers: [
			CommaParserInstance,
			CommentParsers, WsTabNlParsers
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
			} else if (parser === GenericTypeParser.instance) {
				selector = TsscmfvMethodThrowsParser.AfterGenTSelector;
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
