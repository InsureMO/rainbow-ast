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
	private _topLevelTokenCount: number = 0;
	private _tokenCount: number = 0;

	public static check(ast: Ast, spec: TokenSpec): void {
		new AstChecker(ast, spec).check().print();
	}

	constructor(ast: Ast, spec: TokenSpec) {
		this._ast = ast;
		this._spec = spec;
	}

	private doCheck(token: Token, spec: TokenSpec, bullet: string) {
		const [tokenId, startOffset, startLine, text, specOfChildren] = spec;
		const indent = new Array(bullet.split('.').length - 2).fill('\t').join('');
		try {
			expect(token).not.toBeNull();
			expect(token.id).is(tokenId, 'TokenId');
			expect(token.start).is(startOffset, 'StartOffset');
			if (specOfChildren == null) {
				expect(token.end).is(startOffset + text.length, 'EndOffset');
			}
			expect(token.line).is(startLine, 'StartLine');
			if (specOfChildren == null) {
				expect(token.text).is(text, 'Text');
			}
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
				`Mismatched [type=${GroovyTokenId[tokenId]}, `,
				`offsetInDoc=[${startOffset}, ${startOffset + text.length}], `,
				`xyInDoc=[${startLine}, ${token.column}], `,
				`text=${PrintUtils.escapeForPrint(text)}`,
				'].'
			].join('')));
			this.print();
			throw e;
		}
		if (specOfChildren != null) {
			const block = token as BlockToken;
			specOfChildren.forEach((specOfChild, index) => {
				const childBullet = bullet === '0.' ? `${index + 1}.` : `${bullet}${index + 1}.`;
				const child = block.children?.[index];
				if (child == null) {
					const [tokenId, startOffset, startLine, text] = spec;
					this._logs.push(chalk.red([
						indent,
						childBullet,
						' 💔 ',
						`Expect [type=${GroovyTokenId[tokenId]}, `,
						`offsetInDoc=[${startOffset}, ?], `,
						`xyInDoc=[${startLine}, ?], `,
						`text=${PrintUtils.escapeForPrint(text)}`,
						'].'
					].join('')));
					this.print();
					throw new Error(`Expected token at index[${index}] not provided.`);
				} else {
					this.doCheck(child, specOfChild, childBullet);
				}
			});
			if (specOfChildren.length < (block.children?.length ?? 0)) {
				const index = specOfChildren.length;
				const childBullet = bullet === '0.' ? `${index + 1}.` : `${bullet}${index + 1}.`;
				const {
					id: tokenId,
					start: startOffset,
					line: startLine, column: startColumn,
					text
				} = block.children[index];
				this._logs.push(chalk.red([
					indent,
					childBullet,
					' 💔 ',
					`Unexpect [type=${GroovyTokenId[tokenId]}, `,
					`offsetInDoc=[${startOffset}, ${startOffset + text.length}], `,
					`xyInDoc=[${startLine}, ${startColumn}], `,
					`text=${PrintUtils.escapeForPrint(text)}`,
					'].'
				].join('')));
				this.print();
				throw new Error(`Unexpected token at index[${index}] provided.`);
			}
		}

		if (token === this._ast.compilationUnit) {
			// do nothing
		} else if (token.parent === this._ast.compilationUnit) {
			this._topLevelTokenCount += 1;
			this._tokenCount += 1;
		} else {
			this._tokenCount += 1;
		}
	}

	check(): this {
		this.doCheck(this._ast.compilationUnit, this._spec, '0.');
		return this;
	}

	print() {
		console.log(this._logs.join('\n'));
		console.log(`${this._tokenCount} tokens collected, ${this._topLevelTokenCount} at top level.`);
	}
}
