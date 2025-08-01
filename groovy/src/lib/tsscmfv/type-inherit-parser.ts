import {AtomicToken} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';

export class TypeInheritParser {
	parse(token: AtomicToken, context: ParseContext): boolean {
		// TODO
		return true;
	}

	continue(context: ParseContext): boolean {
		// TODO
		return true;
	}

	static readonly instance = new TypeInheritParser();
}
