import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture string', () => {
	const builder = createDefaultAstBuilder({verbose: true});
	test('Capture String Literal #1', async () => {
		const ast = builder.ast(`'' ''`);
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, `'' ''`, [
			[GroovyTokenId.StringLiteral, 0, 2, 1, `''`, [
				[GroovyTokenId.StringMark, 0, 1, 1, `'`],
				[GroovyTokenId.StringMark, 1, 2, 1, `'`]
			]],
			[GroovyTokenId.Whitespaces, 2, 3, 1, ' '],
			[GroovyTokenId.StringLiteral, 3, 5, 1, `''`, [
				[GroovyTokenId.StringMark, 3, 4, 1, `'`],
				[GroovyTokenId.StringMark, 4, 5, 1, `'`]
			]]
		]]);
	});
});
