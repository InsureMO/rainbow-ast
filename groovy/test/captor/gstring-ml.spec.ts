import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture GString Literal ML', () => {
	const builder = createDefaultAstBuilder({verbose: true});
	test('GString Literal ML: Empty string', async () => {
		const ast = builder.ast('""""""');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, '""""""', [
			[GroovyTokenId.GStringLiteral, 0, 6, 1, '""""""', [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.GStringMarkML, 3, 6, 1, '"""']
			]]
		]]);
	});
	test('GString Literal ML: Contains a single quote', async () => {
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
	test('GString Literal ML: Escapes', async () => {
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
	test('GString Literal ML: Undetermined chars', async () => {
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
	test('GString Literal ML: Word', async () => {
		const ast = builder.ast('"""\\abc """');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 11, 1, '"""\\abc """', [
			[GroovyTokenId.GStringLiteral, 0, 11, 1, '"""\\abc """', [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.UndeterminedChar, 3, 4, 1, '\\'],
				[GroovyTokenId.Word, 4, 7, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.GStringMarkML, 8, 11, 1, '"""']
			]]
		]]);
	});
	test('GString Literal ML: Newline escape #1', async () => {
		const ast = builder.ast('""" \\\n"""');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 9, 1, '""" \\\n"""', [
			[GroovyTokenId.GStringLiteral, 0, 9, 1, '""" \\\n"""', [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.Whitespaces, 3, 4, 1, ' '],
				[GroovyTokenId.StringMLNewlineEraser, 4, 5, 1, '\\'],
				[GroovyTokenId.Newline, 5, 6, 1, '\n'],
				[GroovyTokenId.GStringMarkML, 6, 9, 2, '"""']
			]]
		]]);
	});
	test('GString Literal ML: Newline escape #2', async () => {
		const ast = builder.ast('""" \\\r\n"""');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 10, 1, '""" \\\r\n"""', [
			[GroovyTokenId.GStringLiteral, 0, 10, 1, '""" \\\r\n"""', [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.Whitespaces, 3, 4, 1, ' '],
				[GroovyTokenId.StringMLNewlineEraser, 4, 5, 1, '\\'],
				[GroovyTokenId.Newline, 5, 7, 1, '\r\n'],
				[GroovyTokenId.GStringMarkML, 7, 10, 2, '"""']
			]]
		]]);
	});
	test('GString Literal ML: Interpolation without brace', async () => {
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
	test('GString Literal ML: Interpolation with brace', async () => {
		const ast = builder.ast('"""${}"""');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 9, 1, '"""${}"""', [
			[GroovyTokenId.GStringLiteral, 0, 9, 1, '"""${}"""', [
				[GroovyTokenId.GStringMarkML, 0, 3, 1, '"""'],
				[GroovyTokenId.GStringInterpolation, 3, 6, 1, '${}', [
					[GroovyTokenId.GStringInterpolationLBraceStartMark, 3, 5, 1, '${'],
					[GroovyTokenId.GStringInterpolationRBraceEndMark, 5, 6, 1, '}']
				]],
				[GroovyTokenId.GStringMarkML, 6, 9, 1, '"""']
			]]
		]]);
	});
});
