import {BlockToken, Char} from '@rainbow-ast/core';
import {SemicolonParserInstance} from '../common-token';
import {ParseContext} from '../parse-context';
import {
	AfterChildParsed,
	ParserSelector,
	ParserSelectorArgs,
	SingleKeywordTokenParser,
	TokenParser
} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';
import {TypeKeywordParser} from './type-keywords';

type TsscmfvModifierKeywordParserArgs =
	| ['abstract', GroovyTokenId.ABSTRACT]
	| ['def', GroovyTokenId.DEF]
	| ['final', GroovyTokenId.FINAL]
	| ['public', GroovyTokenId.PUBLIC]
	| ['protected', GroovyTokenId.PROTECTED]
	| ['private', GroovyTokenId.PRIVATE]
	| ['static', GroovyTokenId.STATIC]
	| ['strictfp', GroovyTokenId.STRICTFP];

export abstract class TsscmfvModifierKeywordParser<A extends TsscmfvModifierKeywordParserArgs> extends SingleKeywordTokenParser {
	private static Selector: ParserSelector;
	private readonly _tokenId: A[1];

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (TsscmfvModifierKeywordParser.Selector != null) {
			throw new Error('TcmfModifierKeywordParser.Selector is initialized.');
		}
		TsscmfvModifierKeywordParser.Selector = new ParserSelector({parsers});
	}

	protected constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	protected startBlock(ch: Char, context: ParseContext): void {
		const keyword = this.createToken(ch, context);
		const decl = new BlockToken(T.TsscmfvDecl, keyword);
		context.sink(decl);
		context.forward(this.keyword.length);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TsscmfvModifierKeywordParser.Selector;
	}

	protected afterChildParsed(context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser instanceof TypeKeywordParser) {
			return parser.afterChildParsed(context, parser);
		} else if (parser === SemicolonParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	/**
	 * for {@link T.TsscmfvDecl}, parse as keyword.
	 * otherwise start a {@link T.TsscmfvDecl}.
	 */
	parse(ch: Char, context: ParseContext): boolean {
		const block = context.block();
		if (block.id === T.TsscmfvDecl) {
			return super.parse(ch, context);
		} else {
			return this.parseAsBlock(ch, context);
		}
	}
}
