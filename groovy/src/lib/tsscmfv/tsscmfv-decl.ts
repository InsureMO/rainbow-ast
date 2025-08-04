import {Char} from '@rainbow-ast/core';
import {CommentParsers} from '../comment';
import {SemicolonParserInstance, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {KeywordTokenParser, ParserSelector} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';
import {TsscmfvCodeBlockParser} from './code-block';
import {TsscmfvKeywords} from './keywords-types';
import {ModifiersParser} from './modifiers-parser';
import {TypeInheritParser} from './type-inherit-parser';
import {TypeParser} from './type-parser';
import {TsscmfvKeywordUtils} from './utils';

enum TsscmfvKeywordKind {
	Modifier, Type, Inherit,
}

export class TsscmfvDeclParser<A extends TsscmfvKeywords> extends KeywordTokenParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [
			TsscmfvCodeBlockParser.instance,
			SemicolonParserInstance,
			CommentParsers,
			WsTabNlParsers
		]
	});

	private readonly _tokenId: A[1];
	private readonly _tokenKind: TsscmfvKeywordKind;

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
		if (TsscmfvKeywordUtils.isModifierKeyword(this._tokenId)) {
			this._tokenKind = TsscmfvKeywordKind.Modifier;
		} else if (TsscmfvKeywordUtils.isTypeKeyword(this._tokenId)) {
			this._tokenKind = TsscmfvKeywordKind.Type;
		} else if (TsscmfvKeywordUtils.isInheritKeyword(this._tokenId)) {
			this._tokenKind = TsscmfvKeywordKind.Inherit;
		} else {
			throw new Error(`Tsscmfv keyword[${keyword}] is not supported.`);
		}
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	// noinspection JSUnusedGlobalSymbols
	protected getTokenKind(): TsscmfvKeywordKind {
		return this._tokenKind;
	}

	isAvailable(context: ParseContext): boolean {
		switch (this._tokenId) {
			case T.SEALED:
				return context.isSealedClassEnabled();
			case T.RECORD:
				return context.isRecordClassEnabled();
			case T.NON_SEALED:
				return context.isNonSealedClassEnabled();
			default:
				return true;
		}
	}

	parse(_: Char, context: ParseContext): boolean {
		const token = this.createToken(context);

		switch (this._tokenKind) {
			case TsscmfvKeywordKind.Modifier:
				ModifiersParser.instance.parse(token, context);
				TypeParser.instance.continue(context);
				TypeInheritParser.instance.continue(context);
				break;
			case TsscmfvKeywordKind.Type:
				TypeParser.instance.parse(token, context);
				TypeInheritParser.instance.continue(context);
				break;
			case TsscmfvKeywordKind.Inherit:
				TypeInheritParser.instance.parse(token, context);
				break;
			default:
				throw new Error(`Tsscmfv token kind[${this._tokenKind}] is not supported.`);
		}

		// end tsscmfv if none of above ended it
		const block = context.block();
		if ([T.TsscmfvDecl, T.TypeDecl].includes(block.id)) {
			// not end yet, scan the end token
			let c = context.char();
			while (c != null) {
				const parser = TsscmfvDeclParser.Selector.find(c, context);
				if (parser == null) {
					break;
				}
				parser.parse(c, context);
				if (parser === SemicolonParserInstance) {
					break;
				}
				c = context.char();
			}
			context.rise();
		} else {
			throw new Error(`Block token[${T[block.id]}] not supported.`);
		}

		return true;
	}

	static readonly instanceAtInterface = new TsscmfvDeclParser('@interface', GroovyTokenId.AT_INTERFACE);
	static readonly instanceAbstract = new TsscmfvDeclParser('abstract', GroovyTokenId.ABSTRACT);
	static readonly instanceClass = new TsscmfvDeclParser('class', GroovyTokenId.CLASS);
	static readonly instanceDef = new TsscmfvDeclParser('def', GroovyTokenId.DEF);
	static readonly instanceEnum = new TsscmfvDeclParser('enum', GroovyTokenId.ENUM);
	static readonly instanceExtends = new TsscmfvDeclParser('extends', GroovyTokenId.EXTENDS);
	static readonly instanceFinal = new TsscmfvDeclParser('final', GroovyTokenId.FINAL);
	static readonly instanceImplements = new TsscmfvDeclParser('implements', GroovyTokenId.IMPLEMENTS);
	static readonly instanceInterface = new TsscmfvDeclParser('interface', GroovyTokenId.INTERFACE);
	static readonly instanceNonSealed = new TsscmfvDeclParser('non-sealed', GroovyTokenId.NON_SEALED);
	static readonly instancePermits = new TsscmfvDeclParser('permits', GroovyTokenId.PERMITS);
	static readonly instancePrivate = new TsscmfvDeclParser('private', GroovyTokenId.PRIVATE);
	static readonly instanceProtected = new TsscmfvDeclParser('protected', GroovyTokenId.PROTECTED);
	static readonly instancePublic = new TsscmfvDeclParser('public', GroovyTokenId.PUBLIC);
	static readonly instanceRecord = new TsscmfvDeclParser('record', GroovyTokenId.RECORD);
	static readonly instanceSealed = new TsscmfvDeclParser('sealed', GroovyTokenId.SEALED);
	static readonly instanceStatic = new TsscmfvDeclParser('static', GroovyTokenId.STATIC);
	static readonly instanceStrictfp = new TsscmfvDeclParser('strictfp', GroovyTokenId.STRICTFP);
	static readonly instanceTrait = new TsscmfvDeclParser('trait', GroovyTokenId.TRAIT);
}

const TDP = TsscmfvDeclParser;

export const TsscmfvDeclParsers = [
	TDP.instanceAtInterface,
	TDP.instanceAbstract,
	TDP.instanceClass,
	TDP.instanceDef,
	TDP.instanceEnum,
	TDP.instanceExtends,
	TDP.instanceFinal,
	TDP.instanceImplements,
	TDP.instanceInterface,
	TDP.instanceNonSealed,
	TDP.instancePrivate,
	TDP.instanceProtected,
	TDP.instancePublic,
	TDP.instanceRecord,
	TDP.instanceSealed,
	TDP.instanceStatic,
	TDP.instanceStrictfp,
	TDP.instanceTrait
];
