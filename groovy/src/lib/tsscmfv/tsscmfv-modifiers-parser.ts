import {AtomicToken, BlockToken} from '@rainbow-ast/core';
import {CommentParsers} from '../comment';
import {WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ParserSelector, ParserSelectorArgs} from '../token-parser';
import {T} from '../tokens';
import {TsscmfvMKP} from './tsscmfv-modifier-keywords';

export class TsscmfvModifiersParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (TsscmfvModifiersParser.Selector != null) {
			throw new Error('ModifiersParser.Selector is initialized.');
		}
		TsscmfvModifiersParser.Selector = new ParserSelector({parsers});
	}

	parse(token: AtomicToken, context: ParseContext): boolean {
		let parentBlock: BlockToken;
		const block = context.block();
		if (block.id !== T.TsscmfvDecl) {
			const decl = new BlockToken(T.TsscmfvDecl);
			context.sink(decl);
			parentBlock = decl;
		} else {
			parentBlock = block;
		}
		if (token.id === T.SEALED || token.id === T.NON_SEALED) {
			if (parentBlock.id !== T.TypeDecl) {
				parentBlock.rewriteId(T.TypeDecl);
			}
		}
		const modifiers = new BlockToken(T.ModifierDecl, token);
		context.sink(modifiers);
		context.forward(token.text.length);

		let c = context.char();
		while (c != null) {
			const parser = TsscmfvModifiersParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser === TsscmfvMKP.instanceSealed || parser === TsscmfvMKP.instanceNonSealed) {
				if (parentBlock.id !== T.TypeDecl) {
					parentBlock.rewriteId(T.TypeDecl);
				}
			}
			c = context.char();
		}

		context.rise();
		return true;
	}

	static readonly instance = new TsscmfvModifiersParser();
}

TsscmfvModifiersParser.initSelector([
	TsscmfvMKP.instanceAbstract, TsscmfvMKP.instanceFinal, TsscmfvMKP.instanceStatic, TsscmfvMKP.instanceStrictfp,
	TsscmfvMKP.instanceDef,
	TsscmfvMKP.instancePrivate, TsscmfvMKP.instanceProtected, TsscmfvMKP.instancePublic,
	TsscmfvMKP.instanceSealed, TsscmfvMKP.instanceNonSealed,
	TsscmfvMKP.instanceSynchronized,
	CommentParsers,
	WsTabNlParsers
]);
