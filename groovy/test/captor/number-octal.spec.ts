import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Octal Literal', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Octal Literal: With suffix', async () => {
		const ast = builder.ast('0123g');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '0123g', [
			[GroovyTokenId.OctalLiteral, 0, 5, 1, '0123g', [
				[GroovyTokenId.OctalStartMark, 0, 1, 1, '0'],
				[GroovyTokenId.Number, 1, 4, 1, '123'],
				[GroovyTokenId.NumSuffix, 4, 5, 1, 'g']
			]]
		]]);
	});
	test('Octal Literal: With separator and suffix #1', async () => {
		const ast = builder.ast('0_123g');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, '0_123g', [
			[GroovyTokenId.OctalLiteral, 0, 6, 1, '0_123g', [
				[GroovyTokenId.OctalStartMark, 0, 1, 1, '0'],
				[GroovyTokenId.NumSep, 1, 2, 1, '_'],
				[GroovyTokenId.Number, 2, 5, 1, '123'],
				[GroovyTokenId.NumSuffix, 5, 6, 1, 'g']
			]]
		]]);
	});
	test('Octal Literal: With separator and suffix #2 ', async () => {
		const ast = builder.ast('01_23g');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, '01_23g', [
			[GroovyTokenId.OctalLiteral, 0, 6, 1, '01_23g', [
				[GroovyTokenId.OctalStartMark, 0, 1, 1, '0'],
				[GroovyTokenId.Number, 1, 2, 1, '1'],
				[GroovyTokenId.NumSep, 2, 3, 1, '_'],
				[GroovyTokenId.Number, 3, 5, 1, '23'],
				[GroovyTokenId.NumSuffix, 5, 6, 1, 'g']
			]]
		]]);
	});
});
