import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';

export type AfterChildParsed = 'break' | ParserSelector | undefined;

/**
 * MUST BE SINGLETON!
 */
export abstract class TokenParser {
	/**
	 * default available
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isAvailable(_context: ParseContext): boolean {
		return true;
	}

	abstract matches(ch: Char, context: ParseContext): boolean;

	abstract parse(ch: Char, context: ParseContext): boolean;

	// following part is for block token parse
	/**
	 * overrides this method to create block token, and append it to context
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected startBlock(_context: ParseContext): void {
		throw new Error('#startBlock is not implemented.');
	}

	/**
	 * overrides this method to get initialing block parser selector.
	 * default throws error.
	 */
	protected getInitBlockParserSelector(): ParserSelector {
		throw new Error('#getBlockParserSelector is not implemented.');
	}

	/**
	 * overrides this method if there is something need to be done when parser not found inside block.
	 * default do nothing.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected whenParserNotFound(_context: ParseContext): void {
	}

	/**
	 * overrides this method if there is something need to be done before parsing by given parser.
	 * default do nothing.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected beforeChildParsed(_context: ParseContext, _parser: TokenParser): void {
	}

	/**
	 * overrides this method, when
	 * 1. returns 'break', then break the child parsing, and parsing will be ended then,
	 * 2. returns {@link ParserSelector}, then parsing will be continued by the returned parser selector,
	 * 3. return undefined, the parsing will be continued by current parser selector.
	 * default return undefined.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected afterChildParsed(_context: ParseContext, _parser: TokenParser): AfterChildParsed {
		return (void 0);
	}

	/**
	 * overrides {@link #whenParserNotFound} when want to handle parser not found, typically throw exception.
	 * default behavior is ignoring this and break the sub parsing loop.
	 * overrides {@link #afterChildParsed} when want to do something after child token parsed, typically change the parser selector.
	 * default do nothing and using the current parser selector to continue the sub parsing loop.
	 */
	protected parseBySubParsers(context: ParseContext) {
		let selector = this.getInitBlockParserSelector();
		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				this.whenParserNotFound(context);
				break;
			}
			this.beforeChildParsed(context, parser);
			parser.parse(c, context);
			const after = this.afterChildParsed(context, parser);
			if (after == 'break') {
				break;
			} else if (after instanceof ParserSelector) {
				selector = after;
			} else if (after == null) {
				// do nothing
			} else {
				throw new Error(`Unrecognized returned value[${after}] of #afterChildParsed.`);
			}
			c = context.char();
		}
	}

	/**
	 * overrides {@link #startBlock}, {@link #getInitBlockParserSelector}.
	 * overrides {@link #whenParserNotFound} when want to handle parser not found, typically throw exception.
	 * default behavior is ignoring this and break the sub parsing loop.
	 * overrides {@link #afterChildParsed} when want to do something after child token parsed, typically change the parser selector.
	 * default do nothing and using the current parser selector to continue the sub parsing loop.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected parseAsBlock(_: Char, context: ParseContext): boolean {
		this.startBlock(context);
		this.parseBySubParsers(context);
		context.rise();
		return true;
	}
}

export abstract class ByCharTokenParser extends TokenParser {
	private readonly _firstChar: Char;

	protected constructor(firstChar: Char) {
		super();
		this._firstChar = firstChar;
	}

	get firstChar(): Char {
		return this._firstChar;
	}

	abstract matches(ch: Char, context: ParseContext): boolean;

	abstract parse(ch: Char, context: ParseContext): boolean ;
}

export abstract class ByFuncTokenParser extends TokenParser {
}

/**
 * parsers selection is EXACTLY follow the given order.
 */
export interface ParserSelectorArgs {
	parsers?: ReadonlyArray<ByCharTokenParser | ByFuncTokenParser | ReadonlyArray<ByCharTokenParser | ByFuncTokenParser>>;
}

type ByCharParsers = Map<Char, Array<ByCharTokenParser>>;
type ByFuncParsers = Array<ByFuncTokenParser>;

export class ParserSelector {
	private readonly _parsers: Array<ByCharParsers | ByFuncParsers> = [];

	constructor(args: ParserSelectorArgs) {
		let parsers: ByCharParsers | ByFuncParsers = (void 0);
		args.parsers?.flat().forEach(p => {
			if (p instanceof ByCharTokenParser) {
				if (parsers == null || Array.isArray(parsers)) {
					parsers = new Map<Char, Array<ByCharTokenParser>>();
					this._parsers.push(parsers);
				}
				const existing = parsers.get(p.firstChar);
				if (existing == null) {
					parsers.set(p.firstChar, [p]);
				} else {
					existing.push(p);
				}
			} else if (p instanceof ByFuncTokenParser) {
				if (parsers == null || !Array.isArray(parsers)) {
					parsers = [] as ByFuncParsers;
					this._parsers.push(parsers);
				}
				parsers.push(p);
			} else {
				// @ts-expect-error guard logic
				throw new Error(`Unsupported parser[${p.constructor?.name ?? p}].`);
			}
		});
	}

	find(ch: Char, context: ParseContext): TokenParser {
		for (const parsers of this._parsers) {
			if (Array.isArray(parsers)) {
				const parser = parsers.find(p => p.isAvailable(context) && p.matches(ch, context));
				if (parser != null) {
					return parser;
				}
			} else {
				const parsersOfChar = parsers.get(ch);
				if (parsersOfChar != null) {
					const parser = parsersOfChar.find(p => p.isAvailable(context) && p.matches(ch, context));
					if (parser != null) {
						return parser;
					}
				}
			}
		}
		return (void 0);
	}
}
