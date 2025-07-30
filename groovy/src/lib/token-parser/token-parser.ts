import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';

export type AfterChildParsed = 'break' | ParserSelector | undefined;

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
	protected startBlock(_ch: Char, _context: ParseContext): void {
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
	 * overrides this method when
	 * 1. returns 'break', then break the child parsing, and parsing will be ended then,
	 * 2. returns {@link ParserSelector}, then parsing will be continued by the returned parser selector,
	 * 3. return undefined, the parsing will be continued by current parser selector.
	 * default return undefined.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected afterChildParsed(_context: ParseContext, _parser: TokenParser): AfterChildParsed {
		return (void 0);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected parseAsBlock(ch: Char, context: ParseContext): boolean {
		this.startBlock(ch, context);

		let selector = this.getInitBlockParserSelector();
		let c = context.char();
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				this.whenParserNotFound(context);
				break;
			}
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

export interface ParserSelectorArgs {
	parsers?: ReadonlyArray<ByCharTokenParser | ByFuncTokenParser | ReadonlyArray<ByCharTokenParser | ByFuncTokenParser>>;
}

export class ParserSelector {
	private readonly _byChar: Map<Char, Array<ByCharTokenParser>> = new Map();
	private readonly _byFunc: Array<ByFuncTokenParser> = [];

	constructor(args: ParserSelectorArgs) {
		args.parsers?.flat().forEach(p => {
			if (p instanceof ByCharTokenParser) {
				const existing = this._byChar.get(p.firstChar);
				if (existing == null) {
					this._byChar.set(p.firstChar, [p]);
				} else {
					existing.push(p);
				}
			} else if (p instanceof ByFuncTokenParser) {
				this._byFunc.push(p);
			} else {
				// @ts-expect-error guard logic
				throw new Error(`Unsupported parser[${p.constructor?.name ?? p}].`);
			}
		});
	}

	private findByChar(ch: Char, context: ParseContext): TokenParser | undefined {
		const parsers = this._byChar.get(ch);
		if (parsers == null) {
			return (void 0);
		}
		return parsers.find(p => p.isAvailable(context) && p.matches(ch, context));
	}

	private findByFunc(ch: Char, context: ParseContext): TokenParser | undefined {
		return this._byFunc.find(p => p.isAvailable(context) && p.matches(ch, context));
	}

	find(ch: Char, context: ParseContext): TokenParser {
		return this.findByChar(ch, context) ?? this.findByFunc(ch, context);
	}
}
