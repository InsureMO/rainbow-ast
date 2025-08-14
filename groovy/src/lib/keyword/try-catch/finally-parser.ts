import {BlockToken, Char} from '@rainbow-ast/core';
import {CommentParsers} from '../../comment';
import {SemicolonParserInstance, WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {AfterChildParsed, KeywordTokenParser, ParserSelector, TokenParser} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';
import {TryCatchFinallyBodyParser} from './body-parser';

export class FinallyParser extends KeywordTokenParser {
	private static readonly Selector = new ParserSelector({
		parsers: [
			TryCatchFinallyBodyParser.instanceCatchBody,
			SemicolonParserInstance,
			CommentParsers, WsTabNlParsers
		]
	});

	protected constructor() {
		super('finally');
	}

	protected getTokenId(): GroovyTokenId {
		return T.FINALLY;
	}

	protected startBlock(context: ParseContext): void {
		const keyword = this.createToken(context);
		const block = context.block();
		if (block.id !== T.TryCatchStat) {
			context.sink(new BlockToken(T.TryCatchStat));
		}
		const decl = new BlockToken(T.FinallyStat, keyword);
		context.sink(decl);
		context.forward(7);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return FinallyParser.Selector;
	}

	protected afterChildParsed(_context: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === TryCatchFinallyBodyParser.instanceCatchBody) {
			return 'break';
		} else if (parser === SemicolonParserInstance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.parseAsBlock(ch, context);
		const block = context.block();
		if (block.children[0].id === T.FinallyStat) {
			// the try-catch statement is started with finally keyword, close it immediately
			// no matter what follows
			context.rise();
		}
		return;
	}

	static readonly instance = new FinallyParser();
}
