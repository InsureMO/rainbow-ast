import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {CommentParsers, MLCommentParser} from '../comment';
import {CommaParserInstance, DotParserInstance, PackageNameParser, WsTabNlParsers, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';
import {TsscmfvKeywordParser} from './tsscmfv-keywords';

export type TypeInheritKeywordParserArgs =
	| ['extends', GroovyTokenId.EXTENDS]
	| ['implements', GroovyTokenId.IMPLEMENTS]
	| ['permits', GroovyTokenId.PERMITS]

export class TypeInheritKeywordParser<A extends TypeInheritKeywordParserArgs> extends TsscmfvKeywordParser<A> {
	private static readonly EISelector: ParserSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			CommaParserInstance,
			CommentParsers,
			WsTabNlParsers
		]
	});
	private static readonly EIAfterNameSelector: ParserSelector = new ParserSelector({
		parsers: [
			DotParserInstance,
			CommaParserInstance,
			MLCommentParser.instance,
			WsTabParsers
		]
	});
	private static readonly EIAfterDotSelector: ParserSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			CommaParserInstance,
			MLCommentParser.instance,
			WsTabParsers
		]
	});
	private static readonly PSelector: ParserSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			CommaParserInstance,
			CommentParsers,
			WsTabNlParsers
		]
	});
	private static readonly PAfterNameSelector: ParserSelector = new ParserSelector({
		parsers: [
			DotParserInstance,
			CommaParserInstance,
			MLCommentParser.instance,
			WsTabParsers
		]
	});
	private static readonly PAfterDotSelector: ParserSelector = new ParserSelector({
		parsers: [
			PackageNameParser.instance,
			CommaParserInstance,
			MLCommentParser.instance,
			WsTabParsers
		]
	});

	protected getInitBlockParserSelector(): ParserSelector {
		if (this.getTokenId() === T.PERMITS) {
			return TypeInheritKeywordParser.PSelector;
		} else {
			return TypeInheritKeywordParser.EISelector;
		}
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (this.getTokenId() === T.PERMITS) {
			if (parser === PackageNameParser.instance) {
				return TypeInheritKeywordParser.PAfterNameSelector;
			} else if (parser === DotParserInstance) {
				return TypeInheritKeywordParser.PAfterDotSelector;
			} else if (parser === CommaParserInstance) {
				return TypeInheritKeywordParser.PSelector;
			} else {
				return (void 0);
			}
		} else {
			if (parser === PackageNameParser.instance) {
				return TypeInheritKeywordParser.EIAfterNameSelector;
			} else if (parser === DotParserInstance) {
				return TypeInheritKeywordParser.EIAfterDotSelector;
			} else if (parser === CommaParserInstance) {
				return TypeInheritKeywordParser.EISelector;
			} else {
				return (void 0);
			}
		}
	}

	parse(_: Char, context: ParseContext): boolean {
		return this.continue(this.createToken(context), context);
	}

	continue(token: AtomicToken, context: ParseContext): boolean {
		const block = context.block();
		if (block.id === T.TsscmfvDecl) {
			block.rewriteId(T.TypeDecl);
		}

		const decl = new BlockToken(T.TypeInheritDecl, token);
		context.sink(decl);
		context.forward(token.text.length);

		this.parseBySubParsers(context);

		context.rise();

		return true;
	}

	static readonly instanceExtends = new TypeInheritKeywordParser('extends', GroovyTokenId.EXTENDS);
	static readonly instanceImplements = new TypeInheritKeywordParser('implements', GroovyTokenId.IMPLEMENTS);
	static readonly instancePermits = new TypeInheritKeywordParser('permits', GroovyTokenId.PERMITS);
}

export const TIKP = TypeInheritKeywordParser;

export class TypeInheritParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [TIKP.instanceExtends, TIKP.instanceImplements, TIKP.instancePermits]
	});

	parse(token: AtomicToken, context: ParseContext): boolean {
		switch (token.id) {
			case T.EXTENDS: {
				TIKP.instanceExtends.continue(token, context);
				break;
			}
			case T.IMPLEMENTS: {
				TIKP.instanceImplements.continue(token, context);
				break;
			}
			case T.PERMITS: {
				TIKP.instancePermits.continue(token, context);
				break;
			}
			default:
				throw new Error(`Token[id=${T[token.id]}] not supported.`);
		}
		return this.continue(context);
	}

	continue(context: ParseContext): boolean {
		let c = context.char();
		while (c != null) {
			const parser = TypeInheritParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			c = context.char();
		}
		return true;
	}

	static readonly instance = new TypeInheritParser();
}
