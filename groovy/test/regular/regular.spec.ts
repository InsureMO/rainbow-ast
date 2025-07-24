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
		const ast = DGP.parse(text, {verbose: true, shebang: true});
		let l = 0;
		AstChecker.check(ast, [T.CompilationUnit, l++, text.length, 1, text, [
			[T.Shebang, 0, 21, l, '#!/usr/bin/env groovy', [
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
			[T.Newline, 21, 22, l++, '\n'],
			[T.Whitespaces, 22, 24, l, '  '],
			[T.Tabs, 24, 26, l, '\t\t'],
			[T.UndeterminedChar, 26, 27, l, '#'],
			[T.Newline, 27, 28, l++, '\n'],
			[T.SLComment, 28, 69, l, '// {}[]()<>/\\~@#$%^&*?-+=_|\'"`.,:; sl\tcmt', [
				[T.SLCommentStartMark, 28, 30, l, '//'],
				[T.Whitespaces, 30, 31, l, ' '],
				[T.LBrace, 31, 32, l, '{'],
				[T.RBrace, 32, 33, l, '}'],
				[T.LBrack, 33, 34, l, '['],
				[T.RBrack, 34, 35, l, ']'],
				[T.LParen, 35, 36, l, '('],
				[T.RParen, 36, 37, l, ')'],
				[T.LAngle, 37, 38, l, '<'],
				[T.RAngle, 38, 39, l, '>'],
				[T.Slash, 39, 40, l, '/'],
				[T.Backslash, 40, 41, l, '\\'],
				[T.Tilde, 41, 42, l, '~'],
				[T.At, 42, 43, l, '@'],
				[T.Hash, 43, 44, l, '#'],
				[T.Dollar, 44, 45, l, '$'],
				[T.Percent, 45, 46, l, '%'],
				[T.Exponent, 46, 47, l, '^'],
				[T.And, 47, 48, l, '&'],
				[T.Asterisk, 48, 49, l, '*'],
				[T.Question, 49, 50, l, '?'],
				[T.Minus, 50, 51, l, '-'],
				[T.Plus, 51, 52, l, '+'],
				[T.Equal, 52, 53, l, '='],
				[T.Underscore, 53, 54, l, '_'],
				[T.Pipe, 54, 55, l, '|'],
				[T.Quote, 55, 56, l, '\''],
				[T.DblQuote, 56, 57, l, '"'],
				[T.BackQuote, 57, 58, l, '`'],
				[T.Dot, 58, 59, l, '.'],
				[T.Comma, 59, 60, l, ','],
				[T.Colon, 60, 61, l, ':'],
				[T.Semicolon, 61, 62, l, ';'],
				[T.Whitespaces, 62, 63, l, ' '],
				[T.Word, 63, 65, l, 'sl'],
				[T.Tabs, 65, 66, l, '\t'],
				[T.Word, 66, 69, l, 'cmt']
			]],
			[T.Newline, 69, 70, l++, '\n'],
			[T.MLComment, 70, 75, l, '/*\n*/', [
				[T.MLCommentStartMark, 70, 72, l, '/*'],
				[T.Newline, 72, 73, l++, '\n'],
				[T.MLCommentEndMark, 73, 75, l, '*/']
			]],
			[T.Newline, 75, 76, l++, '\n'],
			[T.SLComment, 76, 90, l, '// number test', [
				[T.SLCommentStartMark, 76, 78, l, '//'],
				[T.Whitespaces, 78, 79, l, ' '],
				[T.Word, 79, 85, l, 'number'],
				[T.Whitespaces, 85, 86, l, ' '],
				[T.Word, 86, 90, l, 'test']
			]],
			[T.Newline, 90, 91, l++, '\n'],
			[T.IntegerLiteral, 91, 92, l, '0', [
				[T.Numbers, 91, 92, l, '0']
			]],
			[T.Newline, 92, 93, l++, '\n'],
			[T.OctalLiteral, 93, 95, l, '01', [
				[T.OctalStartMark, 93, 94, l, '0'],
				[T.Numbers, 94, 95, l, '1']
			]],
			[T.Newline, 95, 96, l++, '\n'],
			[T.BinaryLiteral, 96, 101, l, '0b01i', [
				[T.BinaryStartMark, 96, 98, l, '0b'],
				[T.Numbers, 98, 100, l, '01'],
				[T.NumberSuffix, 100, 101, l, 'i']
			]],
			[T.Newline, 101, 102, l++, '\n'],
			[T.HexadecimalLiteral, 102, 107, l, '0XFFG', [
				[T.HexadecimalStartMark, 102, 104, l, '0X'],
				[T.Numbers, 104, 106, l, 'FF'],
				[T.NumberSuffix, 106, 107, l, 'G']
			]],
			[T.Newline, 107, 108, l++, '\n'],
			[T.DecimalLiteral, 108, 111, l, '.1f', [
				[T.NumberDecimalPoint, 108, 109, l, '.'],
				[T.Numbers, 109, 110, l, '1'],
				[T.NumberSuffix, 110, 111, l, 'f']
			]],
			[T.Newline, 111, 112, l++, '\n'],
			[T.DecimalLiteral, 112, 116, l, '1.7D', [
				[T.Numbers, 112, 113, l, '1'],
				[T.NumberDecimalPoint, 113, 114, l, '.'],
				[T.Numbers, 114, 115, l, '7'],
				[T.NumberSuffix, 115, 116, l, 'D']
			]],
			[T.Newline, 116, 117, l++, '\n'],
			[T.DecimalLiteral, 117, 122, l, '2e+5g', [
				[T.Numbers, 117, 118, l, '2'],
				[T.NumberExponent, 118, 121, l, 'e+5', [
					[T.NumberExponentStartMark, 118, 119, l, 'e'],
					[T.NumberExponentSign, 119, 120, l, '+'],
					[T.Numbers, 120, 121, l, '5']
				]],
				[T.NumberSuffix, 121, 122, l, 'g']
			]],
			[T.Newline, 122, 123, l++, '\n'],
			[T.DecimalLiteral, 123, 131, l, '2.5E-3_1', [
				[T.Numbers, 123, 124, l, '2'],
				[T.NumberDecimalPoint, 124, 125, l, '.'],
				[T.Numbers, 125, 126, l, '5'],
				[T.NumberExponent, 126, 131, l, 'E-3_1', [
					[T.NumberExponentStartMark, 126, 127, l, 'E'],
					[T.NumberExponentSign, 127, 128, l, '-'],
					[T.Numbers, 128, 129, l, '3'],
					[T.NumberSeparators, 129, 130, l, '_'],
					[T.Numbers, 130, 131, l, '1']
				]]
			]],
			[T.Newline, 131, 132, l++, '\n'],
			[T.DecimalLiteral, 132, 141, l, '1__2.5_6F', [
				[T.Numbers, 132, 133, l, '1'],
				[T.NumberSeparators, 133, 135, l, '__'],
				[T.Numbers, 135, 136, l, '2'],
				[T.NumberDecimalPoint, 136, 137, l, '.'],
				[T.Numbers, 137, 138, l, '5'],
				[T.NumberSeparators, 138, 139, l, '_'],
				[T.Numbers, 139, 140, l, '6'],
				[T.NumberSuffix, 140, 141, l, 'F']
			]],
			[T.Newline, 141, 142, l++, '\n'],
			[T.SLComment, 142, 156, l, '// string test', [
				[T.SLCommentStartMark, 142, 144, l, '//'],
				[T.Whitespaces, 144, 145, l, ' '],
				[T.Word, 145, 151, l, 'string'],
				[T.Whitespaces, 151, 152, l, ' '],
				[T.Word, 152, 156, l, 'test']
			]],
			[T.Newline, 156, 157, l++, '\n'],
			[T.SsqSLiteral, 157, 162, l, '\'abc\'', [
				[T.SsqSLMark, 157, 158, l, '\''],
				[T.Word, 158, 161, l, 'abc'],
				[T.SsqSLMark, 161, 162, l, '\'']
			]],
			[T.Newline, 162, 163, l++, '\n'],
			[T.SsqSLiteral, 163, 196, l, '\' \t{}[]()<>/~@#$%^&*?-+=_|"`.,:;\'', [
				[T.SsqSLMark, 163, 164, l, '\''],
				[T.Whitespaces, 164, 165, l, ' '],
				[T.Tabs, 165, 166, l, '\t'],
				[T.LBrace, 166, 167, l, '{'],
				[T.RBrace, 167, 168, l, '}'],
				[T.LBrack, 168, 169, l, '['],
				[T.RBrack, 169, 170, l, ']'],
				[T.LParen, 170, 171, l, '('],
				[T.RParen, 171, 172, l, ')'],
				[T.LAngle, 172, 173, l, '<'],
				[T.RAngle, 173, 174, l, '>'],
				[T.Slash, 174, 175, l, '/'],
				[T.Tilde, 175, 176, l, '~'],
				[T.At, 176, 177, l, '@'],
				[T.Hash, 177, 178, l, '#'],
				[T.Dollar, 178, 179, l, '$'],
				[T.Percent, 179, 180, l, '%'],
				[T.Exponent, 180, 181, l, '^'],
				[T.And, 181, 182, l, '&'],
				[T.Asterisk, 182, 183, l, '*'],
				[T.Question, 183, 184, l, '?'],
				[T.Minus, 184, 185, l, '-'],
				[T.Plus, 185, 186, l, '+'],
				[T.Equal, 186, 187, l, '='],
				[T.Underscore, 187, 188, l, '_'],
				[T.Pipe, 188, 189, l, '|'],
				[T.DblQuote, 189, 190, l, '"'],
				[T.BackQuote, 190, 191, l, '`'],
				[T.Dot, 191, 192, l, '.'],
				[T.Comma, 192, 193, l, ','],
				[T.Colon, 193, 194, l, ':'],
				[T.Semicolon, 194, 195, l, ';'],
				[T.SsqSLMark, 195, 196, l, '\'']
			]],
			[T.Newline, 196, 197, l++, '\n']
		]]);
	});
});
