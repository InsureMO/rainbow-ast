import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers, MLCommentParser} from '../../comment';
import {
	CommaParserInstance,
	DotParserInstance,
	PackageNameParser,
	WsTabNlParsers,
	WsTabParsers
} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {AfterChildParsed, ParserSelector, SingleKeywordTokenParser, TokenParser} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';

export type TsscmfvTypeInheritKeywords =
	| ['extends', GroovyTokenId.EXTENDS]
	| ['implements', GroovyTokenId.IMPLEMENTS]
	| ['permits', GroovyTokenId.PERMITS];

/**
 * annotation is allowed after inherit keyword or comma.
 */
export class TsscmfvTypeInheritKeywordParser<A extends TsscmfvTypeInheritKeywords> extends SingleKeywordTokenParser {
	private static readonly EISelector: ParserSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance, PackageNameParser.instance, CommaParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly EIAfterNameSelector: ParserSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance, CommaParserInstance,
			DotParserInstance, MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly EIAfterDotSelector: ParserSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance, CommaParserInstance,
			MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly PSelector: ParserSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance, PackageNameParser.instance, CommaParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly PAfterNameSelector: ParserSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance, CommaParserInstance,
			DotParserInstance, MLCommentParser.instance, WsTabParsers
		]
	});
	private static readonly PAfterDotSelector: ParserSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance, CommaParserInstance,
			MLCommentParser.instance, WsTabParsers
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
		if (this.getTokenId() === T.PERMITS) {
			return TsscmfvTypeInheritKeywordParser.PSelector;
		} else {
			return TsscmfvTypeInheritKeywordParser.EISelector;
		}
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (this.getTokenId() === T.PERMITS) {
			if (parser === PackageNameParser.instance) {
				return TsscmfvTypeInheritKeywordParser.PAfterNameSelector;
			} else if (parser === DotParserInstance) {
				return TsscmfvTypeInheritKeywordParser.PAfterDotSelector;
			} else if (parser === CommaParserInstance) {
				return TsscmfvTypeInheritKeywordParser.PSelector;
			} else {
				return (void 0);
			}
		} else {
			if (parser === PackageNameParser.instance) {
				return TsscmfvTypeInheritKeywordParser.EIAfterNameSelector;
			} else if (parser === DotParserInstance) {
				return TsscmfvTypeInheritKeywordParser.EIAfterDotSelector;
			} else if (parser === CommaParserInstance) {
				return TsscmfvTypeInheritKeywordParser.EISelector;
			} else {
				return (void 0);
			}
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
