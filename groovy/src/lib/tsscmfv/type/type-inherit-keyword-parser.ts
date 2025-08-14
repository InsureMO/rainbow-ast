import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers} from '../../comment';
import {CommaParserInstance, DotParserInstance, PackageNameParser, WsTabNlParsers} from '../../common-token';
import {GenericTypeDeclParser} from '../../generic-type';
import {ParseContext} from '../../parse-context';
import {AfterChildParsed, ParserSelector, SingleKeywordTokenParser, TokenParser} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';

export type TsscmfvTypeInheritKeywords =
	| ['extends', GroovyTokenId.EXTENDS]
	| ['implements', GroovyTokenId.IMPLEMENTS]
	| ['permits', GroovyTokenId.PERMITS];

/**
 * - annotation is allowed after inherit keyword or comma.
 * - generic type is allowed after name
 */
export class TsscmfvTypeInheritKeywordParser<A extends TsscmfvTypeInheritKeywords> extends SingleKeywordTokenParser {
	private static readonly Selector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance, PackageNameParser.instance, CommaParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterNameSelector = new ParserSelector({
		parsers: [
			CommaParserInstance, GenericTypeDeclParser.instance, DotParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterDotSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance, GenericTypeDeclParser.instance, CommaParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly AfterGenTSelector = new ParserSelector({
		parsers: [
			CommaParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});

	private readonly _tokenId: A[1];

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TsscmfvTypeInheritKeywordParser.Selector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === PackageNameParser.instance) {
			return TsscmfvTypeInheritKeywordParser.AfterNameSelector;
		} else if (parser === DotParserInstance) {
			return TsscmfvTypeInheritKeywordParser.AfterDotSelector;
		} else if (parser === GenericTypeDeclParser.instance) {
			return TsscmfvTypeInheritKeywordParser.AfterGenTSelector;
		} else if (parser === CommaParserInstance) {
			return TsscmfvTypeInheritKeywordParser.Selector;
		} else {
			return (void 0);
		}
	}

	parse(_: Char, context: ParseContext): boolean {
		return this.startBy(this.createToken(context), context);
	}

	startBy(token: AtomicToken, context: ParseContext): boolean {
		const block = context.block();
		if (block.id === T.TsscmfvDecl) {
			block.rewriteId(T.TypeDecl);
		} else if (block.id !== T.TypeDecl) {
			const decl = new BlockToken(T.TypeDecl);
			context.sink(decl);
		}

		const decl = new BlockToken(T.TypeInheritSeg, token);
		context.sink(decl);
		context.forward(token.text.length);

		this.parseBySubParsers(context);

		context.rise();

		return true;
	}

	static readonly instanceExtends = new TsscmfvTypeInheritKeywordParser('extends', GroovyTokenId.EXTENDS);
	static readonly instanceImplements = new TsscmfvTypeInheritKeywordParser('implements', GroovyTokenId.IMPLEMENTS);
	static readonly instancePermits = new TsscmfvTypeInheritKeywordParser('permits', GroovyTokenId.PERMITS);
}

export const TsscmfvTIKP = TsscmfvTypeInheritKeywordParser;
