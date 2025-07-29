import {Ast, BlockToken, PrintUtils, Token} from '@rainbow-ast/core';
import * as chalk from 'chalk';
import type {MatcherFunction} from 'expect';
import {GroovyTokenId} from '../../src';

export type Offset = number;
export type Line = number;
export type Content = string;
export type TokenSpec =
	| [GroovyTokenId, Offset, Line, Content] // leaf node
	| [GroovyTokenId, Offset, Line, Content, Array<TokenSpec>] // container node

const Is: MatcherFunction<[expected: any, where: string]> = function (received, expected, where: string) {
	return {
		message: () => `${chalk.red.bold(`❌ With [${where}]`)},\n${this.utils.printDiffOrStringify(expected, received, `       ${chalk.green.underline('Expected')}`, `       ${chalk.red.underline('Received')}`, false)}.`,
		pass: received == expected
	};
};
expect.extend({is: Is});

declare global {
	namespace jest {
		interface AsymmetricMatchers {
			is(expected: any, where: string): void;
		}

		interface Matchers<R> {
			is(expected: any, where: string): R;
		}
	}
}

export class AstChecker {
	private readonly _ast: Ast;
	private readonly _spec: TokenSpec;
	private readonly _logs: Array<string> = [];

	public static check(ast: Ast, spec: TokenSpec): void {
		new AstChecker(ast, spec).check().print();
	}

	constructor(ast: Ast, spec: TokenSpec) {
		this._ast = ast;
		this._spec = spec;
	}

	private doCheck(token: Token, spec: TokenSpec, bullet: string) {
		const [tokenId, startOffset, startLine, text, children] = spec;
		const indent = new Array(bullet.split('.').length - 2).fill('\t').join('');
		try {
			expect(token).not.toBeNull();
			expect(token.id).is(tokenId, 'TokenId');
			expect(token.start).is(startOffset, 'StartOffset');
			expect(token.end).is(startOffset + text.length, 'EndOffset');
			expect(token.line).is(startLine, 'StartLine');
			expect(token.text).is(text, 'Text');
			this._logs.push([
				indent,
				bullet,
				' ✅ ',
				`Check [type=${GroovyTokenId[tokenId]}, `,
				`offsetInDoc=[${startOffset}, ${startOffset + text.length}], `,
				`xyInDoc=[${startLine}, ${token.column}], `,
				`text=${PrintUtils.escapeForPrint(text)}`,
				'].'
			].join(''));
		} catch (e) {
			this._logs.push(chalk.red([
				indent,
				bullet,
				' 💔 ',
				`Check [type=${GroovyTokenId[tokenId]}, `,
				`offsetInDoc=[${startOffset}, ${startOffset + text.length}], `,
				`xyInDoc=[${startLine}, ${token.column}], `,
				`text=${PrintUtils.escapeForPrint(text)}`,
				'].'
			].join('')));
			this.print();
			throw e;
		}
		if (children != null) {
			const block = token as BlockToken;
			try {
				expect(block.children.length).is(children.length, 'Children Count');
			} catch (e) {
				this._logs.push(chalk.red([
					indent,
					bullet,
					' 💔 ',
					`Check children count[type=${GroovyTokenId[tokenId]}].`
				].join('')));
				this.print();
				throw e;
			}
			children.forEach((child, index) => {
				if (bullet === '0.') {
					this.doCheck(block.children[index], children[index], `${index + 1}.`);
				} else {
					this.doCheck(block.children[index], children[index], `${bullet}${index + 1}.`);
				}
			});
		}
	}

	check(): this {
		this.doCheck(this._ast.compilationUnit, this._spec, '0.');
		return this;
	}

	print() {
		console.log(this._logs.join('\n'));
	}
}
