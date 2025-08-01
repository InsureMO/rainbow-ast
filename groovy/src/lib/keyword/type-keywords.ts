import {BlockToken, Char, Token} from '@rainbow-ast/core';
import {SemicolonParserInstance, TypeDeclNameParser} from '../common-token';
import {ParseContext} from '../parse-context';
import {TA} from '../token-attributes';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, ParserSelectorArgs, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

type TypeKeywordParserArgs =
	| ['@interface', GroovyTokenId.AT_INTERFACE]
	| ['class', GroovyTokenId.CLASS]
	| ['enum', GroovyTokenId.ENUM]
	| ['interface', GroovyTokenId.INTERFACE]
	| ['record', GroovyTokenId.RECORD]
	| ['trait', GroovyTokenId.TRAIT];

type TypeKeywordInitParsers = {
	init: ParserSelectorArgs['parsers'];
	afterName: ParserSelectorArgs['parsers'];
}

/**
 * there are 3 scenarios that using this parser:
 * 1. parent block is {@link T.TsscmfvDecl}, which created by {@link TsscmfvModifierKeywordParser}.
 *    this parser will take over the parsing of all subsequent text (after the already parsed modifiers).
 *    that is, after parsing the first type keyword, it will use the sub parser to parse the subsequent text.
 * 2. parent block is {@link T.TypeDecl}, which created by this parser.
 *    then simply add the keyword token.
 *    since the parser for the parent block is also this parser, it will be responsible for the loop of the sub parsers.
 * 3. parent block is not one of above.
 *    then it's the same as the standard block token parsing.
 *    after creating the block token, use the sub parsers to continue parsing.
 *
 * additional operations:
 * - use the first type keyword as class type, set into token's attribute,
 * - use the first type name as type name, set into token's attribute.
 */
export class TypeKeywordParser<A extends TypeKeywordParserArgs> extends KeywordTokenParser {
	private static Selector: ParserSelector;
	private static AfterNameSelector: ParserSelector;
	private readonly _tokenId: A[1];

	static initSelectors(parsers: TypeKeywordInitParsers) {
		if (TypeKeywordParser.Selector != null
			|| TypeKeywordParser.AfterNameSelector != null) {
			throw new Error('TypeKeywordParser.Selector is initialized.');
		}
		TypeKeywordParser.Selector = new ParserSelector({parsers: parsers.init});
		TypeKeywordParser.AfterNameSelector = new ParserSelector({parsers: parsers.afterName});
	}

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	protected startBlock(ch: Char, context: ParseContext): void {
		const keyword = this.createToken(ch, context);
		const decl = new BlockToken(T.TypeDecl, keyword);
		this.writeTypeKind(decl);
		context.sink(decl);
		context.forward(this.keyword.length);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TypeKeywordParser.Selector;
	}

	private writeTypeName(context: ParseContext) {
		const block = context.block();
		if (block.hasAttr(TA.TypeName)) {
			return;
		}

		const name = block.children[block.children.length - 1];
		block.setAttr(TA.TypeName, name.text);
	}

	public afterChildParsed(context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === TypeDeclNameParser.instance) {
			this.writeTypeName(context);
			return TypeKeywordParser.AfterNameSelector;
		} else if (parser === SemicolonParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	private writeTypeKind(block: Token): void {
		if (block.hasAttr(TA.TypeKind)) {
			return;
		}
		switch (this._tokenId) {
			case T.AT_INTERFACE:
			case T.CLASS:
			case T.ENUM:
			case T.INTERFACE:
			case T.RECORD:
			case T.TRAIT: {
				block.setAttr(TA.TypeKind, this._tokenId);
				break;
			}
			default: {
				throw new Error(`Unknown type kind[${this._tokenId}].`);
			}
		}
	}

	/**
	 * 1. current block is {@link T.TsscmfvDecl}, rewrite to {@link T.TypeDecl} and collect keyword token,
	 * 2. current block is {@link T.TypeDecl}, collect keyword token,
	 * 3. otherwise create {@link T.TypeDecl} and collect keyword token.
	 */
	parse(ch: Char, context: ParseContext): boolean {
		const block = context.block();
		if (block.id === T.TsscmfvDecl) {
			// take over from tsscmfv
			block.rewriteId(T.TypeDecl);
			this.collectToken(ch, context);
			this.writeTypeKind(block);
			this.parseBySubParsers(ch, context);
		} else if (block.id === T.TypeDecl) {
			this.collectToken(ch, context);
		} else {
			this.parseAsBlock(ch, context);
		}
		return true;
	}

	static readonly instanceAtInterface = new TypeKeywordParser('@interface', T.AT_INTERFACE);
	static readonly instanceClass = new TypeKeywordParser('class', T.CLASS);
	static readonly instanceEnum = new TypeKeywordParser('enum', T.ENUM);
	static readonly instanceInterface = new TypeKeywordParser('interface', T.INTERFACE);
	static readonly instanceRecord = new TypeKeywordParser('record', T.RECORD);
	static readonly instanceTrait = new TypeKeywordParser('trait', T.TRAIT);
}

export const TypeKeywordParsers: Array<TokenParser> = [
	TypeKeywordParser.instanceAtInterface,
	TypeKeywordParser.instanceClass,
	TypeKeywordParser.instanceEnum,
	TypeKeywordParser.instanceInterface,
	TypeKeywordParser.instanceRecord,
	TypeKeywordParser.instanceTrait
];
