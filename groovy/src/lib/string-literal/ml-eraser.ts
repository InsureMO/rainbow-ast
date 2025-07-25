import {AtomicToken, Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser} from '../token-parser';
import {T} from '../tokens';

export class MLEraserParser extends ByCharTokenParser {
	constructor() {
		super('\\');
	}

	matches(_: Char, context: ParseContext): boolean {
		const nextChar = context.nextChar();
		if (nextChar === '\n') {
			return true;
		} else if (nextChar === '\r' && context.charAt(context.charIndex + 2) === '\n') {
			return true;
		}
		return false;
	}

	parse(_: Char, context: ParseContext): boolean {
		const eraser = new AtomicToken({
			id: T.MLSNewlineEraser,
			text: '\\',
			start: context.charIndex, line: context.line, column: context.column
		});
		context.collect(eraser);
		context.forward(1);
		return true;
	}

	static readonly instance = new MLEraserParser();
}
