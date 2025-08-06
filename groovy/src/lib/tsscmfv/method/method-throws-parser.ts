import {AtomicToken} from '@rainbow-ast/core';
import {ParseContext} from '../../parse-context';

export class TsscmfvMethodThrowsParser {
	parse(token: AtomicToken, context: ParseContext): boolean {
		return true;
	}

	continue(context: ParseContext): void {

	}

	static readonly instance = new TsscmfvMethodThrowsParser();
}
