import {Char} from '@rainbow-ast/core';
import {CommentParsers} from '../comment';
import {SemicolonParserInstance, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {KeywordTokenParser, ParserSelector} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';
import {TsscmfvCodeBlockParser} from './tsscmfv-code-block';
import {TsscmfvKeywords} from './tsscmfv-keywords-types';
import {TsscmfvModifiersParser} from './tsscmfv-modifiers-parser';
import {TsscmfvSyncExprParser} from './tsscmfv-synchronized-expression';
import {TsscmfvTypeInheritParser} from './tsscmfv-type-inherit-parser';
import {TsscmfvTypeParser} from './tsscmfv-type-parser';
import {TsscmfvKeywordUtils} from './tsscmfv-utils';

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
			case TsscmfvKeywordKind.Modifier: {
				TsscmfvModifiersParser.instance.parse(token, context);
				const modifierTokens = TsscmfvKeywordUtils.getModifierTokens(context.block());
				if (TsscmfvKeywordUtils.onlySynchronizedKeywords(modifierTokens)) {
					// synchronized block
					TsscmfvSyncExprParser.instance.continue(context);
				} else {
					// not synchronized block
					TsscmfvTypeParser.instance.continue(context);
					TsscmfvTypeInheritParser.instance.continue(context);
				}
				break;
			}
			case TsscmfvKeywordKind.Type: {
				TsscmfvTypeParser.instance.parse(token, context);
				TsscmfvTypeInheritParser.instance.continue(context);
				break;
			}
			case TsscmfvKeywordKind.Inherit: {
				TsscmfvTypeInheritParser.instance.parse(token, context);
				break;
			}
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
				} else if (parser === TsscmfvCodeBlockParser.instance) {
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
	static readonly instanceSynchronized = new TsscmfvDeclParser('synchronized', GroovyTokenId.SYNCHRONIZED);
	static readonly instanceTrait = new TsscmfvDeclParser('trait', GroovyTokenId.TRAIT);
}

export const TsscmfvTDP = TsscmfvDeclParser;

export const TsscmfvDeclParsers = [
	TsscmfvTDP.instanceAtInterface,
	TsscmfvTDP.instanceAbstract,
	TsscmfvTDP.instanceClass,
	TsscmfvTDP.instanceDef,
	TsscmfvTDP.instanceEnum,
	TsscmfvTDP.instanceExtends,
	TsscmfvTDP.instanceFinal,
	TsscmfvTDP.instanceImplements,
	TsscmfvTDP.instanceInterface,
	TsscmfvTDP.instanceNonSealed,
	TsscmfvTDP.instancePrivate,
	TsscmfvTDP.instanceProtected,
	TsscmfvTDP.instancePublic,
	TsscmfvTDP.instanceRecord,
	TsscmfvTDP.instanceSealed,
	TsscmfvTDP.instanceStatic,
	TsscmfvTDP.instanceStrictfp,
	TsscmfvTDP.instanceSynchronized,
	TsscmfvTDP.instanceTrait
];
