import {AtomicToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {GroovyTokenId} from '../tokens';
import {ByCharTokenParser} from './by-char-token-parser';

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
