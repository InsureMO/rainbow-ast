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

export class SwitchCaseParser extends KeywordTokenParser {
	private static Selector: ParserSelector;
	private static AfterColonSelector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (SwitchCaseParser.Selector != null
			|| SwitchCaseParser.AfterColonSelector != null) {
			throw new Error('SwitchCaseParser.Selector is initialized.');
		}
		SwitchCaseParser.Selector = new ParserSelector({parsers: [ColonParserInstance, ...parsers]});
		SwitchCaseParser.AfterColonSelector = new ParserSelector({parsers});
	}

	protected constructor() {
		super('case');
	}

	protected getTokenId(): GroovyTokenId {
		return T.CASE;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const decl = new BlockToken(T.SwitchCaseBlk, keyword);
		context.sink(decl);
		context.forward(4);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return SwitchCaseParser.Selector;
	}

	protected beforeChildParsed(context: ParseContext, parser: TokenParser): void {
		if (parser === ColonParserInstance) {
			const block = context.block();
			if (block.id === T.SwitchCaseExprSeg) {
				context.rise();
			}
		} else {
			const block = context.block();
			if (block.id !== T.SwitchCaseExprSeg) {
				context.sink(new BlockToken(T.SwitchCaseExprSeg));
			}
		}
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === ColonParserInstance) {
			return SwitchCaseParser.AfterColonSelector;
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.parseAsBlock(ch, context);
		const block = context.block();
		if (block.id === T.SwitchCaseBlk) {
			context.rise();
		}
		return true;
	}

	static readonly instance = new SwitchCaseParser();
}
