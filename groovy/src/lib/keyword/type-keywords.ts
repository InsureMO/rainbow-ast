import {BlockToken, Char} from '@rainbow-ast/core';
import {SemicolonParserInstance, TypeDeclNameParser} from '../common-token';
import {ParseContext} from '../parse-context';
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
		context.sink(decl);
		context.forward(this.keyword.length);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TypeKeywordParser.Selector;
	}

	public afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === TypeDeclNameParser.instance) {
			return TypeKeywordParser.AfterNameSelector;
		} else if (parser === SemicolonParserInstance) {
			return 'break';
		} else {
			return (void 0);
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
			block.rewriteId(T.TypeDecl);
			return this.collectToken(ch, context);
		} else if (block.id === T.TypeDecl) {
			return this.collectToken(ch, context);
		} else {
			return this.parseAsBlock(ch, context);
		}
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
