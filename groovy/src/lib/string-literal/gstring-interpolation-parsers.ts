import {AtomicToken, BlockToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {
	AfterChildParsed,
	ByCharTokenParser,
	ByFuncTokenParser,
	BySingleCharTokenParser,
	ParserSelector,
	ParserSelectorArgs,
	TokenParser
} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class InterpolationCharMatchFunctions {
	static INameStart(char: Char): boolean {
		// eof
		if (char == null) {
			return false;
		}

		if (char === '$') {
			return false;
		}

		return JCM.JNameStart(char);
	}

	static INamePart(char: Char): boolean {
		// eof
		if (char == null) {
			return false;
		}

		if (char === '$') {
			return false;
		}

		return JCM.JNamePart(char);
	}
}

export const ICM = InterpolationCharMatchFunctions;

export class GsiIdentifierParser extends ByFuncTokenParser {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(ch: Char, _: ParseContext): boolean {
		return ICM.INameStart(ch);
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		let cIndex = charIndex + 1;
		let c = context.charAt(cIndex);
		while (ICM.INamePart(c)) {
			cIndex++;
			c = context.charAt(cIndex);
		}
		const token = new AtomicToken({
			id: T.Identifier,
			text: context.text(charIndex, cIndex),
			start: charIndex, line: context.line, column: context.column
		});
		context.collect(token);
		context.forward(cIndex - charIndex);
		return true;
	}

	static readonly instance = new GsiIdentifierParser();
}

export class GsiDotParser extends BySingleCharTokenParser {
	constructor() {
		super('.');
	}

	matches(_: Char, context: ParseContext): boolean {
		return ICM.INameStart(context.nextChar());
	}

	protected getTokenId(): GroovyTokenId {
		return T.Dot;
	}

	static readonly instance = new GsiDotParser();
}

export abstract class GsInterpolationParser extends ByCharTokenParser {
	protected static readonly IdentifierSelector = new ParserSelector({
		parsers: [GsiIdentifierParser.instance]
	});
	protected static readonly DotSelector = new ParserSelector({
		parsers: [GsiDotParser.instance]
	});

	constructor() {
		super('$');
	}

	protected startBlock(context: ParseContext): void {
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

	protected getInitBlockParserSelector(): ParserSelector {
		return GsInterpolationParser.IdentifierSelector;
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === GsiDotParser.instance) {
			return GsInterpolationParser.IdentifierSelector;
		} else if (parser === GsiIdentifierParser.instance) {
			return GsInterpolationParser.DotSelector;
		} else {
			throw new Error(`Unsupported parser[${parser.constructor.name}].`);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}
}

export class GsBraceInterpolationEndMarkParser extends BySingleCharTokenParser {
	constructor() {
		super('}');
	}

	protected getTokenId(): GroovyTokenId {
		return T.GsiBraceEndMark;
	}

	static readonly instance = new GsBraceInterpolationEndMarkParser();
}

export abstract class GsBraceInterpolationParser extends ByCharTokenParser {
	private static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (GsBraceInterpolationParser.Selector != null) {
			throw new Error('GsBraceInterpolationParser.Selector is initialized.');
		}
		GsBraceInterpolationParser.Selector = new ParserSelector({
			parsers: [GsBraceInterpolationEndMarkParser.instance, ...parsers]
		});
	}

	constructor() {
		super('$');
	}

	matches(_: Char, context: ParseContext): boolean {
		return context.nextChar() === '{';
	}

	protected startBlock(context: ParseContext): void {
		const charIndex = context.charIndex;
		const mark = new AtomicToken({
			id: T.GsiBraceStartMark,
			text: `$\{`,
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.GsInterpolation, mark);
		context.sink(literal);
		context.forward(2);
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return GsBraceInterpolationParser.Selector;
	}

	protected whenParserNotFound(context: ParseContext): void {
		throw new Error(`No token parser found for char[${context.char()}] at [offset=${context.charIndex}, line=${context.line}, column=${context.column}].`);
	}

	protected afterChildParsed(_: ParseContext, parser: TokenParser): AfterChildParsed {
		if (parser === GsBraceInterpolationEndMarkParser.instance) {
			return 'break';
		} else {
			return (void 0);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}
}
