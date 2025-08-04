import {AtomicToken, BlockToken} from '@rainbow-ast/core';
import {CommentParsers} from '../comment';
import {WsTabNlParsers} from '../common-token';
import {ParseContext} from '../parse-context';
import {ParserSelector, ParserSelectorArgs} from '../token-parser';
import {T} from '../tokens';
import {MKP} from './modifier-keywords';

export class ModifiersParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (ModifiersParser.Selector != null) {
			throw new Error('ModifiersParser.Selector is initialized.');
		}
		ModifiersParser.Selector = new ParserSelector({parsers});
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
		const modifiers = new BlockToken(T.Modifiers, token);
		context.sink(modifiers);
		context.forward(token.text.length);

		let c = context.char();
		while (c != null) {
			const parser = ModifiersParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			if (parser === MKP.instanceSealed || parser === MKP.instanceNonSealed) {
				if (parentBlock.id !== T.TypeDecl) {
					parentBlock.rewriteId(T.TypeDecl);
				}
			}
			c = context.char();
		}

		context.rise();
		return true;
	}

	static readonly instance = new ModifiersParser();
}

ModifiersParser.initSelector([
	MKP.instanceAbstract, MKP.instanceFinal, MKP.instanceStatic, MKP.instanceStrictfp,
	MKP.instanceDef,
	MKP.instancePrivate, MKP.instanceProtected, MKP.instancePublic,
	MKP.instanceSealed, MKP.instanceNonSealed,
	CommentParsers,
	WsTabNlParsers
]);
