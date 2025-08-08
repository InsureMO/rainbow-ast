import {AtomicToken, BlockToken} from '@rainbow-ast/core';
import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers} from '../../comment';
import {WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {TsscmfvMKP} from './modifier-keywords';

/**
 * continue parse modifiers,
 * rewrite declaration block id when specific modifier keyword determined.
 *
 * after parsed, declaration block id could be one of following:
 * - {@link T.TypeDecl}: one of keyword {@link T.SEALED}, {@link T.NON_SEALED} detected,
 * - {@link T.MethodDecl}: one of keyword {@link T.DEFAULT}, {@link T.NATIVE} detected,
 *                         note that constructor is treated as {@link T.MethodDecl} as well.
 * - {@link T.FieldDecl}: one of keyword {@link T.TRANSIENT}, {@link T.VAR}, {@link T.VOLATILE} detected,
 *                        and parent of this block is {@link T.TypeBody}
 * - {@link T.VarDecl}: one of keyword {@link T.TRANSIENT}, {@link T.VAR}, {@link T.VOLATILE} detected,
 *                      and parent of this block is not {@link T.TypeBody}
 * - {@link T.TsscmfvDecl}: none of above, note that block id still can be any of 7 types.
 *
 * annotation is allowed before or after any keyword.
 */
export class TsscmfvModifiersParser {
	private static readonly TsscmfvSelector = new ParserSelector({
		parsers: [
			TsscmfvMKP.instanceAbstract,
			TsscmfvMKP.instanceFinal, TsscmfvMKP.instanceStatic, TsscmfvMKP.instanceStrictfp,
			TsscmfvMKP.instanceDef, TsscmfvMKP.instanceVar,
			TsscmfvMKP.instancePrivate, TsscmfvMKP.instanceProtected, TsscmfvMKP.instancePublic,
			TsscmfvMKP.instanceSealed, TsscmfvMKP.instanceNonSealed,
			TsscmfvMKP.instanceSynchronized,
			TsscmfvMKP.instanceDefault, TsscmfvMKP.instanceNative,
			TsscmfvMKP.instanceTransient, TsscmfvMKP.instanceVolatile,
			AnnotationDeclParser.instance,
			CommentParsers,
			WsTabNlParsers
		]
	});
	private static readonly TypeSelector = new ParserSelector({
		parsers: [
			TsscmfvMKP.instanceAbstract,
			TsscmfvMKP.instanceFinal, TsscmfvMKP.instanceStatic, TsscmfvMKP.instanceStrictfp,
			TsscmfvMKP.instanceDef, TsscmfvMKP.instanceVar,
			TsscmfvMKP.instancePrivate, TsscmfvMKP.instanceProtected, TsscmfvMKP.instancePublic,
			TsscmfvMKP.instanceSealed, TsscmfvMKP.instanceNonSealed,
			AnnotationDeclParser.instance,
			CommentParsers,
			WsTabNlParsers
		]
	});
	private static readonly MethodSelector = new ParserSelector({
		parsers: [
			TsscmfvMKP.instanceAbstract,
			TsscmfvMKP.instanceFinal, TsscmfvMKP.instanceStatic, TsscmfvMKP.instanceStrictfp,
			TsscmfvMKP.instanceDef, TsscmfvMKP.instanceVar,
			TsscmfvMKP.instancePrivate, TsscmfvMKP.instanceProtected, TsscmfvMKP.instancePublic,
			TsscmfvMKP.instanceSynchronized,
			TsscmfvMKP.instanceDefault, TsscmfvMKP.instanceNative,
			AnnotationDeclParser.instance,
			CommentParsers,
			WsTabNlParsers
		]
	});
	private static readonly FieldSelector = new ParserSelector({
		parsers: [
			TsscmfvMKP.instanceFinal, TsscmfvMKP.instanceStatic, TsscmfvMKP.instanceStrictfp,
			TsscmfvMKP.instanceDef, TsscmfvMKP.instanceVar,
			TsscmfvMKP.instancePrivate, TsscmfvMKP.instanceProtected, TsscmfvMKP.instancePublic,
			TsscmfvMKP.instanceTransient, TsscmfvMKP.instanceVolatile,
			AnnotationDeclParser.instance,
			CommentParsers,
			WsTabNlParsers
		]
	});

	private detectBlockId(token: AtomicToken, block: BlockToken) {
		let selector = TsscmfvModifiersParser.TsscmfvSelector;
		switch (token.id) {
			// @formatter:off
			case T.SEALED: case T.NON_SEALED: {
				block.rewriteId(T.TypeDecl);
				selector = TsscmfvModifiersParser.TypeSelector;
				break;
			}
			case T.DEFAULT: case T.NATIVE: {
				block.rewriteId(T.MethodDecl);
				selector = TsscmfvModifiersParser.MethodSelector;
				break;
			}
			case T.TRANSIENT: case T.VOLATILE: {
				if (block.parent.id === T.TypeBody) {
					block.rewriteId(T.FieldDecl);
				} else {
					block.rewriteId(T.VarDecl);
				}
				selector = TsscmfvModifiersParser.FieldSelector;
				break;
			}
			// @formatter:on
		}
		return selector;
	}

	parse(token: AtomicToken, context: ParseContext): boolean {
		let block = context.block();
		if (block.id !== T.TsscmfvDecl) {
			const decl = new BlockToken(T.TsscmfvDecl);
			context.sink(decl);
			block = decl;
		}
		let selector = this.detectBlockId(token, block);
		const modifiers = new BlockToken(T.ModifierSeg, token);
		context.sink(modifiers);
		context.forward(token.text.length);

		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser === TsscmfvMKP.instanceSealed || parser === TsscmfvMKP.instanceNonSealed) {
				block.rewriteId(T.TypeDecl);
				selector = TsscmfvModifiersParser.TypeSelector;
			} else if (parser === TsscmfvMKP.instanceDefault || parser === TsscmfvMKP.instanceNative) {
				block.rewriteId(T.MethodDecl);
				selector = TsscmfvModifiersParser.MethodSelector;
			} else if (parser === TsscmfvMKP.instanceTransient || parser === TsscmfvMKP.instanceVolatile) {
				if (block.parent.id === T.TypeBody) {
					block.rewriteId(T.FieldDecl);
				} else {
					block.rewriteId(T.VarDecl);
				}
				selector = TsscmfvModifiersParser.FieldSelector;
			}
			c = context.char();
		}

		// end modifiers block
		context.rise();

		return true;
	}

	static readonly instance = new TsscmfvModifiersParser();
}
