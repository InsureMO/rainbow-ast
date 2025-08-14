import {BlockToken, Char} from '@rainbow-ast/core';
import {RParenParserInstance, SemicolonParserInstance} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {
	AfterChildParsed,
	BySingleCharTokenParser,
	ParserSelector,
	ParserSelectorArgs,
	TokenParser
} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';

export class TryExpressionParser extends BySingleCharTokenParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (TryExpressionParser.Selector != null) {
			throw new Error('TryExpressionParser.Selector is initialized.');
		}
		TryExpressionParser.Selector = new ParserSelector({
			parsers: [RParenParserInstance, ...parsers]
		});
	}

	constructor() {
		super('(');
	}

	protected getTokenId(): GroovyTokenId {
		return T.LParen;
	}

	protected startBlock(context: ParseContext) {
		const expr = new BlockToken(T.TryExprBlk, this.createToken(context));
		context.sink(expr);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TryExpressionParser.Selector;
	}

	protected beforeChildParsed(context: ParseContext, parser: TokenParser) {
		if (parser === RParenParserInstance || parser === SemicolonParserInstance) {
			const block = context.block();
			if (block.id === T.TryResSeg) {
				context.rise();
			}
		} else {
			const block = context.block();
			if (block.id !== T.TryResSeg) {
				const decl = new BlockToken(T.TryResSeg);
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

	static readonly instance = new TryExpressionParser();
}
