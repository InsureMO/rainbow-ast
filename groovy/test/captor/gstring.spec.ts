import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture gstring', () => {
	const builder = createDefaultAstBuilder({verbose: true});
	test('Capture GString Literal #1', async () => {
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
	test('Capture GString Literal #2', async () => {
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
	test('Capture GString Literal #3', async () => {
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
	test('Capture GString Literal #4', async () => {
		const ast = builder.ast('""""""');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, '""""""', [
			[GroovyTokenId.GStringLiteral, 0, 6, 1, '""""""', [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.GStringMarkML, 3, 6, 1, '"""']
			]]
		]]);
	});
	test('Capture GString Literal #5', async () => {
		const ast = builder.ast('"""" """');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 8, 1, '"""" """', [
			[GroovyTokenId.GStringLiteral, 0, 8, 1, '"""" """', [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.UndeterminedChar, 3, 4, 1, '"'],
				[GroovyTokenId.Whitespaces, 4, 5, 1, ' '],
				[GroovyTokenId.GStringMarkML, 5, 8, 1, '"""']
			]]
		]]);
	});
	test('Capture GString Literal #6', async () => {
		const ast = builder.ast(`"""\\b\\f\\n\\r\\t\\\\\\'\\"\\$"""`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 24, 1, `"""\\b\\f\\n\\r\\t\\\\\\'\\"\\$"""`, [
			[GroovyTokenId.GStringLiteral, 0, 24, 1, `"""\\b\\f\\n\\r\\t\\\\\\'\\"\\$"""`, [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.StringBackspaceEscape, 3, 5, 1, '\\b'],
				[GroovyTokenId.StringFormFeedEscape, 5, 7, 1, '\\f'],
				[GroovyTokenId.StringNewlineEscape, 7, 9, 1, '\\n'],
				[GroovyTokenId.StringCarriageReturnEscape, 9, 11, 1, '\\r'],
				[GroovyTokenId.StringTabulationEscape, 11, 13, 1, '\\t'],
				[GroovyTokenId.StringBackslashEscape, 13, 15, 1, '\\\\'],
				[GroovyTokenId.StringSingleQuoteEscape, 15, 17, 1, `\\'`],
				[GroovyTokenId.StringDoubleQuotesEscape, 17, 19, 1, '\\"'],
				[GroovyTokenId.StringDollarEscape, 19, 21, 1, '\\$'],
				[GroovyTokenId.GStringMarkML, 21, 24, 1, '"""']
			]]
		]]);
	});
	test('Capture GString Literal #7', async () => {
		const ast = builder.ast('"""\\/#@ """');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 11, 1, '"""\\/#@ """', [
			[GroovyTokenId.GStringLiteral, 0, 11, 1, '"""\\/#@ """', [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.UndeterminedChar, 3, 4, 1, '\\'],
				[GroovyTokenId.UndeterminedChar, 4, 5, 1, '/'],
				[GroovyTokenId.UndeterminedChar, 5, 6, 1, '#'],
				[GroovyTokenId.UndeterminedChar, 6, 7, 1, '@'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.GStringMarkML, 8, 11, 1, '"""']
			]]
		]]);
	});
	test('Capture GString Literal #8', async () => {
		const ast = builder.ast('""" $"""');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 8, 1, '""" $"""', [
			[GroovyTokenId.GStringLiteral, 0, 8, 1, '""" $"""', [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.Whitespaces, 3, 4, 1, ' '],
				[GroovyTokenId.GStringInterpolation, 4, 5, 1, '$', [
					[GroovyTokenId.GStringInterpolationStartMark, 4, 5, 1, '$']
				]],
				[GroovyTokenId.GStringMarkML, 5, 8, 1, '"""']
			]]
		]]);
	});
});
