import {AtomicToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {GroovyTokenId, T} from '../tokens';
import {ByCharTokenParser} from './token-parser';

export abstract class KeywordTokenParser extends ByCharTokenParser {
	private readonly _keyword: string;
	private readonly _restChars: string;

	protected constructor(keyword: string) {
		super(keyword[0]);
		this._keyword = keyword;
		this._restChars = keyword.slice(1);
	}

	get keyword(): string {
		return this._keyword;
	}

	get restChars(): string {
		return this._restChars;
	}

	isAvailable(context: ParseContext): boolean {
		const block = context.block();
		const children = block.children;

		let childIndex = children.length - 1;
		let child = children[childIndex];

		while (childIndex >= 0) {
			const childTokenId = child.id;
			switch (childTokenId) {
				case T.SLComment:
				case T.MLComment:
				case T.Whitespaces:
				case T.Tabs:
				case T.Newline: {
					// ignore above token
					childIndex--;
					child = children[childIndex];
					break;
				}
				case T.Dot:
				case T.SafeDot:
				case T.SafeChainDot: {
					return false;
				}
				default: {
					return true;
				}
			}
		}
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, context: ParseContext): boolean {
		const [chars, charAfter] = context.nextChars(this._restChars.length);
		return chars === this._restChars && !JCM.JNamePart(charAfter);
	}

	protected abstract getTokenId(): GroovyTokenId;

	protected createToken(_: Char, context: ParseContext): AtomicToken {
		const charIndex = context.charIndex;
		return new AtomicToken({
			id: this.getTokenId(),
			text: this.keyword,
			start: charIndex, line: context.line, column: context.column
		});
	}
}

/**
 * collect parsed keyword as atomic token.
 */
export abstract class SingleKeywordTokenParser extends KeywordTokenParser {
	parse(ch: Char, context: ParseContext): boolean {
		context.collect(this.createToken(ch, context));
		context.forward(this.keyword.length);
		return true;
	}
}