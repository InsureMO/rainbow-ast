import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Integral Literal', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Integral Literal: With suffix', async () => {
		const ast = builder.ast('123g');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 4, 1, '123g', [
			[GroovyTokenId.IntegralLiteral, 0, 4, 1, '123g', [
				[GroovyTokenId.Number, 0, 3, 1, '123'],
				[GroovyTokenId.NumSuffix, 3, 4, 1, 'g']
			]]
		]]);
	});
});
