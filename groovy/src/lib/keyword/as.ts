import {BlockToken, Char} from '@rainbow-ast/core';
import {MLCommentParser} from '../comment';
import {TypeDeclNameParser, VariableNameParser, WsTabParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export abstract class AsParser extends KeywordTokenParser {
	protected constructor() {
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

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}
}

/**
 * as declaration, for import declaration to assign imported class or field an alias name.
 */
export class AliasAsParser extends AsParser {
	private static readonly Selector: ParserSelector = new ParserSelector({
		parsers: [
			VariableNameParser.instance,
			MLCommentParser.instance, WsTabParsers
		]
	});

	protected getInitBlockParserSelector(): ParserSelector {
		return AliasAsParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === TypeDeclNameParser.instance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	static readonly instance = new AliasAsParser();
}

// TODO TypeAsParser
