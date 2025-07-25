import {AtomicToken, Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

type Escape =
	| ['$', GroovyTokenId.DollarEscape]
	| ['/', GroovyTokenId.SlashEscape]

export class DollarEscapeParser<E extends Escape> extends ByCharTokenParser {
	private readonly _secondChar: E[0];
	private readonly _tokenId: E[1];

	constructor(secondChar: E[0], tokenId: E[1]) {
		super('\\');
		this._secondChar = secondChar;
		this._tokenId = tokenId;
	}

	get secondChar(): E[0] {
		return this._secondChar;
	}

	get tokenId(): E[1] {
		return this._tokenId;
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === this._secondChar;
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const escape = new AtomicToken({
			id: this._tokenId,
			text: '\\' + this._secondChar,
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(escape);
		context.forward(2);
		return true;
	}

	static readonly instanceDollar = new DollarEscapeParser('$', T.DollarEscape);
	static readonly instanceSlash = new DollarEscapeParser('/', T.SlashEscape);
}
