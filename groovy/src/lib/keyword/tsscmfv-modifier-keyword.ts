import {BlockToken, Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {ParserSelector, ParserSelectorArgs, SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

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

	/**
	 * this is for avoid the circular dependency of
	 * 1. GsBraceInterpolationParser -> StringParsers,
	 * 2. StringParsers -> DsGsLiteralParser,
	 * 3. DsGsLiteralParser -> DsGsBraceInterpolationParser,
	 * 4. DsGsBraceInterpolationParser -> GsBraceInterpolationParser.
	 * it breaks the jest test.
	 *
	 * so move the selector initializing to parsers.ts to void it,
	 * mainly remove the StringParsers importing statement from this file.
	 */
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
