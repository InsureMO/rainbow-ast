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
				[T.Ampersand, 47, 48, l, '&'],
				[T.Asterisk, 48, 49, l, '*'],
				[T.QuestionS, 49, 50, l, '?'],
				[T.Minus, 50, 51, l, '-'],
				[T.Plus, 51, 52, l, '+'],
				[T.EqualS, 52, 53, l, '='],
				[T.Underscore, 53, 54, l, '_'],
				[T.Pipe, 54, 55, l, '|'],
				[T.Quote, 55, 56, l, '\''],
				[T.DblQuote, 56, 57, l, '"'],
				[T.BackQuote, 57, 58, l, '`'],
				[T.Dot, 58, 59, l, '.'],
				[T.Comma, 59, 60, l, ','],
				[T.ColonS, 60, 61, l, ':'],
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
				[T.Ampersand, 181, 182, l, '&'],
				[T.Asterisk, 182, 183, l, '*'],
				[T.QuestionS, 183, 184, l, '?'],
				[T.Minus, 184, 185, l, '-'],
				[T.Plus, 185, 186, l, '+'],
				[T.EqualS, 186, 187, l, '='],
				[T.Underscore, 187, 188, l, '_'],
				[T.Pipe, 188, 189, l, '|'],
				[T.DblQuote, 189, 190, l, '"'],
				[T.BackQuote, 190, 191, l, '`'],
				[T.Dot, 191, 192, l, '.'],
				[T.Comma, 192, 193, l, ','],
				[T.ColonS, 193, 194, l, ':'],
				[T.Semicolon, 194, 195, l, ';'],
				[T.SsqSLMark, 195, 196, l, '\'']
			]],
			[T.Newline, 196, 197, l++, '\n'],
			[T.SsqSLiteral, 197, 235, l, '\'\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\c\\ \'', [
				[T.SsqSLMark, 197, 198, l, '\''],
				[T.OctalEscape, 198, 200, l, '\\0', [
					[T.OctalEscapeStartMark, 198, 199, l, '\\'],
					[T.OctalEscapeContent, 199, 200, l, '0']
				]],
				[T.OctalEscape, 200, 203, l, '\\12', [
					[T.OctalEscapeStartMark, 200, 201, l, '\\'],
					[T.OctalEscapeContent, 201, 203, l, '12']
				]],
				[T.OctalEscape, 203, 207, l, '\\345', [
					[T.OctalEscapeStartMark, 203, 204, l, '\\'],
					[T.OctalEscapeContent, 204, 207, l, '345']
				]],
				[T.BadEscape, 207, 209, l, '\\8'],
				[T.Word, 209, 210, l, '9'],
				[T.UnicodeEscape, 210, 212, l, '\\u', [
					[T.UnicodeEscapeStartMark, 210, 212, l, '\\u']
				]],
				[T.UnicodeEscape, 212, 215, l, '\\u0', [
					[T.UnicodeEscapeStartMark, 212, 214, l, '\\u'],
					[T.UnicodeEscapeContent, 214, 215, l, '0']
				]],
				[T.UnicodeEscape, 215, 219, l, '\\u12', [
					[T.UnicodeEscapeStartMark, 215, 217, l, '\\u'],
					[T.UnicodeEscapeContent, 217, 219, l, '12']
				]],
				[T.UnicodeEscape, 219, 224, l, '\\u345', [
					[T.UnicodeEscapeStartMark, 219, 221, l, '\\u'],
					[T.UnicodeEscapeContent, 221, 224, l, '345']
				]],
				[T.UnicodeEscape, 224, 230, l, '\\uabcd', [
					[T.UnicodeEscapeStartMark, 224, 226, l, '\\u'],
					[T.UnicodeEscapeContent, 226, 230, l, 'abcd']
				]],
				[T.BadEscape, 230, 232, l, '\\c'],
				[T.BadEscape, 232, 233, l, '\\'],
				[T.Whitespaces, 233, 234, l, ' '],
				[T.SsqSLMark, 234, 235, l, '\'']
			]],
			[T.Newline, 235, 236, l++, '\n'],
			[T.SsqSLiteral, 236, 238, l, '\'\\', [
				[T.SsqSLMark, 236, 237, l, '\''],
				[T.BadEscape, 237, 238, l, '\\']
			]],
			[T.Newline, 238, 239, l++, '\n'],
			[T.TsqSLiteral, 239, 322, l, '\'\'\' \t{}[]()<>/~@#$%^&*?-+=_|\'"`.,:;\n\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\ \\c\nabc\\\n\\\n\'\'\'', [
				[T.TsqSLMark, 239, 242, l, '\'\'\''],
				[T.Whitespaces, 242, 243, l, ' '],
				[T.Tabs, 243, 244, l, '\t'],
				[T.LBrace, 244, 245, l, '{'],
				[T.RBrace, 245, 246, l, '}'],
				[T.LBrack, 246, 247, l, '['],
				[T.RBrack, 247, 248, l, ']'],
				[T.LParen, 248, 249, l, '('],
				[T.RParen, 249, 250, l, ')'],
				[T.LAngle, 250, 251, l, '<'],
				[T.RAngle, 251, 252, l, '>'],
				[T.Slash, 252, 253, l, '/'],
				[T.Tilde, 253, 254, l, '~'],
				[T.At, 254, 255, l, '@'],
				[T.Hash, 255, 256, l, '#'],
				[T.Dollar, 256, 257, l, '$'],
				[T.Percent, 257, 258, l, '%'],
				[T.Exponent, 258, 259, l, '^'],
				[T.Ampersand, 259, 260, l, '&'],
				[T.Asterisk, 260, 261, l, '*'],
				[T.QuestionS, 261, 262, l, '?'],
				[T.Minus, 262, 263, l, '-'],
				[T.Plus, 263, 264, l, '+'],
				[T.EqualS, 264, 265, l, '='],
				[T.Underscore, 265, 266, l, '_'],
				[T.Pipe, 266, 267, l, '|'],
				[T.Quote, 267, 268, l, '\''],
				[T.DblQuote, 268, 269, l, '"'],
				[T.BackQuote, 269, 270, l, '`'],
				[T.Dot, 270, 271, l, '.'],
				[T.Comma, 271, 272, l, ','],
				[T.ColonS, 272, 273, l, ':'],
				[T.Semicolon, 273, 274, l, ';'],
				[T.Newline, 274, 275, l++, '\n'],
				[T.OctalEscape, 275, 277, l, '\\0', [
					[T.OctalEscapeStartMark, 275, 276, l, '\\'],
					[T.OctalEscapeContent, 276, 277, l, '0']
				]],
				[T.OctalEscape, 277, 280, l, '\\12', [
					[T.OctalEscapeStartMark, 277, 278, l, '\\'],
					[T.OctalEscapeContent, 278, 280, l, '12']
				]],
				[T.OctalEscape, 280, 284, l, '\\345', [
					[T.OctalEscapeStartMark, 280, 281, l, '\\'],
					[T.OctalEscapeContent, 281, 284, l, '345']
				]],
				[T.BadEscape, 284, 286, l, '\\8'],
				[T.Word, 286, 287, l, '9'],
				[T.UnicodeEscape, 287, 289, l, '\\u', [
					[T.UnicodeEscapeStartMark, 287, 289, l, '\\u']
				]],
				[T.UnicodeEscape, 289, 292, l, '\\u0', [
					[T.UnicodeEscapeStartMark, 289, 291, l, '\\u'],
					[T.UnicodeEscapeContent, 291, 292, l, '0']
				]],
				[T.UnicodeEscape, 292, 296, l, '\\u12', [
					[T.UnicodeEscapeStartMark, 292, 294, l, '\\u'],
					[T.UnicodeEscapeContent, 294, 296, l, '12']
				]],
				[T.UnicodeEscape, 296, 301, l, '\\u345', [
					[T.UnicodeEscapeStartMark, 296, 298, l, '\\u'],
					[T.UnicodeEscapeContent, 298, 301, l, '345']
				]],
				[T.UnicodeEscape, 301, 307, l, '\\uabcd', [
					[T.UnicodeEscapeStartMark, 301, 303, l, '\\u'],
					[T.UnicodeEscapeContent, 303, 307, l, 'abcd']
				]],
				[T.BadEscape, 307, 308, l, '\\'],
				[T.Whitespaces, 308, 309, l, ' '],
				[T.BadEscape, 309, 311, l, '\\c'],
				[T.Newline, 311, 312, l++, '\n'],
				[T.Word, 312, 315, l, 'abc'],
				[T.MLSNewlineEraser, 315, 316, l, '\\'],
				[T.Newline, 316, 317, l++, '\n'],
				[T.MLSNewlineEraser, 317, 318, l, '\\'],
				[T.Newline, 318, 319, l++, '\n'],
				[T.TsqSLMark, 319, 322, l, '\'\'\'']
			]],
			[T.Newline, 322, 323, l++, '\n'],
			[T.SdqGsLiteral, 323, 328, l, '"abc"', [
				[T.SdqGsLMark, 323, 324, l, '"'],
				[T.Word, 324, 327, l, 'abc'],
				[T.SdqGsLMark, 327, 328, l, '"']
			]],
			[T.Newline, 328, 329, l++, '\n'],
			[T.SdqGsLiteral, 329, 361, l, '" \t{}[]()<>/~@#%^&*?-+=_|\'`.,:;"', [
				[T.SdqGsLMark, 329, 330, l, '"'],
				[T.Whitespaces, 330, 331, l, ' '],
				[T.Tabs, 331, 332, l, '\t'],
				[T.LBrace, 332, 333, l, '{'],
				[T.RBrace, 333, 334, l, '}'],
				[T.LBrack, 334, 335, l, '['],
				[T.RBrack, 335, 336, l, ']'],
				[T.LParen, 336, 337, l, '('],
				[T.RParen, 337, 338, l, ')'],
				[T.LAngle, 338, 339, l, '<'],
				[T.RAngle, 339, 340, l, '>'],
				[T.Slash, 340, 341, l, '/'],
				[T.Tilde, 341, 342, l, '~'],
				[T.At, 342, 343, l, '@'],
				[T.Hash, 343, 344, l, '#'],
				[T.Percent, 344, 345, l, '%'],
				[T.Exponent, 345, 346, l, '^'],
				[T.Ampersand, 346, 347, l, '&'],
				[T.Asterisk, 347, 348, l, '*'],
				[T.QuestionS, 348, 349, l, '?'],
				[T.Minus, 349, 350, l, '-'],
				[T.Plus, 350, 351, l, '+'],
				[T.EqualS, 351, 352, l, '='],
				[T.Underscore, 352, 353, l, '_'],
				[T.Pipe, 353, 354, l, '|'],
				[T.Quote, 354, 355, l, '\''],
				[T.BackQuote, 355, 356, l, '`'],
				[T.Dot, 356, 357, l, '.'],
				[T.Comma, 357, 358, l, ','],
				[T.ColonS, 358, 359, l, ':'],
				[T.Semicolon, 359, 360, l, ';'],
				[T.SdqGsLMark, 360, 361, l, '"']
			]],
			[T.Newline, 361, 362, l++, '\n'],
			[T.SdqGsLiteral, 362, 400, l, '"\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\c\\ "', [
				[T.SdqGsLMark, 362, 363, l, '"'],
				[T.OctalEscape, 363, 365, l, '\\0', [
					[T.OctalEscapeStartMark, 363, 364, l, '\\'],
					[T.OctalEscapeContent, 364, 365, l, '0']
				]],
				[T.OctalEscape, 365, 368, l, '\\12', [
					[T.OctalEscapeStartMark, 365, 366, l, '\\'],
					[T.OctalEscapeContent, 366, 368, l, '12']
				]],
				[T.OctalEscape, 368, 372, l, '\\345', [
					[T.OctalEscapeStartMark, 368, 369, l, '\\'],
					[T.OctalEscapeContent, 369, 372, l, '345']
				]],
				[T.BadEscape, 372, 374, l, '\\8'],
				[T.Word, 374, 375, l, '9'],
				[T.UnicodeEscape, 375, 377, l, '\\u', [
					[T.UnicodeEscapeStartMark, 375, 377, l, '\\u']
				]],
				[T.UnicodeEscape, 377, 380, l, '\\u0', [
					[T.UnicodeEscapeStartMark, 377, 379, l, '\\u'],
					[T.UnicodeEscapeContent, 379, 380, l, '0']
				]],
				[T.UnicodeEscape, 380, 384, l, '\\u12', [
					[T.UnicodeEscapeStartMark, 380, 382, l, '\\u'],
					[T.UnicodeEscapeContent, 382, 384, l, '12']
				]],
				[T.UnicodeEscape, 384, 389, l, '\\u345', [
					[T.UnicodeEscapeStartMark, 384, 386, l, '\\u'],
					[T.UnicodeEscapeContent, 386, 389, l, '345']
				]],
				[T.UnicodeEscape, 389, 395, l, '\\uabcd', [
					[T.UnicodeEscapeStartMark, 389, 391, l, '\\u'],
					[T.UnicodeEscapeContent, 391, 395, l, 'abcd']
				]],
				[T.BadEscape, 395, 397, l, '\\c'],
				[T.BadEscape, 397, 398, l, '\\'],
				[T.Whitespaces, 398, 399, l, ' '],
				[T.SdqGsLMark, 399, 400, l, '"']
			]],
			[T.Newline, 400, 401, l++, '\n'],
			[T.SdqGsLiteral, 401, 403, l, '"\\', [
				[T.SdqGsLMark, 401, 402, l, '"'],
				[T.BadEscape, 402, 403, l, '\\']
			]],
			[T.Newline, 403, 404, l++, '\n'],
			[T.TdqGsLiteral, 404, 486, l, '""" \t{}[]()<>/~@#%^&*?-+=_|\'"`.,:;\n\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\ \\c\nabc\\\n\\\n"""', [
				[T.TdqGsLMark, 404, 407, l, '"""'],
				[T.Whitespaces, 407, 408, l, ' '],
				[T.Tabs, 408, 409, l, '\t'],
				[T.LBrace, 409, 410, l, '{'],
				[T.RBrace, 410, 411, l, '}'],
				[T.LBrack, 411, 412, l, '['],
				[T.RBrack, 412, 413, l, ']'],
				[T.LParen, 413, 414, l, '('],
				[T.RParen, 414, 415, l, ')'],
				[T.LAngle, 415, 416, l, '<'],
				[T.RAngle, 416, 417, l, '>'],
				[T.Slash, 417, 418, l, '/'],
				[T.Tilde, 418, 419, l, '~'],
				[T.At, 419, 420, l, '@'],
				[T.Hash, 420, 421, l, '#'],
				[T.Percent, 421, 422, l, '%'],
				[T.Exponent, 422, 423, l, '^'],
				[T.Ampersand, 423, 424, l, '&'],
				[T.Asterisk, 424, 425, l, '*'],
				[T.QuestionS, 425, 426, l, '?'],
				[T.Minus, 426, 427, l, '-'],
				[T.Plus, 427, 428, l, '+'],
				[T.EqualS, 428, 429, l, '='],
				[T.Underscore, 429, 430, l, '_'],
				[T.Pipe, 430, 431, l, '|'],
				[T.Quote, 431, 432, l, '\''],
				[T.DblQuote, 432, 433, l, '"'],
				[T.BackQuote, 433, 434, l, '`'],
				[T.Dot, 434, 435, l, '.'],
				[T.Comma, 435, 436, l, ','],
				[T.ColonS, 436, 437, l, ':'],
				[T.Semicolon, 437, 438, l, ';'],
				[T.Newline, 438, 439, l++, '\n'],
				[T.OctalEscape, 439, 441, l, '\\0', [
					[T.OctalEscapeStartMark, 439, 440, l, '\\'],
					[T.OctalEscapeContent, 440, 441, l, '0']
				]],
				[T.OctalEscape, 441, 444, l, '\\12', [
					[T.OctalEscapeStartMark, 441, 442, l, '\\'],
					[T.OctalEscapeContent, 442, 444, l, '12']
				]],
				[T.OctalEscape, 444, 448, l, '\\345', [
					[T.OctalEscapeStartMark, 444, 445, l, '\\'],
					[T.OctalEscapeContent, 445, 448, l, '345']
				]],
				[T.BadEscape, 448, 450, l, '\\8'],
				[T.Word, 450, 451, l, '9'],
				[T.UnicodeEscape, 451, 453, l, '\\u', [
					[T.UnicodeEscapeStartMark, 451, 453, l, '\\u']
				]],
				[T.UnicodeEscape, 453, 456, l, '\\u0', [
					[T.UnicodeEscapeStartMark, 453, 455, l, '\\u'],
					[T.UnicodeEscapeContent, 455, 456, l, '0']
				]],
				[T.UnicodeEscape, 456, 460, l, '\\u12', [
					[T.UnicodeEscapeStartMark, 456, 458, l, '\\u'],
					[T.UnicodeEscapeContent, 458, 460, l, '12']
				]],
				[T.UnicodeEscape, 460, 465, l, '\\u345', [
					[T.UnicodeEscapeStartMark, 460, 462, l, '\\u'],
					[T.UnicodeEscapeContent, 462, 465, l, '345']
				]],
				[T.UnicodeEscape, 465, 471, l, '\\uabcd', [
					[T.UnicodeEscapeStartMark, 465, 467, l, '\\u'],
					[T.UnicodeEscapeContent, 467, 471, l, 'abcd']
				]],
				[T.BadEscape, 471, 472, l, '\\'],
				[T.Whitespaces, 472, 473, l, ' '],
				[T.BadEscape, 473, 475, l, '\\c'],
				[T.Newline, 475, 476, l++, '\n'],
				[T.Word, 476, 479, l, 'abc'],
				[T.MLSNewlineEraser, 479, 480, l, '\\'],
				[T.Newline, 480, 481, l++, '\n'],
				[T.MLSNewlineEraser, 481, 482, l, '\\'],
				[T.Newline, 482, 483, l++, '\n'],
				[T.TdqGsLMark, 483, 486, l, '"""']
			]],
			[T.Newline, 486, 487, l++, '\n'],
			[T.SGsLiteral, 487, 492, l, '/abc/', [
				[T.SGsLMark, 487, 488, l, '/'],
				[T.Word, 488, 491, l, 'abc'],
				[T.SGsLMark, 491, 492, l, '/']
			]],
			[T.Newline, 492, 493, l++, '\n'],
			[T.SGsLiteral, 493, 527, l, '/ \t{}[]()<>\\~@#$%^&*?-+=_|\'"`.,:;/', [
				[T.SGsLMark, 493, 494, l, '/'],
				[T.Whitespaces, 494, 495, l, ' '],
				[T.Tabs, 495, 496, l, '\t'],
				[T.LBrace, 496, 497, l, '{'],
				[T.RBrace, 497, 498, l, '}'],
				[T.LBrack, 498, 499, l, '['],
				[T.RBrack, 499, 500, l, ']'],
				[T.LParen, 500, 501, l, '('],
				[T.RParen, 501, 502, l, ')'],
				[T.LAngle, 502, 503, l, '<'],
				[T.RAngle, 503, 504, l, '>'],
				[T.Backslash, 504, 505, l, '\\'],
				[T.Tilde, 505, 506, l, '~'],
				[T.At, 506, 507, l, '@'],
				[T.Hash, 507, 508, l, '#'],
				[T.Dollar, 508, 509, l, '$'],
				[T.Percent, 509, 510, l, '%'],
				[T.Exponent, 510, 511, l, '^'],
				[T.Ampersand, 511, 512, l, '&'],
				[T.Asterisk, 512, 513, l, '*'],
				[T.QuestionS, 513, 514, l, '?'],
				[T.Minus, 514, 515, l, '-'],
				[T.Plus, 515, 516, l, '+'],
				[T.EqualS, 516, 517, l, '='],
				[T.Underscore, 517, 518, l, '_'],
				[T.Pipe, 518, 519, l, '|'],
				[T.Quote, 519, 520, l, '\''],
				[T.DblQuote, 520, 521, l, '"'],
				[T.BackQuote, 521, 522, l, '`'],
				[T.Dot, 522, 523, l, '.'],
				[T.Comma, 523, 524, l, ','],
				[T.ColonS, 524, 525, l, ':'],
				[T.Semicolon, 525, 526, l, ';'],
				[T.SGsLMark, 526, 527, l, '/']
			]],
			[T.Newline, 527, 528, l++, '\n'],
			[T.SGsLiteral, 528, 552, l, '/\\/\\u\\u0\\u12\\u345\\uabcd/', [
				[T.SGsLMark, 528, 529, l, '/'],
				[T.SlashEscape, 529, 531, l, '\\/'],
				[T.Backslash, 531, 532, l, '\\'],
				[T.Word, 532, 533, l, 'u'],
				[T.Backslash, 533, 534, l, '\\'],
				[T.Word, 534, 536, l, 'u0'],
				[T.Backslash, 536, 537, l, '\\'],
				[T.Word, 537, 540, l, 'u12'],
				[T.Backslash, 540, 541, l, '\\'],
				[T.Word, 541, 545, l, 'u345'],
				[T.UnicodeEscape, 545, 551, l, '\\uabcd', [
					[T.UnicodeEscapeStartMark, 545, 547, l, '\\u'],
					[T.UnicodeEscapeContent, 547, 551, l, 'abcd']
				]],
				[T.SGsLMark, 551, 552, l, '/']
			]],
			[T.Newline, 552, 553, l++, '\n'],
			[T.SGsLiteral, 553, 557, l, '/\\\n/', [
				[T.SGsLMark, 553, 554, l, '/'],
				[T.MLSNewlineEraser, 554, 555, l, '\\'],
				[T.Newline, 555, 556, l++, '\n'],
				[T.SGsLMark, 556, 557, l, '/']
			]],
			[T.Newline, 557, 558, l++, '\n']
		]]);
	});
});
