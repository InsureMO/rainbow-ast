import {AtomicToken} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {ParserSelector} from '../token-parser';
import {T} from '../tokens';
import {TIKP} from './type-inherit-keywords';

export class TypeInheritParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [TIKP.instanceExtends, TIKP.instanceImplements, TIKP.instancePermits]
	});

	parse(token: AtomicToken, context: ParseContext): boolean {
		switch (token.id) {
			case T.EXTENDS: {
				TIKP.instanceExtends.continue(token, context);
				break;
			}
			case T.IMPLEMENTS: {
				TIKP.instanceImplements.continue(token, context);
				break;
			}
			case T.PERMITS: {
				TIKP.instancePermits.continue(token, context);
				break;
			}
			default:
				throw new Error(`Token[id=${T[token.id]}] not supported.`);
		}
		return this.continue(context);
	}

	continue(context: ParseContext): boolean {
		let c = context.char();
		while (c != null) {
			const parser = TypeInheritParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			c = context.char();
		}
		return true;
	}

	static readonly instance = new TypeInheritParser();
}
