import {AtomicToken, BlockToken} from '@rainbow-ast/core';
import {CommentParsers, MLCommentParser} from '../../comment';
import {DotParserInstance, PackageNameParser, WsTabNlParsers, WsTabParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {PrimitiveTypeParser, PrimitiveTypeParsers, VoidParser} from '../../primitive-type';
import {ParserSelector} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';

// TODO add 8 primitive types?
export type TsscmfvMethodReturnKeywords =
	| ['void', GroovyTokenId.VOID];

/**
 * return type could be alias name, qualified name, full qualified name, void and 8 primitive types.
 *
 * - accept multiple return types, it is incorrect,
 * - TODO accept type variable before return type,
 * - TODO accept type variable after return type, it is incorrect.
 */
export class TsscmfvMethodReturnParser {
	private static readonly StartSelector = new ParserSelector({
		parsers: [
			PrimitiveTypeParsers, VoidParser.instance, PackageNameParser.instance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly StartedSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance, PrimitiveTypeParsers, VoidParser.instance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterNameSelector = new ParserSelector({
		parsers: [DotParserInstance, MLCommentParser.instance, WsTabParsers]
	});
	private static readonly AfterDotSelector = new ParserSelector({
		parsers: [PackageNameParser.instance, MLCommentParser.instance, WsTabParsers]
	});

	private subsequent(selector: ParserSelector, context: ParseContext): void {
		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			if (parser === PackageNameParser.instance
				|| parser === VoidParser.instance
				|| parser instanceof PrimitiveTypeParser) {
				const block = context.block();
				if (block.id === T.TsscmfvDecl) {
					block.rewriteId(T.MethodDecl);
				}
				if (block.id !== T.MethodReturnDecl) {
					const decl = new BlockToken(T.MethodReturnDecl);
					context.sink(decl);
				}
			}
			parser.parse(c, context);
			if (parser === VoidParser.instance
				|| parser instanceof PrimitiveTypeParser) {
				selector = TsscmfvMethodReturnParser.StartedSelector;
			} else if (parser === PackageNameParser.instance) {
				selector = TsscmfvMethodReturnParser.AfterNameSelector;
			} else if (parser === DotParserInstance) {
				selector = TsscmfvMethodReturnParser.AfterDotSelector;
			}
			c = context.char();
		}
	}

	parse(token: AtomicToken, context: ParseContext): boolean {
		const block = context.block();
		if (block.id === T.TsscmfvDecl) {
			block.rewriteId(T.MethodDecl);
		} else if (block.id === T.MethodDecl) {
			// because of void keyword collected, do nothing
		} else {
			const decl = new BlockToken(T.MethodDecl);
			context.sink(decl);
		}
		const decl = new BlockToken(T.MethodReturnDecl, token);
		context.sink(decl);
		context.forward(token.text.length);

		this.subsequent(TsscmfvMethodReturnParser.StartedSelector, context);

		context.rise();
		return true;
	}

	continue(context: ParseContext): void {
		this.subsequent(TsscmfvMethodReturnParser.StartSelector, context);
		if (context.block().id === T.MethodReturnDecl) {
			context.rise();
		}
	}

	static readonly instance = new TsscmfvMethodReturnParser();
}
