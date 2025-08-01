import {AtomicToken, BlockToken, Char, Token} from '@rainbow-ast/core';
import {CommentParsers} from '../comment';
import {SemicolonParserInstance, TypeDeclNameParser, WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {TA} from '../token-attributes';
import {KeywordTokenParser, ParserSelector, ParserSelectorArgs, SingleKeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

class ModifiersParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (ModifiersParser.Selector != null) {
			throw new Error('ModifiersParser.Selector is initialized.');
		}
		ModifiersParser.Selector = new ParserSelector({parsers});
	}

	parse(token: AtomicToken, context: ParseContext): boolean {
		const block = context.block();
		if (block.id !== T.TsscmfvDecl) {
			const decl = new BlockToken(T.TsscmfvDecl);
			context.sink(decl);
		}
		const modifiers = new BlockToken(T.Modifiers, token);
		context.sink(modifiers);
		context.forward(token.text.length);

		let c = context.char();
		while (c != null) {
			const parser = ModifiersParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			c = context.char();
		}

		context.rise();
		return true;
	}

	static readonly instance = new ModifiersParser();
}

interface TypeParserArgs {
	Start: ParserSelectorArgs['parsers'];
	Started: ParserSelectorArgs['parsers'];
	AfterName: ParserSelectorArgs['parsers'];
}

class TypeParser {
	private static StartSelector: ParserSelector;
	private static StartedSelector: ParserSelector;
	private static AfterNameSelector: ParserSelector;

	static initSelector(parsers: TypeParserArgs) {
		if (TypeParser.StartSelector != null
			|| TypeParser.StartedSelector != null
			|| TypeParser.AfterNameSelector != null) {
			throw new Error('TypeParser.Selector is initialized.');
		}
		TypeParser.StartSelector = new ParserSelector({parsers: parsers.Start});
		TypeParser.StartedSelector = new ParserSelector({parsers: parsers.Started});
		TypeParser.AfterNameSelector = new ParserSelector({parsers: parsers.AfterName});
	}

	private writeTypeKind(block: Token, child: Token): void {
		if (block.hasAttr(TA.TypeKind)) {
			return;
		}
		switch (child.id) {
			case T.AT_INTERFACE:
			case T.CLASS:
			case T.ENUM:
			case T.INTERFACE:
			case T.RECORD:
			case T.TRAIT: {
				block.setAttr(TA.TypeKind, child.id);
				break;
			}
			default: {
				throw new Error(`Unknown type kind[${child.id}].`);
			}
		}
	}

	private subsequent(selector: ParserSelector, context: ParseContext): void {
		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser instanceof TsscmfvKeywordParser) {
				const block = context.block();
				if (block.id === T.TsscmfvDecl) {
					block.rewriteId(T.TypeDecl);
				}
				const token = block.children[block.children.length - 1];
				this.writeTypeKind(block, token);
				selector = TypeParser.StartedSelector;
			} else if (parser === TypeDeclNameParser.instance) {
				selector = TypeParser.AfterNameSelector;
			}
			c = context.char();
		}
	}

	parse(token: AtomicToken, context: ParseContext): boolean {
		const block = context.block();
		if (block.id === T.TsscmfvDecl) {
			block.rewriteId(T.TypeDecl);
			context.collect(token);
		} else {
			const decl = new BlockToken(T.TypeDecl, token);
			context.sink(decl);
		}
		context.forward(token.text.length);
		this.writeTypeKind(block, token);

		this.subsequent(TypeParser.StartedSelector, context);

		return true;
	}

	continue(context: ParseContext): boolean {
		this.subsequent(TypeParser.StartSelector, context);
		return true;
	}

	static readonly instance = new TypeParser();
}

class TypeInheritParser {
	parse(token: AtomicToken, context: ParseContext): boolean {
		// TODO
		return true;
	}

	continue(context: ParseContext): boolean {
		// TODO
		return true;
	}

	static readonly instance = new TypeInheritParser();
}

type TsscmfvParserArgs =
	| ['@interface', GroovyTokenId.AT_INTERFACE]
	| ['abstract', GroovyTokenId.ABSTRACT]
	| ['class', GroovyTokenId.CLASS]
	| ['def', GroovyTokenId.DEF]
	| ['enum', GroovyTokenId.ENUM]
	| ['extends', GroovyTokenId.EXTENDS]
	| ['final', GroovyTokenId.FINAL]
	| ['implements', GroovyTokenId.IMPLEMENTS]
	| ['interface', GroovyTokenId.INTERFACE]
	| ['non-sealed', GroovyTokenId.NON_SEALED]
	| ['private', GroovyTokenId.PRIVATE]
	| ['protected', GroovyTokenId.PROTECTED]
	| ['public', GroovyTokenId.PUBLIC]
	| ['record', GroovyTokenId.RECORD]
	| ['sealed', GroovyTokenId.SEALED]
	| ['static', GroovyTokenId.STATIC]
	| ['strictfp', GroovyTokenId.STRICTFP]
	| ['trait', GroovyTokenId.TRAIT];

enum TsscmfvKeywordKind {
	Modifier, Type, Inherit,
}

export class TsscmfvDeclParser<A extends TsscmfvParserArgs> extends KeywordTokenParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [
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
		if (this.isModifierKeyword()) {
			this._tokenKind = TsscmfvKeywordKind.Modifier;
		} else if (this.isTypeKeyword()) {
			this._tokenKind = TsscmfvKeywordKind.Type;
		} else if (this.isInheritKeyword()) {
			this._tokenKind = TsscmfvKeywordKind.Inherit;
		} else {
			throw new Error(`Tsscmfv keyword[${keyword}] is not supported.`);
		}
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	protected getTokenKind(): TsscmfvKeywordKind {
		return this._tokenKind;
	}

	private isTypeKeyword() {
		return [T.AT_INTERFACE, T.CLASS, T.ENUM, T.INTERFACE, T.RECORD, T.TRAIT].includes(this._tokenId);
	}

	private isInheritKeyword() {
		return [T.EXTENDS, T.IMPLEMENTS, T.PERMITS].includes(this._tokenId);
	}

	private isModifierKeyword() {
		return [
			T.ABSTRACT, T.FINAL, T.STATIC, T.STRICTFP,
			T.DEF,
			T.NON_SEALED, T.SEALED,
			T.PRIVATE, T.PROTECTED, T.PUBLIC
		].includes(this._tokenId);
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

	parse(ch: Char, context: ParseContext): boolean {
		const token = this.createToken(ch, context);

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

class TsscmfvKeywordParser<A extends TsscmfvParserArgs> extends SingleKeywordTokenParser {
	private readonly _tokenId: A[1];

	constructor(keyword: A[0], tokenId: A[1]) {
		super(keyword);
		this._tokenId = tokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	static readonly instanceAtInterface = new TsscmfvKeywordParser('@interface', GroovyTokenId.AT_INTERFACE);
	static readonly instanceAbstract = new TsscmfvKeywordParser('abstract', GroovyTokenId.ABSTRACT);
	static readonly instanceClass = new TsscmfvKeywordParser('class', GroovyTokenId.CLASS);
	static readonly instanceDef = new TsscmfvKeywordParser('def', GroovyTokenId.DEF);
	static readonly instanceEnum = new TsscmfvKeywordParser('enum', GroovyTokenId.ENUM);
	static readonly instanceExtends = new TsscmfvKeywordParser('extends', GroovyTokenId.EXTENDS);
	static readonly instanceFinal = new TsscmfvKeywordParser('final', GroovyTokenId.FINAL);
	static readonly instanceImplements = new TsscmfvKeywordParser('implements', GroovyTokenId.IMPLEMENTS);
	static readonly instanceInterface = new TsscmfvKeywordParser('interface', GroovyTokenId.INTERFACE);
	static readonly instanceNonSealed = new TsscmfvKeywordParser('non-sealed', GroovyTokenId.NON_SEALED);
	static readonly instancePrivate = new TsscmfvKeywordParser('private', GroovyTokenId.PRIVATE);
	static readonly instanceProtected = new TsscmfvKeywordParser('protected', GroovyTokenId.PROTECTED);
	static readonly instancePublic = new TsscmfvKeywordParser('public', GroovyTokenId.PUBLIC);
	static readonly instanceRecord = new TsscmfvKeywordParser('record', GroovyTokenId.RECORD);
	static readonly instanceSealed = new TsscmfvKeywordParser('sealed', GroovyTokenId.SEALED);
	static readonly instanceStatic = new TsscmfvKeywordParser('static', GroovyTokenId.STATIC);
	static readonly instanceStrictfp = new TsscmfvKeywordParser('strictfp', GroovyTokenId.STRICTFP);
	static readonly instanceTrait = new TsscmfvKeywordParser('trait', GroovyTokenId.TRAIT);
}

const TKP = TsscmfvKeywordParser;

ModifiersParser.initSelector([
	TKP.instanceAbstract, TKP.instanceFinal, TKP.instanceStatic, TKP.instanceStrictfp,
	TKP.instanceDef,
	TKP.instancePrivate, TKP.instanceProtected, TKP.instancePublic,
	TKP.instanceSealed, TKP.instanceNonSealed,
	CommentParsers,
	WsTabNlParsers
]);
TypeParser.initSelector({
	Start: [
		TKP.instanceAtInterface, TKP.instanceClass, TKP.instanceEnum, TKP.instanceInterface, TKP.instanceRecord, TKP.instanceTrait,
		CommentParsers,
		WsTabNlParsers
	],
	Started: [
		TypeDeclNameParser.instance,
		TKP.instanceAtInterface, TKP.instanceClass, TKP.instanceEnum, TKP.instanceInterface, TKP.instanceRecord, TKP.instanceTrait,
		CommentParsers,
		WsTabNlParsers
	],
	AfterName: [
		TypeDeclNameParser.instance,
		CommentParsers,
		WsTabNlParsers
	]
});
