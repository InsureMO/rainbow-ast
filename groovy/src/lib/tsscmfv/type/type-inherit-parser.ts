import {AtomicToken} from '@rainbow-ast/core';
import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers} from '../../comment';
import {WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {TsscmfvTIKP} from './type-inherit-keywords';

/**
 * - accept one type inherit keyword for one inheriting part,
 * - accept multiple inheriting types, joined by comma,
 * - inheriting type name could be alias name, qualified name, full qualified name.
 *
 * - annotation is allowed before or after any inherit segment
 * - generic type is allowed after name
 */
export class TsscmfvTypeInheritParser {
	private static Selector: ParserSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance,
			TsscmfvTIKP.instanceExtends, TsscmfvTIKP.instanceImplements, TsscmfvTIKP.instancePermits,
			CommentParsers,
			WsTabNlParsers,
		]
	});

	private subsequent(context: ParseContext): void {
		let c = context.char();
		while (c != null) {
			const parser = TsscmfvTypeInheritParser.Selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			c = context.char();
		}
	}

	parse(token: AtomicToken, context: ParseContext): boolean {
		switch (token.id) {
			case T.EXTENDS: {
				TsscmfvTIKP.instanceExtends.startBy(token, context);
				break;
			}
			case T.IMPLEMENTS: {
				TsscmfvTIKP.instanceImplements.startBy(token, context);
				break;
			}
			case T.PERMITS: {
				TsscmfvTIKP.instancePermits.startBy(token, context);
				break;
			}
			default:
				throw new Error(`Token[id=${T[token.id]}] not supported.`);
		}

		this.subsequent(context);

		return true;
	}

	try(context: ParseContext): void {
		this.subsequent(context);
	}

	static readonly instance = new TsscmfvTypeInheritParser();
}
