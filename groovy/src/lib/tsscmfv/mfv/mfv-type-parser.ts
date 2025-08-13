import {AtomicToken, BlockToken} from '@rainbow-ast/core';
import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers, MLCommentParser} from '../../comment';
import {DotParserInstance, PackageNameParser, WsTabNlParsers, WsTabParsers} from '../../common-token';
import {GenericTypeParser} from '../../generic-type';
import {ParseContext} from '../../parse-context';
import {PrimitiveTypeParser, PrimitiveTypeParsers, VoidParser} from '../../primitive-type';
import {ParserSelector} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';

/**
 * void also can be used in field/variable declaration, but it is incorrect
 */
export type TsscmfvMethodReturnTypeKeywords =
	| ['void', GroovyTokenId.VOID]
	| ['boolean', GroovyTokenId.BOOLEAN]
	| ['byte', GroovyTokenId.BYTE]
	| ['char', GroovyTokenId.CHAR]
	| ['double', GroovyTokenId.DOUBLE]
	| ['float', GroovyTokenId.FLOAT]
	| ['int', GroovyTokenId.INT]
	| ['long', GroovyTokenId.LONG]
	| ['short', GroovyTokenId.SHORT];

class GenericTypeForMethodParser extends GenericTypeParser {
	isAvailable(context: ParseContext): boolean {
		const block = context.block();
		switch (block.id) {
			case T.TsscmfvDecl:
			case T.MethodDecl:
				return true;
			case T.FieldDecl:
			case T.VarDecl:
				return false;
			case T.MfvTypeSeg: {
				return [T.TsscmfvDecl, T.MethodDecl].includes(block.parent.id);
			}
			default: {
				throw new Error(`Parent token[${T[block.id]}] is not supported.`);
			}
		}
	}

	static readonly instance = new GenericTypeForMethodParser();
}

/**
 * mfv = method, field, variable.
 * mfv type is method return type or field/variable type,
 * type could be alias name, qualified name, full qualified name, void and 8 primitive types.
 *
 * - accept multiple types, it is incorrect,
 *
 * - annotation is allowed before or after any type keyword
 * - generic type is allowed before type
 */
export class MfvTypeParser {
	private static readonly StartSelector = new ParserSelector({
		parsers: [
			GenericTypeForMethodParser.instance,
			PrimitiveTypeParsers, VoidParser.instance, PackageNameParser.instance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly StartedSelector = new ParserSelector({
		parsers: [
			GenericTypeForMethodParser.instance, AnnotationDeclParser.instance,
			PrimitiveTypeParsers, VoidParser.instance,
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
				if (block.id !== T.MfvTypeSeg) {
					const decl = new BlockToken(T.MfvTypeSeg);
					context.sink(decl);
				}
			}
			parser.parse(c, context);
			if (parser === VoidParser.instance
				|| parser instanceof PrimitiveTypeParser) {
				selector = MfvTypeParser.StartedSelector;
			} else if (parser === PackageNameParser.instance) {
				selector = MfvTypeParser.AfterNameSelector;
			} else if (parser === DotParserInstance) {
				selector = MfvTypeParser.AfterDotSelector;
			}
			c = context.char();
		}
	}

	parse(token: AtomicToken, context: ParseContext): boolean {
		const block = context.block();
		switch (block.id) {
			case T.TsscmfvDecl:
			case T.MethodDecl:
			case T.FieldDecl:
			case T.VarDecl: {
				// do nothing
				break;
			}
			default: {
				const decl = new BlockToken(T.TsscmfvDecl);
				context.sink(decl);
				break;
			}
		}
		const decl = new BlockToken(T.MfvTypeSeg, token);
		context.sink(decl);
		context.forward(token.text.length);

		this.subsequent(MfvTypeParser.StartedSelector, context);

		context.rise();
		return true;
	}

	try(context: ParseContext): void {
		this.subsequent(MfvTypeParser.StartSelector, context);
		if (context.block().id === T.MfvTypeSeg) {
			context.rise();
		}
	}

	static readonly instance = new MfvTypeParser();
}
