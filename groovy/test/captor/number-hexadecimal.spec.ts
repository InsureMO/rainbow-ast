import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Hexadecimal Literal', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Hexadecimal Literal: Simple', async () => {
		const ast = builder.ast('0x0f');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 4, 1, '0x0f', [
			[GroovyTokenId.HexadecimalLiteral, 0, 4, 1, '0x0f', [
				[GroovyTokenId.HexStartMark, 0, 2, 1, '0x'],
				[GroovyTokenId.Number, 2, 4, 1, '0f']
			]]
		]]);
	});
	test('Hexadecimal Literal: With suffix', async () => {
		const ast = builder.ast('0X0fI');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '0X0fI', [
			[GroovyTokenId.HexadecimalLiteral, 0, 5, 1, '0X0fI', [
				[GroovyTokenId.HexStartMark, 0, 2, 1, '0X'],
				[GroovyTokenId.Number, 2, 4, 1, '0f'],
				[GroovyTokenId.NumSuffix, 4, 5, 1, 'I']
			]]
		]]);
	});
});
