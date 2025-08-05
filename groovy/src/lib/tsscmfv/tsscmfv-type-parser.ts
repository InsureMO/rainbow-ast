import {AtomicToken, BlockToken, Token} from '@rainbow-ast/core';
import {CommentParsers} from '../comment';
import {TypeDeclNameParser, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {TA} from '../token-attributes';
import {ParserSelector, ParserSelectorArgs} from '../token-parser';
import {T} from '../tokens';
import {TsscmfvTKP, TsscmfvTypeKeywordParser} from './tsscmfv-type-keywords';

interface TsscmfvTypeParserArgs {
	Start: ParserSelectorArgs['parsers'];
	Started: ParserSelectorArgs['parsers'];
	AfterName: ParserSelectorArgs['parsers'];
}

export class TsscmfvTypeParser {
	private static StartSelector: ParserSelector;
	private static StartedSelector: ParserSelector;
	private static AfterNameSelector: ParserSelector;

	static initSelectors(parsers: TsscmfvTypeParserArgs) {
		if (TsscmfvTypeParser.StartSelector != null
			|| TsscmfvTypeParser.StartedSelector != null
			|| TsscmfvTypeParser.AfterNameSelector != null) {
			throw new Error('TypeParser.Selector is initialized.');
		}
		TsscmfvTypeParser.StartSelector = new ParserSelector({parsers: parsers.Start});
		TsscmfvTypeParser.StartedSelector = new ParserSelector({parsers: parsers.Started});
		TsscmfvTypeParser.AfterNameSelector = new ParserSelector({parsers: parsers.AfterName});
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

	continue(context: ParseContext): boolean {
		this.subsequent(TsscmfvTypeParser.StartSelector, context);
		return true;
	}

	static readonly instance = new TsscmfvTypeParser();
}

TsscmfvTypeParser.initSelectors({
	Start: [
		TsscmfvTKP.instanceAtInterface, TsscmfvTKP.instanceClass, TsscmfvTKP.instanceEnum, TsscmfvTKP.instanceInterface, TsscmfvTKP.instanceRecord, TsscmfvTKP.instanceTrait,
		CommentParsers,
		WsTabNlParsers
	],
	Started: [
		TypeDeclNameParser.instance,
		TsscmfvTKP.instanceAtInterface, TsscmfvTKP.instanceClass, TsscmfvTKP.instanceEnum, TsscmfvTKP.instanceInterface, TsscmfvTKP.instanceRecord, TsscmfvTKP.instanceTrait,
		CommentParsers,
		WsTabNlParsers
	],
	AfterName: [
		TypeDeclNameParser.instance,
		CommentParsers,
		WsTabNlParsers
	]
});
