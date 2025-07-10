import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture ML Comment', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('ML Comment: Empty', async () => {
		const ast = builder.ast('/**/');
		// noinspection DuplicatedCode
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 4, 1, '/**/', [
			[GroovyTokenId.MLComment, 0, 4, 1, '/**/', [
				[GroovyTokenId.MLCommentStartMark, 0, 2, 1, '/*'],
				[GroovyTokenId.MLCommentEndMark, 2, 4, 1, '*/']
			]]
		]]);
	});

	test('ML Comment: Simple', async () => {
		const ast = builder.ast('/*/usr/bin/python3\n * test*/');
		// noinspection DuplicatedCode
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 28, 1, '/*/usr/bin/python3\n * test*/', [
			[GroovyTokenId.MLComment, 0, 28, 1, '/*/usr/bin/python3\n * test*/', [
				[GroovyTokenId.MLCommentStartMark, 0, 2, 1, '/*'],
				[GroovyTokenId.UndeterminedChar, 2, 3, 1, '/'],
				[GroovyTokenId.Word, 3, 6, 1, 'usr'],
				[GroovyTokenId.UndeterminedChar, 6, 7, 1, '/'],
				[GroovyTokenId.Word, 7, 10, 1, 'bin'],
				[GroovyTokenId.UndeterminedChar, 10, 11, 1, '/'],
				[GroovyTokenId.Word, 11, 18, 1, 'python3'],
				[GroovyTokenId.Newline, 18, 19, 1, '\n'],
				[GroovyTokenId.Whitespaces, 19, 20, 2, ' '],
				[GroovyTokenId.UndeterminedChar, 20, 21, 2, '*'],
				[GroovyTokenId.Whitespaces, 21, 22, 2, ' '],
				[GroovyTokenId.Word, 22, 26, 2, 'test'],
				[GroovyTokenId.MLCommentEndMark, 26, 28, 2, '*/']
			]]
		]]);
	});
});
