import {BlockToken, Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {KeywordTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export abstract class AsParser extends KeywordTokenParser {
	protected constructor() {
		super('as');
	}

	protected getTokenId(): GroovyTokenId {
		return T.AS;
	}

	protected startBlock(ch: Char, context: ParseContext): void {
		const keyword = this.createToken(ch, context);
		const decl = new BlockToken(T.AsDecl, keyword);
		context.sink(decl);
		context.forward(2);
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}
}
