import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture GString Literal SL', () => {
	const builder = createDefaultAstBuilder({verbose: true});
	test('GString Literal SL: Empty string', async () => {
		const ast = builder.ast('"" ""');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '"" ""', [
			[GroovyTokenId.GStringLiteral, 0, 2, 1, '""', [
				[GroovyTokenId.GStringMark, 0, 1, 1, '"'],
				[GroovyTokenId.GStringMark, 1, 2, 1, '"']
			]],
			[GroovyTokenId.Whitespaces, 2, 3, 1, ' '],
			[GroovyTokenId.GStringLiteral, 3, 5, 1, '""', [
				[GroovyTokenId.GStringMark, 3, 4, 1, '"'],
				[GroovyTokenId.GStringMark, 4, 5, 1, '"']
			]]
		]]);
	});
	test('GString Literal SL: Escapes', async () => {
		const ast = builder.ast(`"\\b\\f\\n\\r\\t\\\\\\'\\"\\$"`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 20, 1, `"\\b\\f\\n\\r\\t\\\\\\'\\"\\$"`, [
			[GroovyTokenId.GStringLiteral, 0, 20, 1, `"\\b\\f\\n\\r\\t\\\\\\'\\"\\$"`, [
				[GroovyTokenId.GStringMark, 0, 1, 1, '"'],
				[GroovyTokenId.StringBackspaceEscape, 1, 3, 1, '\\b'],
				[GroovyTokenId.StringFormFeedEscape, 3, 5, 1, '\\f'],
				[GroovyTokenId.StringNewlineEscape, 5, 7, 1, '\\n'],
				[GroovyTokenId.StringCarriageReturnEscape, 7, 9, 1, '\\r'],
				[GroovyTokenId.StringTabulationEscape, 9, 11, 1, '\\t'],
				[GroovyTokenId.StringBackslashEscape, 11, 13, 1, '\\\\'],
				[GroovyTokenId.StringSingleQuoteEscape, 13, 15, 1, `\\'`],
				[GroovyTokenId.StringDoubleQuotesEscape, 15, 17, 1, '\\"'],
				[GroovyTokenId.StringDollarEscape, 17, 19, 1, '\\$'],
				[GroovyTokenId.GStringMark, 19, 20, 1, '"']
			]]
		]]);
	});
	test('GString Literal SL: Undetermined chars', async () => {
		const ast = builder.ast('"\\/#@ "');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 7, 1, '"\\/#@ "', [
			[GroovyTokenId.GStringLiteral, 0, 7, 1, '"\\/#@ "', [
				[GroovyTokenId.GStringMark, 0, 1, 1, '"'],
				[GroovyTokenId.UndeterminedChar, 1, 2, 1, '\\'],
				[GroovyTokenId.UndeterminedChar, 2, 3, 1, '/'],
				[GroovyTokenId.UndeterminedChar, 3, 4, 1, '#'],
				[GroovyTokenId.UndeterminedChar, 4, 5, 1, '@'],
				[GroovyTokenId.Whitespaces, 5, 6, 1, ' '],
				[GroovyTokenId.GStringMark, 6, 7, 1, '"']
			]]
		]]);
	});
	test('GString Literal SL: Word', async () => {
		const ast = builder.ast('"\\abc "');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 7, 1, '"\\abc "', [
			[GroovyTokenId.GStringLiteral, 0, 7, 1, '"\\abc "', [
				[GroovyTokenId.GStringMark, 0, 1, 1, '"'],
				[GroovyTokenId.UndeterminedChar, 1, 2, 1, '\\'],
				[GroovyTokenId.Word, 2, 5, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 5, 6, 1, ' '],
				[GroovyTokenId.GStringMark, 6, 7, 1, '"']
			]]
		]]);
	});
	test('GString Literal SL: Interpolation without brace', async () => {
		const ast = builder.ast('" $"');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 4, 1, '" $"', [
			[GroovyTokenId.GStringLiteral, 0, 4, 1, '" $"', [
				[GroovyTokenId.GStringMark, 0, 1, 1, '"'],
				[GroovyTokenId.Whitespaces, 1, 2, 1, ' '],
				[GroovyTokenId.GStringInterpolation, 2, 3, 1, '$', [
					[GroovyTokenId.GStringInterpolationStartMark, 2, 3, 1, '$']
				]],
				[GroovyTokenId.GStringMark, 3, 4, 1, '"']
			]]
		]]);
	});
	test('GString Literal SL: Interpolation with brace', async () => {
		const ast = builder.ast('"${}"');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '"${}"', [
			[GroovyTokenId.GStringLiteral, 0, 5, 1, '"${}"', [
				[GroovyTokenId.GStringMark, 0, 1, 1, '"'],
				[GroovyTokenId.GStringInterpolation, 1, 4, 1, '${}', [
					[GroovyTokenId.GStringInterpolationLBraceStartMark, 1, 3, 1, '${'],
					[GroovyTokenId.GStringInterpolationRBraceEndMark, 3, 4, 1, '}']
				]],
				[GroovyTokenId.GStringMark, 4, 5, 1, '"']
			]]
		]]);
	});
});
