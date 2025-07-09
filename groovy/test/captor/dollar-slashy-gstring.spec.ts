import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Dollar Slashy GString Literal', () => {
	const builder = createDefaultAstBuilder({verbose: true});
	test('Dollar Slashy GString Literal: Empty string', async () => {
		const ast = builder.ast('$//$');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 4, 1, '$//$', [
			[GroovyTokenId.DollarSlashyGStringLiteral, 0, 4, 1, '$//$', [
				[GroovyTokenId.DollarSlashyGStringStartMark, 0, 2, 1, '$/'],
				[GroovyTokenId.DollarSlashyGStringEndMark, 2, 4, 1, '/$']
			]]
		]]);
	});
	test('Dollar Slashy GString Literal: Escapes', async () => {
		const ast = builder.ast('$/$$$//$');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 8, 1, '$/$$$//$', [
			[GroovyTokenId.DollarSlashyGStringLiteral, 0, 8, 1, '$/$$$//$', [
				[GroovyTokenId.DollarSlashyGStringStartMark, 0, 2, 1, '$/'],
				[GroovyTokenId.DollarSlashyGStringDollarEscape, 2, 4, 1, '$$'],
				[GroovyTokenId.DollarSlashyGStringSlashEscape, 4, 6, 1, '$/'],
				[GroovyTokenId.DollarSlashyGStringEndMark, 6, 8, 1, '/$']
			]]
		]]);
	});
	test('Dollar Slashy GString Literal: Undetermined chars', async () => {
		const ast = builder.ast('$/\\/#@ /$');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 9, 1, '$/\\/#@ /$', [
			[GroovyTokenId.DollarSlashyGStringLiteral, 0, 9, 1, '$/\\/#@ /$', [
				[GroovyTokenId.DollarSlashyGStringStartMark, 0, 2, 1, '$/'],
				[GroovyTokenId.UndeterminedChar, 2, 3, 1, '\\'],
				[GroovyTokenId.UndeterminedChar, 3, 4, 1, '/'],
				[GroovyTokenId.UndeterminedChar, 4, 5, 1, '#'],
				[GroovyTokenId.UndeterminedChar, 5, 6, 1, '@'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.DollarSlashyGStringEndMark, 7, 9, 1, '/$']
			]]
		]]);
	});
	test('Dollar Slashy GString Literal: Word', async () => {
		const ast = builder.ast('$/\\abc /$');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 9, 1, '$/\\abc /$', [
			[GroovyTokenId.DollarSlashyGStringLiteral, 0, 9, 1, '$/\\abc /$', [
				[GroovyTokenId.DollarSlashyGStringStartMark, 0, 2, 1, '$/'],
				[GroovyTokenId.UndeterminedChar, 2, 3, 1, '\\'],
				[GroovyTokenId.Word, 3, 6, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.DollarSlashyGStringEndMark, 7, 9, 1, '/$']
			]]
		]]);
	});
	test('Dollar Slashy GString Literal: Newline escape #1', async () => {
		const ast = builder.ast('$/ \\\n/$');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 7, 1, '$/ \\\n/$', [
			[GroovyTokenId.DollarSlashyGStringLiteral, 0, 7, 1, '$/ \\\n/$', [
				[GroovyTokenId.DollarSlashyGStringStartMark, 0, 2, 1, '$/'],
				[GroovyTokenId.Whitespaces, 2, 3, 1, ' '],
				[GroovyTokenId.StringMLNewlineEraser, 3, 4, 1, '\\'],
				[GroovyTokenId.Newline, 4, 5, 1, '\n'],
				[GroovyTokenId.DollarSlashyGStringEndMark, 5, 7, 2, '/$']
			]]
		]]);
	});
	test('Dollar Slashy GString Literal: Newline escape #2', async () => {
		const ast = builder.ast('$/ \\\r\n/$');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 8, 1, '$/ \\\r\n/$', [
			[GroovyTokenId.DollarSlashyGStringLiteral, 0, 8, 1, '$/ \\\r\n/$', [
				[GroovyTokenId.DollarSlashyGStringStartMark, 0, 2, 1, '$/'],
				[GroovyTokenId.Whitespaces, 2, 3, 1, ' '],
				[GroovyTokenId.StringMLNewlineEraser, 3, 4, 1, '\\'],
				[GroovyTokenId.Newline, 4, 6, 1, '\r\n'],
				[GroovyTokenId.DollarSlashyGStringEndMark, 6, 8, 2, '/$']
			]]
		]]);
	});
	test('Dollar Slashy GString Literal: Interpolation without brace', async () => {
		const ast = builder.ast('$/$$ $$$abc $/$abc $/$$$abc $abc. $$$abc $/$abc $/$$$abc $1$abc$abc/$');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 69, 1, '$/$$ $$$abc $/$abc $/$$$abc $abc. $$$abc $/$abc $/$$$abc $1$abc$abc/$', [
			[GroovyTokenId.DollarSlashyGStringLiteral, 0, 69, 1, '$/$$ $$$abc $/$abc $/$$$abc $abc. $$$abc $/$abc $/$$$abc $1$abc$abc/$', [
				[GroovyTokenId.DollarSlashyGStringStartMark, 0, 2, 1, '$/'],
				[GroovyTokenId.DollarSlashyGStringDollarEscape, 2, 4, 1, '$$'],
				[GroovyTokenId.Whitespaces, 4, 5, 1, ' '],
				[GroovyTokenId.DollarSlashyGStringDollarEscape, 5, 7, 1, '$$'],
				[GroovyTokenId.UndeterminedChar, 7, 8, 1, '$'],
				[GroovyTokenId.Word, 8, 11, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 11, 12, 1, ' '],
				[GroovyTokenId.DollarSlashyGStringSlashEscape, 12, 14, 1, '$/'],
				[GroovyTokenId.UndeterminedChar, 14, 15, 1, '$'],
				[GroovyTokenId.Word, 15, 18, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 18, 19, 1, ' '],
				[GroovyTokenId.DollarSlashyGStringSlashEscape, 19, 21, 1, '$/'],
				[GroovyTokenId.DollarSlashyGStringDollarEscape, 21, 23, 1, '$$'],
				[GroovyTokenId.UndeterminedChar, 23, 24, 1, '$'],
				[GroovyTokenId.Word, 24, 27, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 27, 28, 1, ' '],
				[GroovyTokenId.GStringInterpolation, 28, 32, 1, '$abc', [
					[GroovyTokenId.GStringInterpolationStartMark, 28, 29, 1, '$'],
					[GroovyTokenId.Identifier, 29, 32, 1, 'abc']
				]],
				[GroovyTokenId.Dot, 32, 33, 1, '.'],
				[GroovyTokenId.Whitespaces, 33, 34, 1, ' '],
				[GroovyTokenId.DollarSlashyGStringDollarEscape, 34, 36, 1, '$$'],
				[GroovyTokenId.GStringInterpolation, 36, 40, 1, '$abc', [
					[GroovyTokenId.GStringInterpolationStartMark, 36, 37, 1, '$'],
					[GroovyTokenId.Identifier, 37, 40, 1, 'abc']
				]],
				[GroovyTokenId.Whitespaces, 40, 41, 1, ' '],
				[GroovyTokenId.DollarSlashyGStringSlashEscape, 41, 43, 1, '$/'],
				[GroovyTokenId.UndeterminedChar, 43, 44, 1, '$'],
				[GroovyTokenId.Word, 44, 47, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 47, 48, 1, ' '],
				[GroovyTokenId.DollarSlashyGStringSlashEscape, 48, 50, 1, '$/'],
				[GroovyTokenId.DollarSlashyGStringDollarEscape, 50, 52, 1, '$$'],
				[GroovyTokenId.UndeterminedChar, 52, 53, 1, '$'],
				[GroovyTokenId.Word, 53, 56, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 56, 57, 1, ' '],
				[GroovyTokenId.UndeterminedChar, 57, 58, 1, '$'],
				[GroovyTokenId.Word, 58, 59, 1, '1'],
				[GroovyTokenId.GStringInterpolation, 59, 63, 1, '$abc', [
					[GroovyTokenId.GStringInterpolationStartMark, 59, 60, 1, '$'],
					[GroovyTokenId.Identifier, 60, 63, 1, 'abc']
				]],
				[GroovyTokenId.GStringInterpolation, 63, 67, 1, '$abc', [
					[GroovyTokenId.GStringInterpolationStartMark, 63, 64, 1, '$'],
					[GroovyTokenId.Identifier, 64, 67, 1, 'abc']
				]],
				[GroovyTokenId.DollarSlashyGStringEndMark, 67, 69, 1, '/$']
			]]
		]]);
	});
});
