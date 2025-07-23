import * as fs from 'fs';
import * as path from 'path';
import {DGP, T} from '../../src';
import {AstChecker} from '../utils';

const readFileAsText = (filePath: string): string => {
	const absolutePath = path.join(__dirname, filePath);
	return fs.readFileSync(absolutePath, 'utf8');
};

describe('Regular test', () => {
	test('Regular test', async () => {
		const text = readFileAsText('regular.groovy');
		const ast = DGP.parse(text, {shebang: true});
		AstChecker.check(ast, [T.CompilationUnit, 0, text.length, 1, text, [
			[T.Shebang, 0, 21, 1, '#!/usr/bin/env groovy', [
				[T.ShebangStartMark, 0, 2, 1, '#!'],
				[T.Slash, 2, 3, 1, '/'],
				[T.Word, 3, 6, 1, 'usr'],
				[T.Slash, 6, 7, 1, '/'],
				[T.Word, 7, 10, 1, 'bin'],
				[T.Slash, 10, 11, 1, '/'],
				[T.Word, 11, 14, 1, 'env'],
				[T.Whitespaces, 14, 15, 1, ' '],
				[T.Word, 15, 21, 1, 'groovy']
			]],
			[T.Newline, 21, 22, 1, '\n'],
			[T.Whitespaces, 22, 24, 2, '  '],
			[T.Tabs, 24, 26, 2, '\t\t'],
			[T.UndeterminedChar, 26, 27, 2, '#'],
			[T.Newline, 27, 28, 2, '\n'],
		]]);
	});
});
