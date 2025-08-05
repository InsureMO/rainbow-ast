import {BlockToken, Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {
	AfterChildParsed,
	BySingleCharTokenParser,
	ParserSelector,
	ParserSelectorArgs,
	TokenParser
} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class TsscmfvSynchronizedExpressionRParenParser extends BySingleCharTokenParser {
	constructor() {
		super(')');
	}

	protected getTokenId(): GroovyTokenId {
		return T.RParen;
	}

	static readonly instance = new TsscmfvSynchronizedExpressionRParenParser();
}

export class TsscmfvSynchronizedExpressionParser extends BySingleCharTokenParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (TsscmfvSynchronizedExpressionParser.Selector != null) {
			throw new Error('SynchronizedExpressionParser.Selector is initialized.');
		}
		TsscmfvSynchronizedExpressionParser.Selector = new ParserSelector({
			parsers: [
				TsscmfvSynchronizedExpressionRParenParser.instance,
				...parsers
			]
		});
	}

	constructor() {
		super('(');
	}

	protected getTokenId(): GroovyTokenId {
		return T.LParen;
	}

	protected startBlock(context: ParseContext) {
		const expr = new BlockToken(T.SyncExpr, this.createToken(context));
		context.sink(expr);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TsscmfvSynchronizedExpressionParser.Selector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === TsscmfvSynchronizedExpressionRParenParser.instance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new TsscmfvSynchronizedExpressionParser();
}

export class TsscmfvSyncExprParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [TsscmfvSynchronizedExpressionParser.instance]
	});

	continue(context: ParseContext): boolean {
		const block = context.block();
		block.rewriteId(T.SyncExpr);

		const c = context.char();
		if (c != null) {
			const parser = TsscmfvSyncExprParser.Selector.find(c, context);
			if (parser != null) {
				parser.parse(c, context);
			}
		}
		return true;
	}

	static readonly instance = new TsscmfvSyncExprParser();
}