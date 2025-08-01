import {MLCommentParser} from '../comment';
import {VariableNameParser, WsTabParsers} from '../common-token';
import {AsParser} from '../keyword';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, ParserSelector, TokenParser} from '../token-parser';

/**
 * as declaration, for import declaration to assign imported class or field an alias name.
 */
export class AsAliasDeclParser extends AsParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			VariableNameParser.instance,
			MLCommentParser.instance,
			WsTabParsers
		]
	});

	protected getInitBlockParserSelector(): ParserSelector {
		return AsAliasDeclParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === VariableNameParser.instance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	static readonly instance = new AsAliasDeclParser();
}
