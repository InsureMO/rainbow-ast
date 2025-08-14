import {BlockToken, Char} from '@rainbow-ast/core';
import {RBraceParserInstance} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {
	AfterChildParsed,
	BySingleCharTokenParser,
	ParserSelector,
	ParserSelectorArgs,
	TokenParser
} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';
import {SwitchCaseParser} from './switch-case-parser';
import {SwitchDefaultParser} from './switch-default-parser';

export class SwitchBodyParser extends BySingleCharTokenParser {
	protected static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (SwitchBodyParser.Selector != null) {
			throw new Error('SwitchBodyParser.Selector is initialized.');
		}
		SwitchBodyParser.Selector = new ParserSelector({
			parsers: [
				SwitchCaseParser.instance, SwitchDefaultParser.instance,
				RBraceParserInstance, ...parsers
			]
		});
	}

	constructor() {
		super('{');
	}

	protected getTokenId(): GroovyTokenId {
		return T.LBrace;
	}

	protected startBlock(context: ParseContext) {
		const body = new BlockToken(T.SwitchBody, this.createToken(context));
		context.sink(body);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return SwitchBodyParser.Selector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === RBraceParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new SwitchBodyParser();
}
