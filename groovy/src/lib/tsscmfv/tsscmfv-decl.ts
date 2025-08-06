import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {SemicolonParserInstance, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {KeywordTokenParser, ParserSelector} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';
import {TryCodeBlockParser} from './code-block';
import {TsscmfvFieldOrVariableParser} from './field-or-variable';
import {TryMethodParametersParserParser, TsscmfvMethodThrowsKeywords, TsscmfvMethodThrowsParser} from './method';
import {MfvNameParser, MfvTypeParser, TsscmfvMethodReturnTypeKeywords} from './mfv';
import {TsscmfvModifierKeywords, TsscmfvModifiersParser} from './modifier';
import {TrySynchronizedExpressionParser} from './synchronized-block';
import {TsscmfvTypeInheritKeywords, TsscmfvTypeInheritParser, TsscmfvTypeKeywords, TsscmfvTypeParser} from './type';
import {TsscmfvKeywordUtils} from './utils';

export type TsscmfvKeywords =
	| TsscmfvModifierKeywords
	| TsscmfvTypeKeywords | TsscmfvTypeInheritKeywords
	| TsscmfvMethodReturnTypeKeywords | TsscmfvMethodThrowsKeywords;

enum TsscmfvKeywordKind {
	Modifier, Type, TypeInherit, MfvType, MethodThrows
}

export class TsscmfvDeclParser<A extends TsscmfvKeywords> extends KeywordTokenParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [
			SemicolonParserInstance,
			MLCommentParser.instance,
			WsTabParsers
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
		} else if (TsscmfvKeywordUtils.isTypeInheritKeyword(this._tokenId)) {
			this._tokenKind = TsscmfvKeywordKind.TypeInherit;
		} else if (TsscmfvKeywordUtils.isMfvTypeKeyword(this._tokenId)) {
			this._tokenKind = TsscmfvKeywordKind.MfvType;
		} else if (TsscmfvKeywordUtils.isMethodThrowsKeyword(this._tokenId)) {
			this._tokenKind = TsscmfvKeywordKind.MethodThrows;
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

	private finalizeBlock(context: ParseContext): void {
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
	}

	/**
	 * try to parse synchronized block body when modifiers has {@link T.SYNCHRONIZED} only (one or more).
	 * if try successfully, rewrite block to {@link T.SyncBlockDecl}, end it and return true.
	 * otherwise return false
	 */
	private trySynchronizedBlock(block: BlockToken, context: ParseContext): boolean {
		if (!TsscmfvKeywordUtils.couldBeSynchronizedBlock(block)) {
			return false;
		}

		TrySynchronizedExpressionParser.instance.try(context);
		block = context.block();
		if (block.id === T.SyncBlockDecl) {
			// success
			TryCodeBlockParser.instanceSynchronizedBody.try(context);
			return true;
		} else {
			// not synchronized expression, it is method
			block.rewriteId(T.MethodDecl);
			return false;
		}
	}

	/**
	 * try to parse static block body when modifiers has {@link T.STATIC} only (one or more).
	 * if try successfully, rewrite block to {@link T.StaticBlockDecl}, end it and return true.
	 * otherwise return false
	 */
	private tryStaticBlock(block: BlockToken, context: ParseContext): boolean {
		if (!TsscmfvKeywordUtils.couldBeStaticBlock(block)) {
			return false;
		}

		if (TryCodeBlockParser.instanceStaticBody.try(context)) {
			block.rewriteId(T.StaticBlockDecl);
			context.rise();
			return true;
		} else {
			return false;
		}
	}

	/**
	 * try to parse type body.
	 * end block when try successfully, or finalize block when try failed.
	 */
	private tryTypeBody(context: ParseContext): void {
		if (TryCodeBlockParser.instanceTypeBody.try(context)) {
			context.rise();
		} else {
			this.finalizeBlock(context);
		}
	}

	/**
	 * try to parse type, type inherit and type body.
	 * if try successfully, rewrite block to {@link T.TypeDecl}, end it and return true.
	 * otherwise return false
	 */
	private tryType(context: ParseContext, firstTypeToken?: AtomicToken): boolean {
		if (firstTypeToken != null) {
			TsscmfvTypeParser.instance.parse(firstTypeToken, context);
		} else {
			TsscmfvTypeParser.instance.try(context);
		}

		TsscmfvTypeInheritParser.instance.try(context);
		if (context.block().id === T.TypeDecl) {
			this.tryTypeBody(context);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * try to parse method body.
	 * end block when try successfully, or finalize block when try failed.
	 */
	private tryMethodBody(context: ParseContext): void {
		if (TryCodeBlockParser.instanceMethodBody.try(context)) {
			context.rise();
		} else {
			this.finalizeBlock(context);
		}
	}

	private tryMethod(context: ParseContext): void {
		MfvTypeParser.instance.try(context);
		MfvNameParser.instance.try(context);
		TryMethodParametersParserParser.instance.try(context);
		TsscmfvMethodThrowsParser.instance.try(context);
		this.tryMethodBody(context);
	}

	private tryMfv(context: ParseContext, firstMfvToken?: AtomicToken): void {
		const block = context.block();

		// common part of mfv
		if (firstMfvToken != null) {
			MfvTypeParser.instance.parse(firstMfvToken, context);
		} else {
			MfvTypeParser.instance.try(context);
		}
		MfvNameParser.instance.try(context);

		// try method parameters first
		TryMethodParametersParserParser.instance.try(context);

		if (block.id === T.MethodDecl) {
			// has parameters, continue parse left part of method
			TsscmfvMethodThrowsParser.instance.try(context);
			this.tryMethodBody(context);
			return;
		}

		// has no method parameters, try field/variable
		TsscmfvFieldOrVariableParser.instance.try(context);
		if (block.id === T.FieldDecl || block.id === T.VarDecl) {
			// is field or variable, finalize block
			this.finalizeBlock(context);
			return;
		}

		// still not method, field or variable,
		TsscmfvMethodThrowsParser.instance.try(context);
		this.tryMethodBody(context);
	}

	private tryFieldOrVariable(context: ParseContext): void {
		MfvTypeParser.instance.try(context);
		MfvNameParser.instance.try(context);
		TsscmfvFieldOrVariableParser.instance.try(context);
		this.finalizeBlock(context);
	}

	private startWithModifier(firstModifierToken: AtomicToken, context: ParseContext): void {
		TsscmfvModifiersParser.instance.parse(firstModifierToken, context);

		const block = context.block();
		switch (block.id) {
			case T.TsscmfvDecl: {
				let matched = this.trySynchronizedBlock(block, context);
				if (!matched) {
					// @ts-expect-error block token id might be rewritten
					if (block.id === T.MethodDecl) {
						this.tryMethod(context);
					} else {
						matched = !matched && this.tryStaticBlock(block, context);
						matched = !matched && this.tryType(context);
						if (!matched) {
							this.tryMfv(context);
						}
					}
				}
				break;
			}
			case T.TypeDecl: {
				this.tryType(context);
				break;
			}
			case T.MethodDecl: {
				this.tryMethod(context);
				break;
			}
			case T.FieldDecl:
			case T.VarDecl: {
				this.tryFieldOrVariable(context);
				break;
			}
			default: {
				throw new Error(`Block token[${T[block.id]}] is not supported.`);
			}
		}
	}

	parse(_: Char, context: ParseContext): boolean {
		const token = this.createToken(context);

		switch (this._tokenKind) {
			case TsscmfvKeywordKind.Modifier: {
				this.startWithModifier(token, context);
				break;
			}
			case TsscmfvKeywordKind.Type: {
				this.tryType(context, token);
				break;
			}
			case TsscmfvKeywordKind.TypeInherit: {
				TsscmfvTypeInheritParser.instance.parse(token, context);
				this.tryTypeBody(context);
				break;
			}
			case TsscmfvKeywordKind.MfvType: {
				this.tryMfv(context, token);
				break;
			}
			case TsscmfvKeywordKind.MethodThrows: {
				TsscmfvMethodThrowsParser.instance.parse(token, context);
				this.tryMethodBody(context);
				break;
			}
			default:
				throw new Error(`Tsscmfv token kind[${this._tokenKind}] is not supported.`);
		}

		return true;
	}

	static readonly instanceAtInterface = new TsscmfvDeclParser('@interface', GroovyTokenId.AT_INTERFACE);
	static readonly instanceAbstract = new TsscmfvDeclParser('abstract', GroovyTokenId.ABSTRACT);
	static readonly instanceClass = new TsscmfvDeclParser('class', GroovyTokenId.CLASS);
	static readonly instanceDef = new TsscmfvDeclParser('def', GroovyTokenId.DEF);
	static readonly instanceDefault = new TsscmfvDeclParser('default', GroovyTokenId.DEFAULT);
	static readonly instanceEnum = new TsscmfvDeclParser('enum', GroovyTokenId.ENUM);
	static readonly instanceExtends = new TsscmfvDeclParser('extends', GroovyTokenId.EXTENDS);
	static readonly instanceFinal = new TsscmfvDeclParser('final', GroovyTokenId.FINAL);
	static readonly instanceImplements = new TsscmfvDeclParser('implements', GroovyTokenId.IMPLEMENTS);
	static readonly instanceInterface = new TsscmfvDeclParser('interface', GroovyTokenId.INTERFACE);
	static readonly instanceNative = new TsscmfvDeclParser('native', GroovyTokenId.NATIVE);
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
	static readonly instanceThrows = new TsscmfvDeclParser('throws', GroovyTokenId.THROWS);
	static readonly instanceTrait = new TsscmfvDeclParser('trait', GroovyTokenId.TRAIT);
	static readonly instanceTransient = new TsscmfvDeclParser('transient', GroovyTokenId.TRANSIENT);
	static readonly instanceVar = new TsscmfvDeclParser('var', GroovyTokenId.VAR);
	static readonly instanceVoid = new TsscmfvDeclParser('void', GroovyTokenId.VOID);
	static readonly instanceVolatile = new TsscmfvDeclParser('volatile', GroovyTokenId.VOLATILE);
}

export const TsscmfvTDP = TsscmfvDeclParser;

export const TsscmfvDeclParsers = [
	TsscmfvTDP.instanceAtInterface,
	TsscmfvTDP.instanceAbstract,
	TsscmfvTDP.instanceClass,
	TsscmfvTDP.instanceDef,
	TsscmfvTDP.instanceDefault,
	TsscmfvTDP.instanceEnum,
	TsscmfvTDP.instanceExtends,
	TsscmfvTDP.instanceFinal,
	TsscmfvTDP.instanceImplements,
	TsscmfvTDP.instanceInterface,
	TsscmfvTDP.instanceNative,
	TsscmfvTDP.instanceNonSealed,
	TsscmfvTDP.instancePermits,
	TsscmfvTDP.instancePrivate,
	TsscmfvTDP.instanceProtected,
	TsscmfvTDP.instancePublic,
	TsscmfvTDP.instanceRecord,
	TsscmfvTDP.instanceSealed,
	TsscmfvTDP.instanceStatic,
	TsscmfvTDP.instanceStrictfp,
	TsscmfvTDP.instanceSynchronized,
	TsscmfvTDP.instanceThrows,
	TsscmfvTDP.instanceTrait,
	TsscmfvTDP.instanceTransient,
	TsscmfvTDP.instanceVar,
	TsscmfvTDP.instanceVoid,
	TsscmfvTDP.instanceVolatile
];
