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
import {TsscmfvKeywordUtils} from './utils';

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
			throw new Error('GsBraceInterpolationParser.Selector is initialized.');
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
		if (block.id === T.TsscmfvDecl) {
			const firstChildOfTsscmfv = block.children[0];
			if (firstChildOfTsscmfv.id === T.ModifierDecl) {
				const modifierTokens = (firstChildOfTsscmfv as BlockToken).children?.filter(c => TsscmfvKeywordUtils.isModifierKeyword(c.id)) ?? [];
				const staticToken = modifierTokens.filter(t => t.id === T.STATIC);
				if (staticToken.length === modifierTokens.length) {
					// only static keyword exists, no matter one or more
					block.rewriteId(T.StaticBlockDecl);
					const body = new BlockToken(T.StaticBody, this.createToken(context));
					context.sink(body);
					context.forward(1);
				} else {
					// TODO only def keyword?
					const body = new BlockToken(T.TypeBody, this.createToken(context));
					context.sink(body);
					context.forward(1);
				}
			} else {
				// never happen
				throw new Error(`Unpredicted token[${T[firstChildOfTsscmfv.id]}] of Tsscmfv block.`);
			}
		} else if (block.id === T.TypeDecl) {
			const body = new BlockToken(T.TypeBody, this.createToken(context));
			context.sink(body);
			context.forward(1);
		} else {
			throw new Error(`Cannot start code block under block[${T[block.id]}].`);
		}
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
