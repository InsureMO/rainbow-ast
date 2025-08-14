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

export type TryCatchFinallyBodyTokenId =
	| GroovyTokenId.TryBody
	| GroovyTokenId.CatchBody
	| GroovyTokenId.FinallyBody;

export class TryCatchFinallyBodyParser extends BySingleCharTokenParser {
	private readonly _blockTokenId: GroovyTokenId;
	protected static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (TryCatchFinallyBodyParser.Selector != null) {
			throw new Error('TryCatchFinallyBodyParser.Selector is initialized.');
		}
		TryCatchFinallyBodyParser.Selector = new ParserSelector({
			parsers: [RBraceParserInstance, ...parsers]
		});
	}

	constructor(blockTokenId: TryCatchFinallyBodyTokenId) {
		super('{');
		this._blockTokenId = blockTokenId;
	}

	protected getTokenId(): GroovyTokenId {
		return T.LBrace;
	}

	// noinspection JSUnusedGlobalSymbols
	protected getBlockTokenId(): GroovyTokenId {
		return this._blockTokenId;
	}

	protected startBlock(context: ParseContext) {
		const body = new BlockToken(this._blockTokenId, this.createToken(context));
		context.sink(body);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TryCatchFinallyBodyParser.Selector;
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

	static readonly instanceTryBody = new TryCatchFinallyBodyParser(T.TryBody);
	static readonly instanceCatchBody = new TryCatchFinallyBodyParser(T.CatchBody);
	static readonly instanceFinallyBody = new TryCatchFinallyBodyParser(T.FinallyBody);
}
