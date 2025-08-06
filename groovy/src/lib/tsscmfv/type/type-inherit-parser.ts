import {AtomicToken} from '@rainbow-ast/core';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {TsscmfvTIKP} from './type-inherit-keywords';

export class TsscmfvTypeInheritParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [TsscmfvTIKP.instanceExtends, TsscmfvTIKP.instanceImplements, TsscmfvTIKP.instancePermits]
	});

	parse(token: AtomicToken, context: ParseContext): boolean {
		switch (token.id) {
			case T.EXTENDS: {
				TsscmfvTIKP.instanceExtends.continue(token, context);
				break;
			}
			case T.IMPLEMENTS: {
				TsscmfvTIKP.instanceImplements.continue(token, context);
				break;
			}
			case T.PERMITS: {
				TsscmfvTIKP.instancePermits.continue(token, context);
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
			const parser = TsscmfvTypeInheritParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			c = context.char();
		}
		return true;
	}

	static readonly instance = new TsscmfvTypeInheritParser();
}
