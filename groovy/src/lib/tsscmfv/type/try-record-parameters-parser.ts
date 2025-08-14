import {CommentParsers} from '../../comment';
import {WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {RecordParametersParser} from './record-parameters-parser';

export class TryRecordParametersParser {
	private static Selector = new ParserSelector({
		parsers: [RecordParametersParser.instance, CommentParsers, WsTabNlParsers]
	});

	try(context: ParseContext): void {
		const c = context.char();
		if (c != null) {
			const parser = TryRecordParametersParser.Selector.find(c, context);
			if (parser != null) {
				parser.parse(c, context);
			}
		}
	}

	static readonly instance = new TryRecordParametersParser();
}
