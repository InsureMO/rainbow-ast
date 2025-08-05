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
import {TsscmfvKeywordUtils} from './tsscmfv-utils';

export class TsscmfvCodeBlockRBraceParser extends BySingleCharTokenParser {
	constructor() {
		super('}');
	}

	protected getTokenId(): GroovyTokenId {
		return T.RBrace;
	}

	static readonly instance = new TsscmfvCodeBlockRBraceParser();
}

export class TsscmfvCodeBlockParser extends BySingleCharTokenParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (TsscmfvCodeBlockParser.Selector != null) {
			throw new Error('TsscmfvCodeBlockParser.Selector is initialized.');
		}
		TsscmfvCodeBlockParser.Selector = new ParserSelector({
			parsers: [
				TsscmfvCodeBlockRBraceParser.instance,
				...parsers
			]
		});
	}

	constructor() {
		super('{');
	}

	protected getTokenId(): GroovyTokenId {
		return T.LBrace;
	}

	protected startBlock(context: ParseContext) {
		const block = context.block();
		let body: BlockToken;
		switch (block.id) {
			case T.TsscmfvDecl: {
				// not changed to TypeDecl, means there is neither type keyword nor type inherit keyword appeared
				const modifierTokens = TsscmfvKeywordUtils.getModifierTokens(block);
				if (modifierTokens.length === 0) {
					// never happen
					throw new Error(`No ${T[T.ModifierDecl]} token found from ${T[T.TsscmfvDecl]} block[start=${block.start}, line=${block.line}, column=${block.column}].`);
				} else if (TsscmfvKeywordUtils.onlyStaticKeywords(modifierTokens)) {
					// only static keyword exists, no matter one or more
					block.rewriteId(T.StaticBlockDecl);
					body = new BlockToken(T.StaticBody, this.createToken(context));
				} else if (TsscmfvKeywordUtils.onlySynchronizedKeywords(modifierTokens)) {
					block.rewriteId(T.SyncBlockDecl);
					body = new BlockToken(T.SyncBody, this.createToken(context));
				} else {
					// TODO only def keyword?
					body = new BlockToken(T.TypeBody, this.createToken(context));
				}
				break;
			}
			case T.TypeDecl: {
				body = new BlockToken(T.TypeBody, this.createToken(context));
				break;
			}
			case T.StaticBlockDecl: {
				body = new BlockToken(T.StaticBody, this.createToken(context));
				break;
			}
			case T.SyncBlockDecl: {
				body = new BlockToken(T.SyncBlockDecl, this.createToken(context));
				break;
			}
			default: {
				throw new Error(`Cannot start code block under block[${T[block.id]}].`);
			}
		}

		context.sink(body);
		context.forward(1);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TsscmfvCodeBlockParser.Selector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === TsscmfvCodeBlockRBraceParser.instance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new TsscmfvCodeBlockParser();
}
