import {AtomicToken, BlockToken, Token} from '@rainbow-ast/core';
import {CommentParsers} from '../comment';
import {TypeDeclNameParser, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {TA} from '../token-attributes';
import {ParserSelector, ParserSelectorArgs} from '../token-parser';
import {T} from '../tokens';
import {TKP, TypeKeywordParser} from './type-keywords';

interface TypeParserArgs {
	Start: ParserSelectorArgs['parsers'];
	Started: ParserSelectorArgs['parsers'];
	AfterName: ParserSelectorArgs['parsers'];
}

export class TypeParser {
	private static StartSelector: ParserSelector;
	private static StartedSelector: ParserSelector;
	private static AfterNameSelector: ParserSelector;

	static initSelector(parsers: TypeParserArgs) {
		if (TypeParser.StartSelector != null
			|| TypeParser.StartedSelector != null
			|| TypeParser.AfterNameSelector != null) {
			throw new Error('TypeParser.Selector is initialized.');
		}
		TypeParser.StartSelector = new ParserSelector({parsers: parsers.Start});
		TypeParser.StartedSelector = new ParserSelector({parsers: parsers.Started});
		TypeParser.AfterNameSelector = new ParserSelector({parsers: parsers.AfterName});
	}

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
			if (parser instanceof TypeKeywordParser) {
				const block = context.block();
				if (block.id === T.TsscmfvDecl) {
					block.rewriteId(T.TypeDecl);
				}
				const token = block.children[block.children.length - 1];
				this.writeTypeKind(block, token);
				selector = TypeParser.StartedSelector;
			} else if (parser === TypeDeclNameParser.instance) {
				const block = context.block();
				const token = block.children[block.children.length - 1];
				this.writeTypeName(block, token);
				selector = TypeParser.AfterNameSelector;
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

		this.subsequent(TypeParser.StartedSelector, context);

		return true;
	}

	continue(context: ParseContext): boolean {
		this.subsequent(TypeParser.StartSelector, context);
		return true;
	}

	static readonly instance = new TypeParser();
}

TypeParser.initSelector({
	Start: [
		TKP.instanceAtInterface, TKP.instanceClass, TKP.instanceEnum, TKP.instanceInterface, TKP.instanceRecord, TKP.instanceTrait,
		CommentParsers,
		WsTabNlParsers
	],
	Started: [
		TypeDeclNameParser.instance,
		TKP.instanceAtInterface, TKP.instanceClass, TKP.instanceEnum, TKP.instanceInterface, TKP.instanceRecord, TKP.instanceTrait,
		CommentParsers,
		WsTabNlParsers
	],
	AfterName: [
		TypeDeclNameParser.instance,
		CommentParsers,
		WsTabNlParsers
	]
});
