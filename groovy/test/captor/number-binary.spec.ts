import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Binary Literal', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Binary Literal: Simple', async () => {
		const ast = builder.ast('0b010');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '0b010', [
			[GroovyTokenId.BinaryLiteral, 0, 5, 1, '0b010', [
				[GroovyTokenId.BinaryStartMark, 0, 2, 1, '0b'],
				[GroovyTokenId.Number, 2, 5, 1, '010']
			]]
		]]);
	});
	test('Binary Literal: With suffix', async () => {
		const ast = builder.ast('0B010l');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, '0B010l', [
			[GroovyTokenId.BinaryLiteral, 0, 6, 1, '0B010l', [
				[GroovyTokenId.BinaryStartMark, 0, 2, 1, '0B'],
				[GroovyTokenId.Number, 2, 5, 1, '010'],
				[GroovyTokenId.NumSuffix, 5, 6, 1, 'l']
			]]
		]]);
	});
	test('Binary Literal: With separator and suffix', async () => {
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
	test('Binary Literal: Long', async () => {
		const ast = builder.ast('0b00000111110000011111l');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 23, 1, '0b00000111110000011111l', [
			[GroovyTokenId.BinaryLiteral, 0, 23, 1, '0b00000111110000011111l', [
				[GroovyTokenId.BinaryStartMark, 0, 2, 1, '0b'],
				[GroovyTokenId.Number, 2, 22, 1, '00000111110000011111'],
				[GroovyTokenId.NumSuffix, 22, 23, 1, 'l']
			]]
		]]);
	});
});
