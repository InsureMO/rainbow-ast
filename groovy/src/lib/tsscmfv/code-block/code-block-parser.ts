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

export type CodeBlockTokenId =
	| GroovyTokenId.TypeBody
	| GroovyTokenId.MethodBody
	| GroovyTokenId.StaticBody
	| GroovyTokenId.SyncBody;

export class CodeBlockParser extends BySingleCharTokenParser {
	private readonly _blockTokenId: GroovyTokenId;
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (CodeBlockParser.Selector != null) {
			throw new Error('CodeBlockParser.Selector is initialized.');
		}
		CodeBlockParser.Selector = new ParserSelector({
			parsers: [RBraceParserInstance, ...parsers]
		});
	}

	constructor(blockTokenId: CodeBlockTokenId) {
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
		return CodeBlockParser.Selector;
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

	static readonly instanceTypeBody = new CodeBlockParser(T.TypeBody);
	static readonly instanceMethodBody = new CodeBlockParser(T.MethodBody);
	static readonly instanceSynchronizedBody = new CodeBlockParser(T.SyncBody);
	static readonly instanceStaticBody = new CodeBlockParser(T.StaticBody);
}
