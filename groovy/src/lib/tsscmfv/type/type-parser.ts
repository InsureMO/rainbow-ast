import {AtomicToken, BlockToken, Token} from '@rainbow-ast/core';
import {CommentParsers} from '../../comment';
import {TypeDeclNameParser, WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {TA} from '../../token-attributes';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {TsscmfvTKP, TsscmfvTypeKeywordParser} from './type-keywords';

/**
 * - accept multiple type keywords,
 * - accept multiple type names,
 * - TODO accept type variable after type name.
 */
export class TsscmfvTypeParser {
	private static readonly StartSelector = new ParserSelector({
		parsers: [
			TsscmfvTKP.instanceAtInterface, TsscmfvTKP.instanceClass, TsscmfvTKP.instanceEnum, TsscmfvTKP.instanceInterface, TsscmfvTKP.instanceRecord, TsscmfvTKP.instanceTrait,
			CommentParsers,
			WsTabNlParsers
		]
	});
	private static readonly StartedSelector = new ParserSelector({
		parsers: [
			TypeDeclNameParser.instance,
			TsscmfvTKP.instanceAtInterface, TsscmfvTKP.instanceClass, TsscmfvTKP.instanceEnum, TsscmfvTKP.instanceInterface, TsscmfvTKP.instanceRecord, TsscmfvTKP.instanceTrait,
			CommentParsers,
			WsTabNlParsers
		]
	});
	private static readonly AfterNameSelector = new ParserSelector({
		parsers: [
			TypeDeclNameParser.instance,
			CommentParsers,
			WsTabNlParsers
		]
	});

	private writeTypeKind(block: Token, child: Token): void {
		if (block.hasAttr(TA.TypeKind)) {
			return;
		}
		switch (child.id) {
			case T.AT_INTERFACE:
			case T.CLASS:
			case T.ENUM:
			case T.INTERFACE:
			case T.RECORD:
			case T.TRAIT: {
				block.setAttr(TA.TypeKind, child.id);
				break;
			}
			default: {
				throw new Error(`Unknown type kind[${child.id}].`);
			}
		}
	}

	private writeTypeName(block: Token, child: Token): void {
		if (block.hasAttr(TA.TypeName)) {
			return;
		}
		block.setAttr(TA.TypeName, child.text);
	}

	private subsequent(selector: ParserSelector, context: ParseContext): void {
		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser instanceof TsscmfvTypeKeywordParser) {
				const block = context.block();
				if (block.id === T.TsscmfvDecl) {
					block.rewriteId(T.TypeDecl);
				}
				const token = block.children[block.children.length - 1];
				this.writeTypeKind(block, token);
				selector = TsscmfvTypeParser.StartedSelector;
			} else if (parser === TypeDeclNameParser.instance) {
				const block = context.block();
				const token = block.children[block.children.length - 1];
				this.writeTypeName(block, token);
				selector = TsscmfvTypeParser.AfterNameSelector;
			}
			c = context.char();
		}
	}

	parse(token: AtomicToken, context: ParseContext): boolean {
		const block = context.block();
		if (block.id === T.TsscmfvDecl) {
			block.rewriteId(T.TypeDecl);
			context.collect(token);
		} else if (block.id === T.TypeDecl) {
			// because of sealed, non-sealed keyword collected
			context.collect(token);
		} else {
			const decl = new BlockToken(T.TypeDecl, token);
			context.sink(decl);
		}
		context.forward(token.text.length);
		this.writeTypeKind(block, token);

		this.subsequent(TsscmfvTypeParser.StartedSelector, context);
		return true;
	}

	try(context: ParseContext): void {
		this.subsequent(TsscmfvTypeParser.StartSelector, context);
	}

	static readonly instance = new TsscmfvTypeParser();
}
