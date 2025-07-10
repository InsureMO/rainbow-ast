import {AtomicToken} from '@rainbow-ast/core';
import {T} from '../alias';
import {GroovyTokenPointcutDefs} from './types';

export const NumericLiteralPointcutDefs: Array<GroovyTokenPointcutDefs> = [
	{
		DecimalLiteral: {
			onBlockEnded: (block): void => {
				const children = block.children;
				const decimal = children.some(child => {
					const tokenId = child.id;
					return T.NumDot === tokenId || T.NumExponent === tokenId;
				});
				if (decimal) {
					return;
				}
				const lastChild = children[children.length - 1];
				if (lastChild.id === T.NumSuffix && 'fFdD'.includes(lastChild.text)) {
					return;
				}
				// no dot, no exponent, no suffix or suffix is one of iIlLgG
				// it is an integral literal
				// and check the numbers, is numbers starts with 0 and all number are 0-7, it is an octal literal
				const firstChild = children[0];
				if (!firstChild.text.startsWith('0')) {
					block.rewriteId(T.IntegralLiteral);
					return;
				}
				const text = children
					.filter(child => child.id === T.Number)
					.map(child => child.text).join('');
				if (text.length > 1) {
					// at least 2 numbers
					// the first char is 0, so compare chars after first
					// if any char is 8 or 9, it is an integral literal
					// otherwise it is an octal literal

					// always be 0-9, so here just check it is 8 or 9, or not
					// 7 -> 55
					const has89 = text.slice(1).split('').some(char => char.codePointAt(0) > 55);
					if (has89) {
						block.rewriteId(T.IntegralLiteral);
					} else {
						// change the first 0 to octal mark
						if (firstChild.text.length === 1) {
							firstChild.rewriteId(T.OctalStartMark);
						} else {
							block.shiftChild();
							block.unshiftChild(new AtomicToken({
								id: T.OctalStartMark, text: '0',
								start: firstChild.start, line: firstChild.line, column: firstChild.column
							}), new AtomicToken({
								id: T.Number, text: firstChild.text.slice(1),
								start: firstChild.start + 1, line: firstChild.line, column: firstChild.column + 1
							}));
						}
						block.rewriteId(T.OctalLiteral);
					}
				} else {
					block.rewriteId(T.IntegralLiteral);
				}
			}
		}
	}
];
