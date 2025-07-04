import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Decimal Literal', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Capture Decimal Literal #1', async () => {
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
