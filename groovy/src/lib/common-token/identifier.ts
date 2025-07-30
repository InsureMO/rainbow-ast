import {AtomicToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {ByFuncTokenParser} from '../token-parser';
import {T} from '../tokens';

export abstract class IdentifiableTextParser extends ByFuncTokenParser {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(ch: Char, _: ParseContext): boolean {
		return JCM.JNameStart(ch);
	}

	parse(_: Char, context: ParseContext): boolean {
		const charIndex = context.charIndex;
		let cIndex = charIndex + 1;
		let c = context.charAt(cIndex);
		while (JCM.JNamePart(c)) {
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
}

/**
 * normal identifier. theoretically, it should take effect after all keyword parsers.
 *
 * note that for inline gstring interpolation identifier, refere to {@link GsiIdentifierParser}
 */
export class IdentifierParser extends IdentifiableTextParser {
	static readonly instance = new IdentifierParser();
}

export abstract class NameParser extends IdentifiableTextParser {
	protected readonly _keywordMap: Record<Char, Array<string>>;
	protected readonly _keywordChecks: Record<Char, (ch: Char, context: ParseContext) => boolean>;

	constructor() {
		super();
		this._keywordMap = this.initKeywordMap();
		this._keywordChecks = this.initKeywordCheckers();
	}

	/**
	 * default keyword map, 9 keywords are omitted
	 */
	protected initKeywordMap(): Record<Char, Array<string>> {
		return {
			a: ['abstract',/* 'as',*/ 'assert'],
			b: ['boolean', 'break', 'byte'],
			c: ['case', 'catch', 'char', 'class', 'const', 'continue'],
			d: [/*'def',*/ 'default', 'do', 'double'],
			e: ['else', 'enum', 'extends'],
			f: ['false', 'final', 'finally', 'float', 'for'],
			g: ['goto'],
			i: ['if', 'implements', 'import',/*'in',*/ 'instanceof', 'int', 'interface'],
			l: ['long'],
			n: ['native', 'new', 'non-sealed', 'null'],
			p: ['package',/*'permits',*/ 'private', 'protected', 'public'],
			r: [/*'record',*/ 'return'],
			s: [/*'sealed',*/ 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized'],
			t: ['this', 'threadsafe', 'throw', 'throws',/*'trait',*/ 'transient', 'true', 'try'],
			v: [/*'var',*/ 'void', 'volatile'],
			w: ['while']
			/*y: ['yield']*/
		};
	}

	protected getKeywordsMap(): Record<Char, Array<string>> {
		return this._keywordMap;
	}

	protected createKeywordCheckFunc(keywords: Array<string>, maxLength: number): ((ch: Char, context: ParseContext) => boolean) {
		return (_: Char, context: ParseContext): boolean => {
			const [chars, charAfter] = context.nextChars(maxLength);
			for (const kw of keywords) {
				if (chars.startsWith(kw)) {
					if (chars.length === kw.length) {
						if (!JCM.JNamePart(charAfter)) {
							return false;
						}
					} else {
						if (!JCM.JNamePart(chars[kw.length])) {
							return false;
						}
					}
				}
			}
			return true;
		};
	}

	protected initKeywordCheckers(): Record<Char, (ch: Char, context: ParseContext) => boolean> {
		const keywordsMap = this.getKeywordsMap();
		return Object.keys(keywordsMap).reduce((checkers, firstChar: Char) => {
			// remove the first char, already matched
			const keywords = keywordsMap[firstChar].map(kw => kw.slice(1));
			const maxLength = keywords.reduce((l, kw) => Math.max(l, kw.length), 0);
			if (firstChar !== 'n') {
				checkers[firstChar] = this.createKeywordCheckFunc(keywords, maxLength);
			} else {
				const keywordsBefore17 = keywordsMap[firstChar].filter(kw => kw !== 'non-sealed').map(kw => kw.slice(1));
				const maxLengthBefore17 = keywordsBefore17.reduce((l, kw) => Math.max(l, kw.length), 0);
				const checkBefore17 = this.createKeywordCheckFunc(keywordsBefore17, maxLengthBefore17);
				const check17AndAfter = this.createKeywordCheckFunc(keywords, maxLength);
				checkers[firstChar] = (ch: Char, context: ParseContext): boolean => {
					if (context.isNonSealedClassEnabled()) {
						return check17AndAfter(ch, context);
					} else {
						return checkBefore17(ch, context);
					}
				};
			}
			return checkers;
		}, {} as Record<Char, (ch: Char, context: ParseContext) => boolean>);
	}

	/**
	 * default returns false
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected beforeKeywordCheck(_ch: Char, _context: ParseContext): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(ch: Char, context: ParseContext): boolean {
		if (!JCM.JNameStart(ch)) {
			return false;
		}

		const before = this.beforeKeywordCheck(ch, context);
		if (before) {
			return true;
		}

		const keywordCheck = this._keywordChecks[ch];
		if (keywordCheck == null) {
			return true;
		} else {
			return keywordCheck(ch, context);
		}
	}

	/**
	 * default returns false
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected beforeParse(_ch: Char, _context: ParseContext): boolean {
		return false;
	}

	parse(ch: Char, context: ParseContext): boolean {
		const before = this.beforeParse(ch, context);
		if (before) {
			return true;
		}

		return super.parse(ch, context);
	}
}

/**
 * normal identifier, 8 contextual keywords and keyword "def"
 *
 * 1. for keyword non-sealed, even the JDK version is less than 17, still cannot be split as non + - + sealed,
 *    so before JDK17, if "non-sealed" appears, it will be counted as qualified name, and it is incorrect;
 *    and with JDK17 and after, it will be counted as keyword.
 * 2. there are 9 keywords are allowed to be package name, they are:
 *    as, def, in, permits, record, sealed, trait, var, yield.
 *    there 9 keywords are contextual keywords and keyword "def".
 */
export class PackageNameParser extends NameParser {
	/**
	 * check for keyword non-sealed,
	 * if enabled, ignore
	 * if disabled, returns true, treated as an identifier
	 */
	protected beforeKeywordCheck(ch: Char, context: ParseContext): boolean {
		if (ch === 'n' && !context.isNonSealedClassEnabled()) {
			const [nextChars, charAfter] = context.nextChars(9);
			if (nextChars === 'on-sealed' && !JCM.JNamePart(charAfter)) {
				return true;
			}
		}
	}

	/**
	 * check for keyword non-sealed,
	 * if enabled, ignore
	 * if disabled, collect it.
	 */
	protected beforeParse(ch: Char, context: ParseContext): boolean {
		if (ch === 'n' && !context.isNonSealedClassEnabled()) {
			const charIndex = context.charIndex;
			const [nextChars] = context.nextChars(9);
			if (nextChars === 'on-sealed') {
				const token = new AtomicToken({
					id: T.Identifier,
					text: 'non-sealed',
					start: charIndex, line: context.line, column: context.column
				});
				context.collect(token);
				context.forward(10);
				return true;
			}
		}
	}

	static readonly instance = new PackageNameParser();
}

/**
 * normal identifier and 8 contextual keywords
 *
 * there are 8 keywords are allowed to be class name, variable name, import alias name, they are:
 * as, in, permits, record, sealed, trait, var, yield.
 * there 8 keywords also known as contextual keywords.
 * and the 8th keyword "var" is not allowed.
 */
export class VariableNameParser extends NameParser {
	/**
	 * add keyword "def" to be disallowed
	 */
	protected initKeywordMap(): Record<Char, Array<string>> {
		const map = super.initKeywordMap();
		map.d.unshift('def');
		return map;
	}

	static readonly instance = new VariableNameParser();
}

/**
 * normal identifier and 7 contextual keywords (exclude "var")
 *
 * there are 8 keywords are allowed to be class name, variable name, import alias name, they are:
 * as, in, permits, record, sealed, trait, yield.
 * there 8 keywords also known as contextual keywords.
 * and the 8th keyword "var" is not allowed.
 */
export class ClassNameParser extends NameParser {
	/**
	 * add keywords "def" and "var" to be disallowed
	 */
	protected initKeywordMap(): Record<Char, Array<string>> {
		const map = super.initKeywordMap();
		map.d.unshift('def');
		map.v.unshift('var');
		return map;
	}

	static readonly instance = new ClassNameParser();
}