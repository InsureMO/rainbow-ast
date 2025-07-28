import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {DotParserInstance} from '../common-token';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser, ParserSelector} from '../token-parser';
import {T} from '../tokens';
import {GsiIdentifierParser} from './gsi-identifier';

export abstract class GsInterpolationParser extends ByCharTokenParser {
	protected static readonly IdentifierSelector: ParserSelector = new ParserSelector({
		parsers: [GsiIdentifierParser.instance]
	});
	protected static readonly DotSelector: ParserSelector = new ParserSelector({
		parsers: [DotParserInstance]
	});

	constructor() {
		super('$');
	}

	protected startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.GsiStartMark,
			text: '$',
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.GsInterpolation, mark);
		context.sink(literal);
		context.forward(1);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let selector = GsInterpolationParser.DotSelector;

		let c = context.char();
		while (c != null) {
			selector = selector === GsInterpolationParser.DotSelector ? GsInterpolationParser.IdentifierSelector : GsInterpolationParser.DotSelector;
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			c = context.char();
		}

		context.rise();

		return true;
	}
}

export class GsBraceInterpolationEndMarkParser extends ByCharTokenParser {
	constructor() {
		super('}');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, _2: ParseContext): boolean {
		return true;
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.GsiBraceEndMark,
			text: '}',
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(mark);
		context.forward(1);
		return true;
	}

	static readonly instance = new GsBraceInterpolationEndMarkParser();
}

export abstract class GsBraceInterpolationParser extends ByCharTokenParser {
	private static Selector: ParserSelector;

	/**
	 * this is for avoid the circular dependency of
	 * 1. GsBraceInterpolationParser -> StringParsers,
	 * 2. StringParsers -> DsGsLiteralParser,
	 * 3. DsGsLiteralParser -> DsGsBraceInterpolationParser,
	 * 4. DsGsBraceInterpolationParser -> GsBraceInterpolationParser.
	 * it breaks the jest test.
	 *
	 * so move the selector initializing to parsers.ts to void it,
	 * mainly remove the StringParsers importing statement from this file.
	 */
	static initSelector(selector: ParserSelector) {
		if (GsBraceInterpolationParser.Selector != null) {
			throw new Error('GsBraceInterpolationParser.Selector is initialized.');
		}
		GsBraceInterpolationParser.Selector = selector;
	}

	constructor() {
		super('$');
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === '{';
	}

	protected startBlock(_: Char, context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.GsiStartMark,
			text: `$\{`,
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.GsInterpolation, mark);
		context.sink(literal);
		context.forward(2);
	}

	parse(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let c = context.char();

		while (c != null) {
			const parser = GsBraceInterpolationParser.Selector.find(c, context);
			if (parser == null) {
				throw new Error(`No token parser found for char[${c}] at [offset=${context.charIndex}, line=${context.line}, column=${context.column}].`);
			}
			parser.parse(c, context);
			c = context.char();
		}

		context.rise();

		return true;
	}
}
