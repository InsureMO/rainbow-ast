import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {ClassNameParser, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export abstract class AsParser extends KeywordTokenParser {
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
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			ClassNameParser.instance,
			MLCommentParser.instance, WsTabParsers
		]
	});

	protected getInitBlockParserSelector(): ParserSelector {
		return AliasAsParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === ClassNameParser.instance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	static readonly instance = new AliasAsParser();
}

// TODO TypeAsParser
