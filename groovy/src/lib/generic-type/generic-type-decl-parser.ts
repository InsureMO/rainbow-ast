import {BlockToken, Char} from '@rainbow-ast/core';
import {CommaParserInstance, RAngleParserInstance} from '../common-token';
import {ParseContext} from '../parse-context';
import {
	AfterChildParsed,
	BySingleCharTokenParser,
	ParserSelector,
	ParserSelectorArgs,
	TokenParser
} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class GenericTypeDeclParser extends BySingleCharTokenParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (GenericTypeDeclParser.Selector != null) {
			throw new Error('GenericTypeParser.Selector is initialized.');
		}
		GenericTypeDeclParser.Selector = new ParserSelector({
			parsers: [RAngleParserInstance, ...parsers]
		});
	}

	constructor() {
		super('<');
	}

	protected getTokenId(): GroovyTokenId {
		return T.LAngle;
	}

	protected startBlock(context: ParseContext): void {
		const params = new BlockToken(T.GenTDecl, this.createToken(context));
		context.sink(params);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return GenericTypeDeclParser.Selector;
	}

	protected whenParserNotFound(context: ParseContext): void {
		throw new Error(`No token parser found for char[${context.char()}] at [offset=${context.charIndex}, line=${context.line}, column=${context.column}].`);
	}

	/**
	 * - when meet rparen or comma, end previous {@link T.MethodParamSeg} (if exists),
	 * - create a {@link T.MethodParamSeg} block when current block is not {@link T.MethodParamSeg}.
	 */
	protected beforeChildParsed(context: ParseContext, parser: TokenParser) {
		if (parser === RAngleParserInstance || parser === CommaParserInstance) {
			const block = context.block();
			if (block.id === T.GenTVarSeg) {
				context.rise();
			}
		} else {
			const block = context.block();
			if (block.id !== T.GenTVarSeg) {
				const decl = new BlockToken(T.GenTVarSeg);
				context.sink(decl);
			}
		}
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === RAngleParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new GenericTypeDeclParser();
}
