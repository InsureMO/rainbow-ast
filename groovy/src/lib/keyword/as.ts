import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {IdentifierParser, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export abstract class AsParser extends KeywordTokenParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			IdentifierParser.instance,
			MLCommentParser.instance, WsTabParsers
		]
	});

	constructor() {
		super('as');
	}

	protected getTokenId(): GroovyTokenId {
		return T.AS;
	}

	protected startBlock(ch: Char, context: ParseContext): void {
		const keyword = this.createToken(ch, context);
		const decl = new BlockToken(T.AsDecl, keyword);
		context.sink(decl);
		context.forward(2);
	}

	protected abstract getInitBlockParserSelector(): ParserSelector;

	protected abstract afterChildParsed(_context: ParseContext, _parser: TokenParser): AfterChildParsed;

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}
}

export class AliasAsParser extends AsParser {
	protected getInitBlockParserSelector(): ParserSelector {
		// TODO
		return undefined;
	}

	protected afterChildParsed(_context: ParseContext, _parser: TokenParser): AfterChildParsed {
		// TODO
		return undefined;
	}

	static readonly instance = new AliasAsParser();
}