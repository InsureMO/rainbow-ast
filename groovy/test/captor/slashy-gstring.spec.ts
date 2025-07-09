import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Slashy GString Literal', () => {
	const builder = createDefaultAstBuilder({verbose: true});
	test('Slashy GString Literal: Empty string', async () => {
		const ast = builder.ast('/ /');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 3, 1, '/ /', [
			[GroovyTokenId.SlashyGStringLiteral, 0, 3, 1, '/ /', [
				[GroovyTokenId.SlashyGStringMark, 0, 1, 1, '/'],
				[GroovyTokenId.Whitespaces, 1, 2, 1, ' '],
				[GroovyTokenId.SlashyGStringMark, 2, 3, 1, '/']
			]]
		]]);
	});
	test('Slashy GString Literal: Escapes', async () => {
		const ast = builder.ast('/\\//');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 4, 1, '/\\//', [
			[GroovyTokenId.SlashyGStringLiteral, 0, 4, 1, '/\\//', [
				[GroovyTokenId.SlashyGStringMark, 0, 1, 1, '/'],
				[GroovyTokenId.SlashyGStringSlashEscape, 1, 3, 1, '\\/'],
				[GroovyTokenId.SlashyGStringMark, 3, 4, 1, '/']
			]]
		]]);
	});
	test('Slashy GString Literal: Undetermined chars', async () => {
		const ast = builder.ast('/#@ /');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '/#@ /', [
			[GroovyTokenId.SlashyGStringLiteral, 0, 5, 1, '/#@ /', [
				[GroovyTokenId.SlashyGStringMark, 0, 1, 1, '/'],
				[GroovyTokenId.UndeterminedChar, 1, 2, 1, '#'],
				[GroovyTokenId.UndeterminedChar, 2, 3, 1, '@'],
				[GroovyTokenId.Whitespaces, 3, 4, 1, ' '],
				[GroovyTokenId.SlashyGStringMark, 4, 5, 1, '/']
			]]
		]]);
	});
	test('Slashy GString Literal: Word', async () => {
		const ast = builder.ast('/\\abc /');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 7, 1, '/\\abc /', [
			[GroovyTokenId.SlashyGStringLiteral, 0, 7, 1, '/\\abc /', [
				[GroovyTokenId.SlashyGStringMark, 0, 1, 1, '/'],
				[GroovyTokenId.UndeterminedChar, 1, 2, 1, '\\'],
				[GroovyTokenId.Word, 2, 5, 1, 'abc'],
				[GroovyTokenId.Whitespaces, 5, 6, 1, ' '],
				[GroovyTokenId.SlashyGStringMark, 6, 7, 1, '/']
			]]
		]]);
	});
	test('Slashy GString Literal: Newline escape #1', async () => {
		const ast = builder.ast('/ \\\n/');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '/ \\\n/', [
			[GroovyTokenId.SlashyGStringLiteral, 0, 5, 1, '/ \\\n/', [
				[GroovyTokenId.SlashyGStringMark, 0, 1, 1, '/'],
				[GroovyTokenId.Whitespaces, 1, 2, 1, ' '],
				[GroovyTokenId.StringMLNewlineEraser, 2, 3, 1, '\\'],
				[GroovyTokenId.Newline, 3, 4, 1, '\n'],
				[GroovyTokenId.SlashyGStringMark, 4, 5, 2, '/']
			]]
		]]);
	});
	test('Slashy GString Literal: Newline escape #2', async () => {
		const ast = builder.ast('/ \\\r\n/');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, '/ \\\r\n/', [
			[GroovyTokenId.SlashyGStringLiteral, 0, 6, 1, '/ \\\r\n/', [
				[GroovyTokenId.SlashyGStringMark, 0, 1, 1, '/'],
				[GroovyTokenId.Whitespaces, 1, 2, 1, ' '],
				[GroovyTokenId.StringMLNewlineEraser, 2, 3, 1, '\\'],
				[GroovyTokenId.Newline, 3, 5, 1, '\r\n'],
				[GroovyTokenId.SlashyGStringMark, 5, 6, 2, '/']
			]]
		]]);
	});
	test('Slashy GString Literal: Interpolation without brace', async () => {
		const ast = builder.ast('/$abc$abc. $1/');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 14, 1, '/$abc$abc. $1/', [
			[GroovyTokenId.SlashyGStringLiteral, 0, 14, 1, '/$abc$abc. $1/', [
				[GroovyTokenId.SlashyGStringMark, 0, 1, 1, '/'],
				[GroovyTokenId.GStringInterpolation, 1, 5, 1, '$abc', [
					[GroovyTokenId.GStringInterpolationStartMark, 1, 2, 1, '$'],
					[GroovyTokenId.Identifier, 2, 5, 1, 'abc']
				]],
				[GroovyTokenId.GStringInterpolation, 5, 9, 1, '$abc', [
					[GroovyTokenId.GStringInterpolationStartMark, 5, 6, 1, '$'],
					[GroovyTokenId.Identifier, 6, 9, 1, 'abc']
				]],
				[GroovyTokenId.Dot, 9, 10, 1, '.'],
				[GroovyTokenId.Whitespaces, 10, 11, 1, ' '],
				[GroovyTokenId.UndeterminedChar, 11, 12, 1, '$'],
				[GroovyTokenId.Word, 12, 13, 1, '1'],
				[GroovyTokenId.SlashyGStringMark, 13, 14, 1, '/']
			]]
		]]);
	});
});
