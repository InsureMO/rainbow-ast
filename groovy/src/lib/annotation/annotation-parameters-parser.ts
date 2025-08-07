import {BlockToken, Char} from '@rainbow-ast/core';
import {CommaParserInstance, RParenParserInstance} from '../common-token';
import {ParseContext} from '../parse-context';
import {
	AfterChildParsed,
	BySingleCharTokenParser,
	ParserSelector,
	ParserSelectorArgs,
	TokenParser
} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class AnnotationParametersParser extends BySingleCharTokenParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (AnnotationParametersParser.Selector != null) {
			throw new Error('AnnotationParametersParser.Selector is initialized.');
		}
		AnnotationParametersParser.Selector = new ParserSelector({
			parsers: [RParenParserInstance, ...parsers]
		});
	}

	constructor() {
		super('(');
	}

	protected getTokenId(): GroovyTokenId {
		return T.LParen;
	}

	protected startBlock(context: ParseContext): void {
		const params = new BlockToken(T.AnnoParamsBlk, this.createToken(context));
		context.sink(params);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return AnnotationParametersParser.Selector;
	}

	protected whenParserNotFound(context: ParseContext): void {
		throw new Error(`No token parser found for char[${context.char()}] at [offset=${context.charIndex}, line=${context.line}, column=${context.column}].`);
	}

	/**
	 * - when meet rparen or comma, end previous {@link T.MethodParamSeg} (if exists),
	 * - create a {@link T.MethodParamSeg} block when current block is not {@link T.MethodParamSeg}.
	 */
	protected beforeChildParsed(context: ParseContext, parser: TokenParser) {
		if (parser === RParenParserInstance || parser === CommaParserInstance) {
			const block = context.block();
			if (block.id === T.AnnoParamSeg) {
				context.rise();
			}
		} else {
			const block = context.block();
			if (block.id !== T.AnnoParamSeg) {
				const decl = new BlockToken(T.AnnoParamSeg);
				context.sink(decl);
			}
		}
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === RParenParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new AnnotationParametersParser();
}
