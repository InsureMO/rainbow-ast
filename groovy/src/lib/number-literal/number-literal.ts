import {AtomicToken, BlockToken, Char, Token} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser} from '../token-parser';
import {T} from '../tokens';

type IsNumeric = (ch: Char | undefined) => boolean;
type UseToken = (token: AtomicToken, context: ParseContext) => void
type Next = (ch: Char | undefined, context: ParseContext) => void;

/**
 * start mark is available for binary (0B, 0b), octal (0) and hexadecimal (0X, 0x).
 * 1. fraction part and exponent part are not allowed for binary, octal and hexadecimal,
 * 2. number suffix must be one of IiLlGg,
 * 3. for binary, numeric char could be 0 or 1,
 * 4. for octal, numeric char could be 0 - 7,
 *    no fraction, no exponent, suffix is not FfDd, numeric char is 0-7 and starts with 0, will be treated as octal,
 * 5. for hexadecimal, numeric char could be 0 - 9, a - f, A - F.
 *
 * integral part is before decimal point (or no decimal point), must start with a numeric char,
 * 1. after numeric char, could be continuous number separators, decimal point, exponent part or number suffix,
 *    number suffix must be one of IiLlFfDdGg,
 * 2. after number separator, must be numeric chars.
 *
 * fraction part is after decimal point, must start with a numeric char,
 * 1. after numeric char, could be continuous number separators, exponent part or number suffix,
 *    number suffix must be one of FfDdGg,
 * 2. after number separator, must be numeric chars.
 *
 * exponent part, must start with exponent symbol (Ee),
 * 1. after exponent symbol, must be exponent number sign (minus/plus) or continuous numeric chars,
 *    exponent symbol is only allowed to appear once,
 * 2. after exponent number sign, must be numeric chars,
 * 3. after numeric char, could be continuous number separators or number suffix,
 * 4. after number separator, must be numeric chars,
 * 5. number suffix must be one of FfDdGg, which means number is decimal.
 */
export class NumberLiteralParser extends ByCharTokenParser {
	constructor(firstChar: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.') {
		super(firstChar);
	}

	matches(ch: Char, context: ParseContext): boolean {
		if (ch === '.') {
			return JCM.Num(context.nextChar());
		} else {
			return true;
		}
	}

	/**
	 * collect numbers and following parts by given {@link next} function
	 */
	private numbers(context: ParseContext, isNumeric: IsNumeric, useToken: UseToken, next: Next): void {
		const charIndex = context.charIndex;

		let cIndex = charIndex + 1;
		let c = context.charAt(cIndex);

		while (isNumeric(c)) {
			cIndex++;
			c = context.charAt(cIndex);
		}
		const token = new AtomicToken({
			id: T.Numbers,
			text: context.text(charIndex, cIndex),
			start: charIndex, line: context.line, column: context.column
		});
		useToken(token, context);
		context.forward(cIndex - charIndex);
		next(c, context);
	}

	/**
	 * start a decimal literal by starting with a decimal point
	 */
	private startBlockByDecimalPoint(context: ParseContext): void {
		const charIndex = context.charIndex;
		const dot = new AtomicToken({
			id: T.NumberDecimalPoint,
			text: '.',
			start: charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.DecimalLiteral, dot);
		context.sink(literal);
		context.forward(1);
	}

	/**
	 * collect number separators and following parts by given {@link next} function
	 */
	private separators(context: ParseContext, isNumeric: IsNumeric, next: Next): void {
		const charIndex = context.charIndex;

		let cIndex = charIndex + 1;
		let c = context.charAt(cIndex);

		while (c === '_') {
			cIndex++;
			c = context.charAt(cIndex);
		}

		if (isNumeric(c)) {
			const token = new AtomicToken({
				id: T.NumberSeparators,
				text: context.text(charIndex, cIndex),
				start: charIndex, line: context.line, column: context.column
			});
			context.collect(token);
			context.forward(cIndex - charIndex);
		} else {
			// after separators must be a numeric char
			// if not, parsed text is not separators
			// do nothing
		}
		next(c, context);
	}

	/**
	 * start an exponent block by start mark
	 */
	private startExponentBlock(symbol: Char, context: ParseContext): void {
		const mark = new AtomicToken({
			id: T.NumberExponentStartMark,
			text: symbol,
			start: context.charIndex, line: context.line, column: context.column
		});
		const exponent = new BlockToken(T.NumberExponent, mark);
		context.sink(exponent);
		context.forward(1);
	}

	/**
	 * collect exponent sign
	 */
	private exponentSign(sign: Char, context: ParseContext): void {
		const token = new AtomicToken({
			id: T.NumberExponentSign,
			text: sign,
			start: context.charIndex, line: context.line, column: context.column
		});
		context.collect(token);
		context.forward(1);
	}

	/**
	 * collect exponent numbers, and/or suffix as well
	 * exponent block will be ended anyway
	 */
	private exponentNumbersAndOrSuffix(context: ParseContext): void {
		this.numbers(context, JCM.Num, (token, context) => {
			context.collect(token);
		}, (charAfterNumbers) => {
			switch (charAfterNumbers) {
				case '_': {
					this.separators(context, JCM.Num, (charAfter, context) => {
						if (JCM.Num(charAfter)) {
							this.exponentNumbersAndOrSuffix(context);
						} else {
							context.rise();
						}
					});
					break;
				}
				// @formatter:off
				case 'F': case 'f': case 'D': case 'd': case 'G': case 'g': {
					// @formatter:on
					context.rise();
					this.suffix(charAfterNumbers, context);
					break;
				}
				default: {
					context.rise();
					break;
				}
			}
		});
	}

	/**
	 * collect exponent part and possible following suffix
	 */
	private exponent(symbol: Char, context: ParseContext): void {
		const nextCh = context.nextChar();
		if (nextCh === '+' || nextCh === '-') {
			if (JCM.Num(context.charAt(context.charIndex + 2))) {
				this.startExponentBlock(symbol, context);
				this.exponentSign(nextCh, context);
				this.exponentNumbersAndOrSuffix(context);
			}
		} else if (JCM.Num(nextCh)) {
			this.startExponentBlock(symbol, context);
			this.exponentNumbersAndOrSuffix(context);
		}
	}

	/**
	 * collect suffix
	 */
	private suffix(suffix: Char, context: ParseContext): void {
		const token = new AtomicToken({
			id: T.NumberSuffix,
			text: suffix,
			start: context.charIndex, line: context.line, column: context.column
		});
		context.collect(token);
		context.forward(1);
	}

	/**
	 * collect fraction part and possible following parts (exponent and suffix)
	 */
	private fraction(context: ParseContext): void {
		this.numbers(context, JCM.Num, (token, context) => {
			context.collect(token);
		}, (charAfterNumbers, context) => {
			switch (charAfterNumbers) {
				case '_': {
					this.separators(context, JCM.Num, (charAfter, context) => {
						if (JCM.Num(charAfter)) {
							this.fraction(context);
						}
					});
					break;
				}
				// @formatter:off
				case 'E': case 'e': {
					// @formatter:on
					this.exponent(charAfterNumbers, context);
					break;
				}
				// @formatter:off
				case 'F': case 'f': case 'D': case 'd': case 'G': case 'g': {
					// @formatter:on
					this.suffix(charAfterNumbers, context);
					break;
				}
			}
		});
	}

	/**
	 * start an integral literal by single zero
	 */
	private startBlockWithSingleZero(context: ParseContext) {
		const token = new AtomicToken({
			id: T.Numbers,
			text: '0',
			start: context.charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.IntegerLiteral, token);
		context.sink(literal);
		context.forward(1);
	}

	/**
	 * start a binary literal by start mark
	 */
	private startBinaryLiteral(symbol: Char, context: ParseContext) {
		const token = new AtomicToken({
			id: T.BinaryStartMark,
			text: '0' + symbol,
			start: context.charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.BinaryLiteral, token);
		context.sink(literal);
		context.forward(2);
	}

	/**
	 * collect binary numbers and separators
	 */
	private binary(context: ParseContext): void {
		this.numbers(context, JCM.Bin, (token, context) => {
			context.collect(token);
		}, (charAfterNumbers, context) => {
			switch (charAfterNumbers) {
				case '_': {
					this.separators(context, JCM.Bin, (charAfter, context) => {
						if (JCM.Bin(charAfter)) {
							this.binary(context);
						}
					});
					break;
				}
				// @formatter:off
				case 'I': case 'i': case 'L': case 'l': case 'G': case 'g': {
					// @formatter:on
					this.suffix(charAfterNumbers, context);
					break;
				}
			}
		});
	}

	/**
	 * start a hexadecimal literal by start mark
	 */
	private startHexadecimalLiteral(symbol: Char, context: ParseContext) {
		const token = new AtomicToken({
			id: T.HexadecimalStartMark,
			text: '0' + symbol,
			start: context.charIndex, line: context.line, column: context.column
		});
		const literal = new BlockToken(T.HexadecimalLiteral, token);
		context.sink(literal);
		context.forward(2);
	}

	/**
	 * collect hexadecimal numbers and separators
	 */
	private hexadecimal(context: ParseContext): void {
		this.numbers(context, JCM.Hex, (token, context) => {
			context.collect(token);
		}, (charAfterNumbers, context) => {
			switch (charAfterNumbers) {
				case '_': {
					this.separators(context, JCM.Hex, (charAfter, context) => {
						if (JCM.Hex(charAfter)) {
							this.hexadecimal(context);
						}
					});
					break;
				}
				// @formatter:off
				case 'I': case 'i': case 'L': case 'l': case 'G': case 'g': {
					// @formatter:on
					this.suffix(charAfterNumbers, context);
					break;
				}
			}
		});
	}

	/**
	 * collect decimal point
	 */
	private decimalPoint(context: ParseContext): void {
		const token = new AtomicToken({
			id: T.NumberDecimalPoint,
			text: '.',
			start: context.charIndex, line: context.line, column: context.column
		});
		context.collect(token);
		context.forward(1);
	}

	/**
	 * collect integral part and possible following parts (decimal point, fraction, exponent and suffix)
	 */
	private integral(context: ParseContext, createBlock: boolean): void {
		this.numbers(context, JCM.Num, (token, context) => {
			if (createBlock) {
				const literal = new BlockToken(T.DecimalLiteral, token);
				context.sink(literal);
			} else {
				context.collect(token);
			}
		}, (charAfterNumbers, context) => {
			switch (charAfterNumbers) {
				case '.': {
					const ch = context.nextChar();
					if (JCM.Num(ch)) {
						this.decimalPoint(context);
						this.fraction(context);
					}
					break;
				}
				case '_': {
					this.separators(context, JCM.Num, (charAfter, context) => {
						if (JCM.Num(charAfter)) {
							this.integral(context, false);
						}
					});
					break;
				}
				// @formatter:off
				case 'E': case 'e': {
					// @formatter:on
					this.exponent(charAfterNumbers, context);
					break;
				}
				// @formatter:off
				case 'I': case 'i': case 'L': case 'l': case 'F': case 'f': case 'D': case 'd': case 'G': case 'g': {
					// @formatter:on
					this.suffix(charAfterNumbers, context);
					break;
				}
			}
		});
	}

	/**
	 * start with 0, collecting
	 */
	private zero(context: ParseContext): void {
		const [nextChar, charAfterNext] = context.nextChars(1);
		if (nextChar === 'B' || nextChar === 'b') {
			if (JCM.Bin(charAfterNext)) {
				this.startBinaryLiteral(nextChar, context);
				this.binary(context);
			} else {
				// 0 only
				this.startBlockWithSingleZero(context);
			}
		} else if (nextChar === 'X' || nextChar === 'x') {
			if (JCM.Hex(charAfterNext)) {
				this.startHexadecimalLiteral(nextChar, context);
				this.hexadecimal(context);
			} else {
				// 0 only
				this.startBlockWithSingleZero(context);
			}
		} else if (JCM.Num(nextChar)) {
			this.integral(context, true);
		} else {
			// 0 only
			this.startBlockWithSingleZero(context);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
		switch (ch) {
			case '.': {
				this.startBlockByDecimalPoint(context);
				this.fraction(context);
				break;
			}
			case '0': {
				this.zero(context);
				break;
			}
			// @formatter:off
			case '1': case '2': case '3': case'4': case '5': case '6': case '7': case '8': case '9': {
			// @formatter:on
				this.integral(context, true);
				break;
			}
		}

		const block = context.block();
		if (block.id === T.DecimalLiteral) {
			const children = block.children;
			let revise = true;
			const lastChild = children[children.length - 1];
			if (lastChild.id === T.NumberSuffix && 'FfDd'.includes(lastChild.text)) {
				revise = false;
			}
			if (revise) {
				const numbers: Array<Token> = [];
				for (const child of children) {
					if (child.id === T.Numbers) {
						numbers.push(child);
					} else if (child.id === T.Dot || child.id === T.NumberExponent) {
						revise = false;
						break;
					}
				}
				if (revise) {
					const text = numbers.map(token => token.text).join('');
					if (text[0] === '0' && numbers[0].text.length !== 1 && !text.slice(1).split('').some(c => !JCM.Oct(c))) {
						if (revise) {
							block.rewriteId(T.OctalLiteral);
							// and rewrite or split first child token, to create an octal start mark
							const first = numbers[0];
							if (first.text.length === 0) {
								first.rewriteId(T.OctalStartMark);
							} else {
								block.shiftChild();
								block.unshiftChild(new AtomicToken({
									id: T.OctalStartMark, text: '0',
									start: first.start, line: first.line, column: first.column
								}), new AtomicToken({
									id: T.Numbers, text: first.text.slice(1),
									start: first.start + 1, line: first.line, column: first.column + 1
								}));
							}
						}
					} else {
						block.rewriteId(T.IntegerLiteral);
					}
				}
			}
		}

		// end block
		context.rise();

		return true;
	}

	static readonly instance0 = new NumberLiteralParser('0');
	static readonly instance1 = new NumberLiteralParser('1');
	static readonly instance2 = new NumberLiteralParser('2');
	static readonly instance3 = new NumberLiteralParser('3');
	static readonly instance4 = new NumberLiteralParser('4');
	static readonly instance5 = new NumberLiteralParser('5');
	static readonly instance6 = new NumberLiteralParser('6');
	static readonly instance7 = new NumberLiteralParser('7');
	static readonly instance8 = new NumberLiteralParser('8');
	static readonly instance9 = new NumberLiteralParser('9');
	static readonly instanceDot = new NumberLiteralParser('.');
}

export const NumberParsers = [
	NumberLiteralParser.instance0,
	NumberLiteralParser.instance1,
	NumberLiteralParser.instance2,
	NumberLiteralParser.instance3,
	NumberLiteralParser.instance4,
	NumberLiteralParser.instance5,
	NumberLiteralParser.instance6,
	NumberLiteralParser.instance7,
	NumberLiteralParser.instance8,
	NumberLiteralParser.instance9,
	NumberLiteralParser.instanceDot
];
