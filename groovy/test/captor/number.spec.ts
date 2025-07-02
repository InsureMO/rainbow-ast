import {buildAstBuilder, NumericLiteralTokenCaptors} from '../../src';

describe('Capture number', () => {
	const ast = buildAstBuilder({verbose: true, captors: NumericLiteralTokenCaptors});

	test('Capture Binary Literal #1', async () => {
		const cu = ast.ast('0b010');
		expect(cu).not.toBeNull();
	});
	test('Capture Binary Literal #2', async () => {
		const cu = ast.ast('0b010l');
		expect(cu).not.toBeNull();
	});
	test('Capture Binary Literal #3', async () => {
		const cu = ast.ast('0b0__1_0l');
		expect(cu).not.toBeNull();
	});
	test('Capture Binary Literal #4', async () => {
		const cu = ast.ast('0b00000111110000011111l');
		expect(cu).not.toBeNull();
	});
});
