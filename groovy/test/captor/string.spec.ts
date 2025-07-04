import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture string', () => {
	const builder = createDefaultAstBuilder({verbose: true});
	test('Capture String Literal #1', async () => {
		const ast = builder.ast(`'' ''`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, `'' ''`, [
			[GroovyTokenId.StringLiteral, 0, 2, 1, `''`, [
				[GroovyTokenId.StringMark, 0, 1, 1, `'`],
				[GroovyTokenId.StringMark, 1, 2, 1, `'`]
			]],
			[GroovyTokenId.Whitespaces, 2, 3, 1, ' '],
			[GroovyTokenId.StringLiteral, 3, 5, 1, `''`, [
				[GroovyTokenId.StringMark, 3, 4, 1, `'`],
				[GroovyTokenId.StringMark, 4, 5, 1, `'`]
			]]
		]]);
	});
	test('Capture String Literal #2', async () => {
		const ast = builder.ast(`'\\b\\f\\n\\r\\t\\\\\\\'\\"\\$'`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 20, 1, `'\\b\\f\\n\\r\\t\\\\\\\'\\"\\$'`, [
			[GroovyTokenId.StringLiteral, 0, 20, 1, `'\\b\\f\\n\\r\\t\\\\\\\'\\"\\$'`, [
				[GroovyTokenId.StringMark, 0, 1, 1, `'`],
				[GroovyTokenId.StringBackspaceEscape, 1, 3, 1, '\\b'],
				[GroovyTokenId.StringFormFeedEscape, 3, 5, 1, '\\f'],
				[GroovyTokenId.StringNewlineEscape, 5, 7, 1, '\\n'],
				[GroovyTokenId.StringCarriageReturnEscape, 7, 9, 1, '\\r'],
				[GroovyTokenId.StringTabulationEscape, 9, 11, 1, '\\t'],
				[GroovyTokenId.StringBackslashEscape, 11, 13, 1, '\\\\'],
				[GroovyTokenId.StringSingleQuoteEscape, 13, 15, 1, '\\\''],
				[GroovyTokenId.StringDoubleQuotesEscape, 15, 17, 1, '\\"'],
				[GroovyTokenId.StringDollarEscape, 17, 19, 1, '\\$'],
				[GroovyTokenId.StringMark, 19, 20, 1, `'`]
			]]
		]]);
	});
});
