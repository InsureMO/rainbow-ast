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
				[GroovyTokenId.NumIntSuffix, 5, 6, 1, 'l']
			]]
		]]);
	});
	test('Capture Binary Literal #3', async () => {
		const ast = builder.ast('0B0__1_0l');
		// expect(cu).not.toBeNull();
	});
	test('Capture Binary Literal #4', async () => {
		const ast = builder.ast('0b00000111110000011111l');
		// expect(cu).not.toBeNull();
	});
	test('Capture Hexadecimal Literal #1', async () => {
		const ast = builder.ast('0x0f');
		// expect(cu).not.toBeNull();
	});
	test('Capture Hexadecimal Literal #2', async () => {
		const ast = builder.ast('0X0fI');
		// expect(cu).not.toBeNull();
	});
});
