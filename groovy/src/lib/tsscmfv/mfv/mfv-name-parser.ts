import {CommentParsers} from '../../comment';
import {IdentifierParser, WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {StringParsers} from '../../string-literal';
import {ParserSelector} from '../../token-parser';

export class MfvNameParser {
	private static readonly Selector = new ParserSelector({
		parsers: [
			IdentifierParser.instance, StringParsers,
			CommentParsers, WsTabNlParsers
		]
	});

	try(context: ParseContext): void {
		const selector = MfvNameParser.Selector;
		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			// @ts-expect-error ignore the type check when perform includes function
			if (parser === IdentifierParser.instance || StringParsers.includes(parser)) {
				break;
			}
			c = context.char();
		}
	}

	static readonly instance = new MfvNameParser();
}
