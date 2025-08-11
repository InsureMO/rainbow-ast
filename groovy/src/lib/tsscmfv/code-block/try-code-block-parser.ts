import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers} from '../../comment';
import {WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {CodeBlockParser} from '../code-block';
import {TypeBodyParser} from './type-body-parser';

/**
 * annotation is allowed before code block, which is incorrect.
 */
export class TryCodeBlockParser {
	private readonly _codeBlockParser: CodeBlockParser;
	private readonly _selector: ParserSelector;

	constructor(parser: CodeBlockParser) {
		this._codeBlockParser = parser;
		this._selector = new ParserSelector({
			parsers: [
				parser,
				AnnotationDeclParser.instance, CommentParsers, WsTabNlParsers
			]
		});
	}

	// noinspection JSUnusedGlobalSymbols
	get codeBlockParser(): CodeBlockParser {
		return this._codeBlockParser;
	}

	// noinspection JSUnusedGlobalSymbols
	get selector(): ParserSelector {
		return this._selector;
	}

	try(context: ParseContext): boolean {
		let c = context.char();
		while (c != null) {
			const parser = this._selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser === this._codeBlockParser) {
				return true;
			}
			c = context.char();
		}
		return false;
	}

	static readonly instanceTypeBody = new TryCodeBlockParser(TypeBodyParser.instance);
	static readonly instanceMethodBody = new TryCodeBlockParser(CodeBlockParser.instanceMethodBody);
	static readonly instanceSynchronizedBody = new TryCodeBlockParser(CodeBlockParser.instanceSynchronizedBody);
	static readonly instanceStaticBody = new TryCodeBlockParser(CodeBlockParser.instanceStaticBody);
}