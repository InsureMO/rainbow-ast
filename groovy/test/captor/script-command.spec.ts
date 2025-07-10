import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Script Command', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Script Command: Simple #1', async () => {
		const ast = builder.ast('#!/usr/bin/python3');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 18, 1, '#!/usr/bin/python3', [
			[GroovyTokenId.ScriptCommand, 0, 18, 1, '#!/usr/bin/python3', [
				[GroovyTokenId.ScriptCommandStartMark, 0, 2, 1, '#!'],
				[GroovyTokenId.UndeterminedChar, 2, 3, 1, '/'],
				[GroovyTokenId.Word, 3, 6, 1, 'usr'],
				[GroovyTokenId.UndeterminedChar, 6, 7, 1, '/'],
				[GroovyTokenId.Word, 7, 10, 1, 'bin'],
				[GroovyTokenId.UndeterminedChar, 10, 11, 1, '/'],
				[GroovyTokenId.Word, 11, 18, 1, 'python3']
			]]
		]]);
	});

	test('Script Command: Simple #2', async () => {
		const ast = builder.ast('#!/usr/bin/python3\n#! test');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 26, 1, '#!/usr/bin/python3\n#! test', [
			[GroovyTokenId.ScriptCommand, 0, 18, 1, '#!/usr/bin/python3', [
				[GroovyTokenId.ScriptCommandStartMark, 0, 2, 1, '#!'],
				[GroovyTokenId.UndeterminedChar, 2, 3, 1, '/'],
				[GroovyTokenId.Word, 3, 6, 1, 'usr'],
				[GroovyTokenId.UndeterminedChar, 6, 7, 1, '/'],
				[GroovyTokenId.Word, 7, 10, 1, 'bin'],
				[GroovyTokenId.UndeterminedChar, 10, 11, 1, '/'],
				[GroovyTokenId.Word, 11, 18, 1, 'python3']
			]],
			[GroovyTokenId.Newline, 18, 19, 1, '\n'],
			[GroovyTokenId.UndeterminedChar, 19, 20, 2, '#'],
			[GroovyTokenId.UndeterminedChar, 20, 21, 2, '!'],
			[GroovyTokenId.Whitespaces, 21, 22, 2, ' '],
			[GroovyTokenId.Identifier, 22, 26, 2, 'test']
		]]);
	});
});
