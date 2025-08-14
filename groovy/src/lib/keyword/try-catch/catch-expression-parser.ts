import {BlockToken, Char} from '@rainbow-ast/core';
import {PipeParserInstance, RParenParserInstance} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {
	AfterChildParsed,
	BySingleCharTokenParser,
	ParserSelector,
	ParserSelectorArgs,
	TokenParser
} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';

export class CatchExpressionParser extends BySingleCharTokenParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (CatchExpressionParser.Selector != null) {
			throw new Error('CatchExpressionParser.Selector is initialized.');
		}
		CatchExpressionParser.Selector = new ParserSelector({
			parsers: [PipeParserInstance, RParenParserInstance, ...parsers]
		});
	}

	constructor() {
		super('(');
	}

	protected getTokenId(): GroovyTokenId {
		return T.LParen;
	}

	protected startBlock(context: ParseContext) {
		const expr = new BlockToken(T.CatchExprBlk, this.createToken(context));
		context.sink(expr);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return CatchExpressionParser.Selector;
	}

	protected beforeChildParsed(context: ParseContext, parser: TokenParser) {
		if (parser === RParenParserInstance || parser === PipeParserInstance) {
			const block = context.block();
			if (block.id === T.CatchExSeg) {
				context.rise();
			}
		} else {
			const block = context.block();
			if (block.id !== T.CatchExSeg) {
				const decl = new BlockToken(T.CatchExSeg);
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

	static readonly instance = new CatchExpressionParser();
}
