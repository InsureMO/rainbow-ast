import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {SemicolonParserInstance, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {KeywordTokenParser, ParserSelector} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';
import {TryCodeBlockParser} from './code-block';
import {TsscmfvFieldOrVariableParser} from './field-or-variable';
import {TryMethodParametersParser, TsscmfvMethodThrowsKeywords, TsscmfvMethodThrowsParser} from './method';
import {MfvNameParser, MfvTypeParser, TsscmfvMethodReturnTypeKeywords} from './mfv';
import {TsscmfvModifierKeywords, TsscmfvModifiersParser} from './modifier';
import {TrySynchronizedExpressionParser} from './synchronized-block';
import {
	TryRecordParametersParser,
	TsscmfvTypeInheritKeywords,
	TsscmfvTypeInheritParser,
	TsscmfvTypeKeywords,
	TsscmfvTypeParser
} from './type';
import {TsscmfvKeywordUtils} from './utils';

export type TsscmfvKeywords =
	| TsscmfvModifierKeywords
	| TsscmfvTypeKeywords | TsscmfvTypeInheritKeywords
	| TsscmfvMethodReturnTypeKeywords | TsscmfvMethodThrowsKeywords;

enum TsscmfvKeywordKind {
	Modifier, Type, TypeInherit, MfvType, MethodThrows
}

/**
 * Tsscmfv declaration starts with a keyword, which is one of following:
 * - modifiers:
 *   - abstract: type, method,
 *   - final: type, method, field,
 *   - private, protected, public, strictfp: type, constructor, method, field,
 *   - static: type, static block, method,
 *   - synchronized: synchronized block, method,
 *   - default, native: method,
 *   - non-sealed, sealed: type,
 *   - def: type, constructor, method, field, variable,
 *   - var: type (inner), field, variable,
 * - @interface, class, enum, interface, record, trait: represents a class declaration,
 * - extends, implements, permits: type,
 * - void, boolean, byte, char, double, float, int, long, short: method, field, variable,
 * - throws: constructor, method,
 * - transient, volatile: field.
 *
 * However, in order to maximize compatibility with errors that may occur when writing code,
 * the modifier keywords will be classified into the following situations during the initial parsing:
 * - sealed, non-sealed: type,
 * - default, native: method,
 * - transient, volatile: field, variable (incorrect).
 *
 * Meanwhile, how to start the parsing will also be determined by the modifier keywords,
 * 4 parser selectors which are for (1) type, (2) method, (3) field/variable and (4) accept all,
 * see {@link TsscmfvModifiersParser} for more details.
 * And there are 4 different kinds of keywords to determine what the subsequent parsing logic should be based on,
 * they are (1) type, (2) type inheriting, (3) method/field/variable (mfv) and (4) method throws.
 * These 4 types correspond to the way of starting the parsing directly when there is no modifier keyword.
 *
 * Although the parsing is carried out in a way that maximally accommodates writing errors,
 * it's still impossible to guarantee the absence of ambiguity.
 * For example, when contextual keywords appear alone, there are still semantic errors based on the completed parsing.
 * However, these issues won't be addressed here but will be dealt with during semantic diagnosis.
 * There are the following situations:
 * - sealed, record, permits, trait appear independently or together without other keywords, they are considered as expressions,
 * - non-sealed follows one of sealed, record, permits, trait,
 * - var appears independently,
 * - 8 primitive type keywords appear independently or two at a time.
 * - etc.
 *
 * At the end of all parsing, there are two ways to end a block:
 * - If the last part is a code block, end it immediately.
 * - If the last part is not a code block, look for a semicolon as the terminator within the same line (ML comment are not considered as spanning lines).
 */
export class TsscmfvDeclParser<A extends TsscmfvKeywords> extends KeywordTokenParser {
	private static Selector = new ParserSelector({
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

	/**
	 * looking for semicolon.
	 * and before end block, rewrite token id to
	 * - {@link T.FieldDecl} if in {@link T.TypeBody},
	 * - {@link T.VarDecl} if not in {@link T.TypeBody},
	 * when block token id still is {@link T.TsscmfvDecl}, because of no evidence of other kinds.
	 */
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

		const block = context.block();
		if (block.id === T.TsscmfvDecl) {
			const parent = block.parent;
			if (parent.id === T.TypeBody) {
				block.rewriteId(T.FieldDecl);
			} else {
				block.rewriteId(T.VarDecl);
			}
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
			context.rise();
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
	private tryTypeBodyAndFinalize(context: ParseContext): void {
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

		if (context.block().id === T.TypeDecl) {
			TryRecordParametersParser.instance.try(context);
		}

		TsscmfvTypeInheritParser.instance.try(context);
		if (context.block().id === T.TypeDecl) {
			this.tryTypeBodyAndFinalize(context);
			return true;
		} else {
			return false;
		}
	}

	private tryTypeAndFinalize(context: ParseContext, firstTypeToken?: AtomicToken) {
		if (!this.tryType(context, firstTypeToken)) {
			this.finalizeBlock(context);
		}
	}

	/**
	 * try to parse method body.
	 * end block when try successfully, or finalize block when try failed.
	 */
	private tryMethodBodyAndFinalize(context: ParseContext): void {
		if (TryCodeBlockParser.instanceMethodBody.try(context)) {
			context.rise();
		} else {
			this.finalizeBlock(context);
		}
	}

	private tryMethodAndFinalize(context: ParseContext): void {
		MfvTypeParser.instance.try(context);
		MfvNameParser.instance.try(context);
		TryMethodParametersParser.instance.try(context);
		TsscmfvMethodThrowsParser.instance.try(context);
		this.tryMethodBodyAndFinalize(context);
	}

	private tryMfvAndFinalize(context: ParseContext, firstMfvToken?: AtomicToken): void {
		// common part of mfv
		if (firstMfvToken != null) {
			MfvTypeParser.instance.parse(firstMfvToken, context);
		} else {
			MfvTypeParser.instance.try(context);
		}
		MfvNameParser.instance.try(context);

		// try method parameters first
		TryMethodParametersParser.instance.try(context);

		if (context.block().id === T.MethodDecl) {
			// has parameters, continue parse left part of method
			TsscmfvMethodThrowsParser.instance.try(context);
			this.tryMethodBodyAndFinalize(context);
			return;
		} else {
			// has no method parameters, try field/variable
			TsscmfvFieldOrVariableParser.instance.try(context);
			// finalize block anyway
			this.finalizeBlock(context);
		}
	}

	private tryFieldOrVariableAndFinalize(context: ParseContext): void {
		MfvTypeParser.instance.try(context);
		MfvNameParser.instance.try(context);
		TsscmfvFieldOrVariableParser.instance.try(context);
		this.finalizeBlock(context);
	}

	private afterModifiersAndFinalize(firstModifierToken: AtomicToken, context: ParseContext): void {
		TsscmfvModifiersParser.instance.parse(firstModifierToken, context);

		const block = context.block();
		switch (block.id) {
			case T.TsscmfvDecl: {
				// cannot decide which kind of tsscmfv based on parsed modifiers
				let matched = this.trySynchronizedBlock(block, context);
				// @ts-expect-error block token id might be rewritten
				if (!matched && block.id === T.MethodDecl) {
					this.tryMethodAndFinalize(context);
					break;
				}
				if (!matched) {
					matched = this.tryStaticBlock(block, context);
				}
				if (!matched) {
					matched = this.tryType(context);
				}
				if (!matched) {
					this.tryMfvAndFinalize(context);
				}
				break;
			}
			case T.TypeDecl: {
				// at least has one type modifier
				this.tryTypeAndFinalize(context);
				break;
			}
			case T.MethodDecl: {
				// at least has one method modifier
				this.tryMethodAndFinalize(context);
				break;
			}
			case T.FieldDecl:
			case T.VarDecl: {
				// at least has one field/variable modifier
				this.tryFieldOrVariableAndFinalize(context);
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
				// starts with modifier keywords
				this.afterModifiersAndFinalize(token, context);
				break;
			}
			case TsscmfvKeywordKind.Type: {
				// starts with type keywords
				// @interface, class, enum, interface, record, trait
				this.tryTypeAndFinalize(context, token);
				break;
			}
			case TsscmfvKeywordKind.TypeInherit: {
				// starts with type inherit keywords
				// extends, implements, permits
				TsscmfvTypeInheritParser.instance.parse(token, context);
				this.tryTypeBodyAndFinalize(context);
				break;
			}
			case TsscmfvKeywordKind.MfvType: {
				// starts with mfv keywords
				// void or 8 primitive type keywords
				this.tryMfvAndFinalize(context, token);
				break;
			}
			case TsscmfvKeywordKind.MethodThrows: {
				// starts with keyword throws
				TsscmfvMethodThrowsParser.instance.parse(token, context);
				this.tryMethodBodyAndFinalize(context);
				break;
			}
			default:
				throw new Error(`Tsscmfv token kind[${this._tokenKind}] is not supported.`);
		}

		return true;
	}

	static readonly instanceAtInterface = new TsscmfvDeclParser('@interface', GroovyTokenId.AT_INTERFACE);
	static readonly instanceAbstract = new TsscmfvDeclParser('abstract', GroovyTokenId.ABSTRACT);
	static readonly instanceBoolean = new TsscmfvDeclParser('boolean', GroovyTokenId.BOOLEAN);
	static readonly instanceByte = new TsscmfvDeclParser('byte', GroovyTokenId.BYTE);
	static readonly instanceChar = new TsscmfvDeclParser('char', GroovyTokenId.CHAR);
	static readonly instanceClass = new TsscmfvDeclParser('class', GroovyTokenId.CLASS);
	static readonly instanceDef = new TsscmfvDeclParser('def', GroovyTokenId.DEF);
	static readonly instanceDefault = new TsscmfvDeclParser('default', GroovyTokenId.DEFAULT);
	static readonly instanceDouble = new TsscmfvDeclParser('double', GroovyTokenId.DOUBLE);
	static readonly instanceEnum = new TsscmfvDeclParser('enum', GroovyTokenId.ENUM);
	static readonly instanceExtends = new TsscmfvDeclParser('extends', GroovyTokenId.EXTENDS);
	static readonly instanceFinal = new TsscmfvDeclParser('final', GroovyTokenId.FINAL);
	static readonly instanceFloat = new TsscmfvDeclParser('float', GroovyTokenId.FLOAT);
	static readonly instanceImplements = new TsscmfvDeclParser('implements', GroovyTokenId.IMPLEMENTS);
	static readonly instanceInt = new TsscmfvDeclParser('int', GroovyTokenId.INT);
	static readonly instanceInterface = new TsscmfvDeclParser('interface', GroovyTokenId.INTERFACE);
	static readonly instanceLong = new TsscmfvDeclParser('long', GroovyTokenId.LONG);
	static readonly instanceNative = new TsscmfvDeclParser('native', GroovyTokenId.NATIVE);
	static readonly instanceNonSealed = new TsscmfvDeclParser('non-sealed', GroovyTokenId.NON_SEALED);
	static readonly instancePermits = new TsscmfvDeclParser('permits', GroovyTokenId.PERMITS);
	static readonly instancePrivate = new TsscmfvDeclParser('private', GroovyTokenId.PRIVATE);
	static readonly instanceProtected = new TsscmfvDeclParser('protected', GroovyTokenId.PROTECTED);
	static readonly instancePublic = new TsscmfvDeclParser('public', GroovyTokenId.PUBLIC);
	static readonly instanceRecord = new TsscmfvDeclParser('record', GroovyTokenId.RECORD);
	static readonly instanceSealed = new TsscmfvDeclParser('sealed', GroovyTokenId.SEALED);
	static readonly instanceShort = new TsscmfvDeclParser('short', GroovyTokenId.SHORT);
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
	TsscmfvTDP.instanceBoolean,
	TsscmfvTDP.instanceByte,
	TsscmfvTDP.instanceChar,
	TsscmfvTDP.instanceClass,
	TsscmfvTDP.instanceDef,
	TsscmfvTDP.instanceDefault,
	TsscmfvTDP.instanceDouble,
	TsscmfvTDP.instanceEnum,
	TsscmfvTDP.instanceExtends,
	TsscmfvTDP.instanceFinal,
	TsscmfvTDP.instanceFloat,
	TsscmfvTDP.instanceImplements,
	TsscmfvTDP.instanceInt,
	TsscmfvTDP.instanceInterface,
	TsscmfvTDP.instanceLong,
	TsscmfvTDP.instanceNative,
	TsscmfvTDP.instanceNonSealed,
	TsscmfvTDP.instancePermits,
	TsscmfvTDP.instancePrivate,
	TsscmfvTDP.instanceProtected,
	TsscmfvTDP.instancePublic,
	TsscmfvTDP.instanceRecord,
	TsscmfvTDP.instanceSealed,
	TsscmfvTDP.instanceShort,
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
