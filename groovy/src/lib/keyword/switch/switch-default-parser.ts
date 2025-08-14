import {BlockToken, Char} from '@rainbow-ast/core';
import {ColonParserInstance} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {
	AfterChildParsed,
	KeywordTokenParser,
	ParserSelector,
	ParserSelectorArgs,
	TokenParser
} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';

export class SwitchDefaultParser extends KeywordTokenParser {
	private static Selector: ParserSelector;
	private static AfterColonSelector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (SwitchDefaultParser.Selector != null
			|| SwitchDefaultParser.AfterColonSelector != null) {
			throw new Error('SwitchDefaultParser.Selector is initialized.');
		}
		SwitchDefaultParser.Selector = new ParserSelector({parsers: [ColonParserInstance, ...parsers]});
		SwitchDefaultParser.AfterColonSelector = new ParserSelector({parsers});
	}

	protected constructor() {
		super('default');
	}

	protected getTokenId(): GroovyTokenId {
		return T.DEFAULT;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const decl = new BlockToken(T.SwitchDefaultBlk, keyword);
		context.sink(decl);
		context.forward(4);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return SwitchDefaultParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === ColonParserInstance) {
			return SwitchDefaultParser.AfterColonSelector;
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new SwitchDefaultParser();
}
