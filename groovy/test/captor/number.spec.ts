import {buildAstBuilder, GroovyTokenId, NumericLiteralTokenCaptors} from '../../src';
import {AstChecker} from '../utils/ast-checker';

describe('Capture number', () => {
	const builder = buildAstBuilder({verbose: true, captors: NumericLiteralTokenCaptors});

	test('Capture Binary Literal #1', async () => {
		const ast = builder.ast('0b010');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '0b010', [
			[GroovyTokenId.BinaryLiteral, 0, 5, 1, '0b010', [
				[GroovyTokenId.BinaryStartMark, 0, 2, 1, '0b'],
				[GroovyTokenId.Number, 2, 5, 1, '010']
			]]
		]]);
	});
	test('Capture Binary Literal #2', async () => {
		const ast = builder.ast('0B010l');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, '0B010l', [
			[GroovyTokenId.BinaryLiteral, 0, 6, 1, '0B010l', [
				[GroovyTokenId.BinaryStartMark, 0, 2, 1, '0B'],
				[GroovyTokenId.Number, 2, 5, 1, '010'],
				[GroovyTokenId.NumSuffix, 5, 6, 1, 'l']
			]]
		]]);
	});
	test('Capture Binary Literal #3', async () => {
		const ast = builder.ast('0B0__1_0l');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 9, 1, '0B0__1_0l', [
			[GroovyTokenId.BinaryLiteral, 0, 9, 1, '0B0__1_0l', [
				[GroovyTokenId.BinaryStartMark, 0, 2, 1, '0B'],
				[GroovyTokenId.Number, 2, 3, 1, '0'],
				[GroovyTokenId.NumSep, 3, 5, 1, '__'],
				[GroovyTokenId.Number, 5, 6, 1, '1'],
				[GroovyTokenId.NumSep, 6, 7, 1, '_'],
				[GroovyTokenId.Number, 7, 8, 1, '0'],
				[GroovyTokenId.NumSuffix, 8, 9, 1, 'l']
			]]
		]]);
	});
	test('Capture Binary Literal #4', async () => {
		const ast = builder.ast('0b00000111110000011111l');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 23, 1, '0b00000111110000011111l', [
			[GroovyTokenId.BinaryLiteral, 0, 23, 1, '0b00000111110000011111l', [
				[GroovyTokenId.BinaryStartMark, 0, 2, 1, '0b'],
				[GroovyTokenId.Number, 2, 22, 1, '00000111110000011111'],
				[GroovyTokenId.NumSuffix, 22, 23, 1, 'l']
			]]
		]]);
	});
	test('Capture Hexadecimal Literal #1', async () => {
		const ast = builder.ast('0x0f');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 4, 1, '0x0f', [
			[GroovyTokenId.HexadecimalLiteral, 0, 4, 1, '0x0f', [
				[GroovyTokenId.HexStartMark, 0, 2, 1, '0x'],
				[GroovyTokenId.Number, 2, 4, 1, '0f']
			]]
		]]);
	});
	test('Capture Hexadecimal Literal #2', async () => {
		const ast = builder.ast('0X0fI');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '0X0fI', [
			[GroovyTokenId.HexadecimalLiteral, 0, 5, 1, '0X0fI', [
				[GroovyTokenId.HexStartMark, 0, 2, 1, '0X'],
				[GroovyTokenId.Number, 2, 4, 1, '0f'],
				[GroovyTokenId.NumSuffix, 4, 5, 1, 'I']
			]]
		]]);
	});
	test('Capture Number Literal #1', async () => {
		const ast = builder.ast('12_3.45__6e+7_8g');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 16, 1, '12_3.45__6e+7_8g', [
			[GroovyTokenId.DecimalLiteral, 0, 16, 1, '12_3.45__6e+7_8g', [
				[GroovyTokenId.Number, 0, 2, 1, '12'],
				[GroovyTokenId.NumSep, 2, 3, 1, '_'],
				[GroovyTokenId.Number, 3, 4, 1, '3'],
				[GroovyTokenId.NumDot, 4, 5, 1, '.'],
				[GroovyTokenId.Number, 5, 7, 1, '45'],
				[GroovyTokenId.NumSep, 7, 9, 1, '__'],
				[GroovyTokenId.Number, 9, 10, 1, '6'],
				[GroovyTokenId.NumExponent, 10, 11, 1, 'e'],
				[GroovyTokenId.NumExponentSign, 11, 12, 1, '+'],
				[GroovyTokenId.Number, 12, 13, 1, '7'],
				[GroovyTokenId.NumSep, 13, 14, 1, '_'],
				[GroovyTokenId.Number, 14, 15, 1, '8'],
				[GroovyTokenId.NumSuffix, 15, 16, 1, 'g']
			]]
		]]);
	});
});
