import {buildAstBuilder, NumericLiteralTokenCaptors} from '../../src';

describe('Capture number', () => {
	const ast = buildAstBuilder({verbose: true, captors: NumericLiteralTokenCaptors});

	test('Capture Binary Literal', async () => {
		const cu = ast.ast('0b010');
		expect(cu).not.toBeNull();
	});
});
