import {BlockToken, Char} from '@rainbow-ast/core';
import {RParenParserInstance} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {
	AfterChildParsed,
	BySingleCharTokenParser,
	ParserSelector,
	ParserSelectorArgs,
	TokenParser
} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';

export class SwitchExpressionParser extends BySingleCharTokenParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (SwitchExpressionParser.Selector != null) {
			throw new Error('SwitchExpressionParser.Selector is initialized.');
		}
		SwitchExpressionParser.Selector = new ParserSelector({
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
		const expr = new BlockToken(T.SwitchExprBlk, this.createToken(context));
		context.sink(expr);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return SwitchExpressionParser.Selector;
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

	static readonly instance = new SwitchExpressionParser();
}
