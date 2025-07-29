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

export class IdentifierParser extends IdentifiableTextParser {
	static readonly instance = new IdentifierParser();
}

/**
 * for keyword non-sealed, even the JDK version is less than 17, still cannot be split as non/-/sealed,
 * which means if "non-sealed" appears, it will be counted as qualified name, and it is incorrect.
 */
export class QualifiedNameParser extends IdentifiableTextParser {
	/**
	 * commented keywords are allowed for qualified name.
	 */
	private static readonly Keywords = {
		a: ['abstract'/*, 'as', 'assert'*/],
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
		t: ['this', 'throw', 'throws',/*'trait',*/ 'transient', 'true', 'try'],
		v: [/*'var',*/ 'void', 'volatile'],
		w: ['while']
		/*y: ['yield']*/
	};
	private static readonly CreateKeywordCheckFunc = (keywords: Array<string>, maxLength: number): ((ch: Char, context: ParseContext) => boolean) => {
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
	};
	private static readonly KeywordCheck: Record<keyof typeof QualifiedNameParser.Keywords, (ch: Char, context: ParseContext) => boolean> = Object.keys(QualifiedNameParser.Keywords).reduce((checkers, firstChar: keyof typeof QualifiedNameParser.Keywords) => {
		// remove the first char, already matched
		const keywords = QualifiedNameParser.Keywords[firstChar].map(kw => kw.slice(1));
		const maxLength = keywords.reduce((l, kw) => Math.max(l, kw.length), 0);
		if (firstChar !== 'n') {
			checkers[firstChar] = QualifiedNameParser.CreateKeywordCheckFunc(keywords, maxLength);
		} else {
			const keywordsBefore17 = QualifiedNameParser.Keywords[firstChar].filter(kw => kw !== 'non-sealed').map(kw => kw.slice(1));
			const maxLengthBefore17 = keywordsBefore17.reduce((l, kw) => Math.max(l, kw.length), 0);
			const checkBefore17 = QualifiedNameParser.CreateKeywordCheckFunc(keywordsBefore17, maxLengthBefore17);
			const check17AndAfter = QualifiedNameParser.CreateKeywordCheckFunc(keywords, maxLength);
			checkers[firstChar] = (ch: Char, context: ParseContext): boolean => {
				if (context.isNonSealedClassEnabled()) {
					return check17AndAfter(ch, context);
				} else {
					return checkBefore17(ch, context);
				}
			};
		}
		return checkers;
	}, {} as Record<keyof typeof QualifiedNameParser.Keywords, (ch: Char, context: ParseContext) => boolean>);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(ch: Char, context: ParseContext): boolean {
		if (!JCM.JNameStart(ch)) {
			return false;
		}

		// check for keyword non-sealed, if enabled, handle over to keywords check functions after
		if (ch === 'n' && !context.isNonSealedClassEnabled()) {
			const [nextChars, charAfter] = context.nextChars(9);
			if (nextChars === 'on-sealed' && !JCM.JNamePart(charAfter)) {
				return true;
			}
		}

		const keywordCheck = QualifiedNameParser.KeywordCheck[ch];
		if (keywordCheck == null) {
			return true;
		} else {
			return keywordCheck(ch, context);
		}
	}

	parse(ch: Char, context: ParseContext): boolean {
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

		return super.parse(ch, context);
	}

	static readonly instance = new QualifiedNameParser();
}
