import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture String Literal ML', () => {
	const builder = createDefaultAstBuilder({verbose: true});
	test('Capture String Literal ML #1', async () => {
		const ast = builder.ast(`''''''`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, `''''''`, [
			[GroovyTokenId.StringLiteral, 0, 6, 1, `''''''`, [
				[GroovyTokenId.StringMarkML, 0, 3, 1, `'''`],
				[GroovyTokenId.StringMarkML, 3, 6, 1, `'''`]
			]]
		]]);
	});
	test('Capture String Literal ML #2', async () => {
		const ast = builder.ast(`'''' '''`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 8, 1, `'''' '''`, [
			[GroovyTokenId.StringLiteral, 0, 8, 1, `'''' '''`, [
				[GroovyTokenId.StringMarkML, 0, 3, 1, `'''`],
				[GroovyTokenId.UndeterminedChar, 3, 4, 1, `'`],
				[GroovyTokenId.Whitespaces, 4, 5, 1, ' '],
				[GroovyTokenId.StringMarkML, 5, 8, 1, `'''`]
			]]
		]]);
	});
	test('Capture String Literal ML #3', async () => {
		const ast = builder.ast(`'''\\b\\f\\n\\r\\t\\\\\\'\\"\\$'''`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 24, 1, `'''\\b\\f\\n\\r\\t\\\\\\'\\"\\$'''`, [
			[GroovyTokenId.StringLiteral, 0, 24, 1, `'''\\b\\f\\n\\r\\t\\\\\\'\\"\\$'''`, [
				[GroovyTokenId.StringMarkML, 0, 3, 1, `'''`],
				[GroovyTokenId.StringBackspaceEscape, 3, 5, 1, '\\b'],
				[GroovyTokenId.StringFormFeedEscape, 5, 7, 1, '\\f'],
				[GroovyTokenId.StringNewlineEscape, 7, 9, 1, '\\n'],
				[GroovyTokenId.StringCarriageReturnEscape, 9, 11, 1, '\\r'],
				[GroovyTokenId.StringTabulationEscape, 11, 13, 1, '\\t'],
				[GroovyTokenId.StringBackslashEscape, 13, 15, 1, '\\\\'],
				[GroovyTokenId.StringSingleQuoteEscape, 15, 17, 1, `\\'`],
				[GroovyTokenId.StringDoubleQuotesEscape, 17, 19, 1, '\\"'],
				[GroovyTokenId.StringDollarEscape, 19, 21, 1, '\\$'],
				[GroovyTokenId.StringMarkML, 21, 24, 1, `'''`]
			]]
		]]);
	});
	test('Capture String Literal ML #4', async () => {
		const ast = builder.ast(`'''\\/#@ '''`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 11, 1, `'''\\/#@ '''`, [
			[GroovyTokenId.StringLiteral, 0, 11, 1, `'''\\/#@ '''`, [
				[GroovyTokenId.StringMarkML, 0, 3, 1, `'''`],
				[GroovyTokenId.UndeterminedChar, 3, 4, 1, '\\'],
				[GroovyTokenId.UndeterminedChar, 4, 5, 1, '/'],
				[GroovyTokenId.UndeterminedChar, 5, 6, 1, '#'],
				[GroovyTokenId.UndeterminedChar, 6, 7, 1, '@'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.StringMarkML, 8, 11, 1, `'''`]
			]]
		]]);
	});
	test('Capture String Literal ML #5', async () => {
		const ast = builder.ast(`'''\\abc '''`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 11, 1, `'''\\abc '''`, [
			[GroovyTokenId.StringLiteral, 0, 11, 1, `'''\\abc '''`, [
				[GroovyTokenId.StringMarkML, 0, 3, 1, `'''`],
				[GroovyTokenId.UndeterminedChar, 3, 4, 1, '\\'],
				[GroovyTokenId.Word, 4, 7, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.StringMarkML, 8, 11, 1, `'''`]
			]]
		]]);
	});
});
