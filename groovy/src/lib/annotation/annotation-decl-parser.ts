import {BlockToken, Char} from '@rainbow-ast/core';
import {CommentParsers, MLCommentParser} from '../comment';
import {
	DotParserInstance,
	IsAfterDot,
	NewlineParsers,
	PackageNameParser,
	WsTabNlParsers,
	WsTabParsers
} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, BySingleCharTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';
import {AnnotationParametersParser} from './annotation-parameters-parser';

export class AnnotationDeclParser extends BySingleCharTokenParser {
	private static readonly Selector = new ParserSelector({
		parsers: [PackageNameParser.instance, MLCommentParser.instance, WsTabParsers]
	});
	private static readonly AfterNameSelector = new ParserSelector({
		parsers: [DotParserInstance, AnnotationParametersParser.instance, CommentParsers, WsTabNlParsers]
	});
	private static readonly AfterDotSelector = new ParserSelector({
		parsers: [PackageNameParser.instance, MLCommentParser.instance, WsTabParsers]
	});
	private static readonly AfterNewLineSelector = new ParserSelector({
		parsers: [AnnotationParametersParser.instance, CommentParsers, WsTabNlParsers]
	});

	constructor() {
		super('@');
	}

	protected getTokenId(): GroovyTokenId {
		return T.At;
	}

	isAvailable(context: ParseContext): boolean {
		return !IsAfterDot(context);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	protected startBlock(context: ParseContext) {
		const params = new BlockToken(T.AnnoDecl, this.createToken(context));
		context.sink(params);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return AnnotationDeclParser.Selector;
	}

	protected afterChildParsed(context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === PackageNameParser.instance) {
			return AnnotationDeclParser.AfterNameSelector;
		} else if (parser === DotParserInstance) {
			return AnnotationDeclParser.AfterDotSelector;
		} else if (parser === AnnotationParametersParser.instance) {
			return 'break';
			// @ts-expect-error ignore the type check
		} else if (NewlineParsers.includes(parser)) {
			// if there is no annotation name parsed, end
			const block = context.block();
			const children = block.children ?? [];
			if (children.length > 1 && children.some(c => c.id === T.Identifier)) {
				return AnnotationDeclParser.AfterNewLineSelector;
			} else {
				return 'break';
			}
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new AnnotationDeclParser();
}
