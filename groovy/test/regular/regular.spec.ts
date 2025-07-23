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
		const text = readFileAsText('test.groovy');
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
			[T.SLComment, 28, 69, 3, '// {}[]()<>/\\~@#$%^&*?-+=_|\'"`.,:; sl\tcmt', [
				[T.SLCommentStartMark, 28, 30, 3, '//'],
				[T.Whitespaces, 30, 31, 3, ' '],
				[T.LBrace, 31, 32, 3, '{'],
				[T.RBrace, 32, 33, 3, '}'],
				[T.LBrack, 33, 34, 3, '['],
				[T.RBrack, 34, 35, 3, ']'],
				[T.LParen, 35, 36, 3, '('],
				[T.RParen, 36, 37, 3, ')'],
				[T.LAngle, 37, 38, 3, '<'],
				[T.RAngle, 38, 39, 3, '>'],
				[T.Slash, 39, 40, 3, '/'],
				[T.Backslash, 40, 41, 3, '\\'],
				[T.Tilde, 41, 42, 3, '~'],
				[T.At, 42, 43, 3, '@'],
				[T.Hash, 43, 44, 3, '#'],
				[T.Dollar, 44, 45, 3, '$'],
				[T.Percent, 45, 46, 3, '%'],
				[T.Exponent, 46, 47, 3, '^'],
				[T.And, 47, 48, 3, '&'],
				[T.Asterisk, 48, 49, 3, '*'],
				[T.Question, 49, 50, 3, '?'],
				[T.Minus, 50, 51, 3, '-'],
				[T.Plus, 51, 52, 3, '+'],
				[T.Equal, 52, 53, 3, '='],
				[T.Underscore, 53, 54, 3, '_'],
				[T.Pipe, 54, 55, 3, '|'],
				[T.Quote, 55, 56, 3, '\''],
				[T.DblQuote, 56, 57, 3, '"'],
				[T.BackQuote, 57, 58, 3, '`'],
				[T.Dot, 58, 59, 3, '.'],
				[T.Comma, 59, 60, 3, ','],
				[T.Colon, 60, 61, 3, ':'],
				[T.Semicolon, 61, 62, 3, ';'],
				[T.Whitespaces, 62, 63, 3, ' '],
				[T.Word, 63, 65, 3, 'sl'],
				[T.Tabs, 65, 66, 3, '\t'],
				[T.Word, 66, 69, 3, 'cmt']
			]],
			[T.Newline, 69, 70, 3, '\n']
		]]);
	});
});
