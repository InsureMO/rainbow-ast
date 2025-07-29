import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l17_25 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SsqSLiteral, 157, l.v, '\'abc\'', [
			[T.SsqSLMark, 157, l.v, '\''],
			[T.Word, 158, l.v, 'abc'],
			[T.SsqSLMark, 161, l.v, '\'']
		]],
		[T.Newline, 162, l.v++, '\n'],
		[T.SsqSLiteral, 163, l.v, '\' \t{}[]()<>/~@#$%^&*?-+=_|"`.,:;\'', [
			[T.SsqSLMark, 163, l.v, '\''],
			[T.Whitespaces, 164, l.v, ' '],
			[T.Tabs, 165, l.v, '\t'],
			[T.LBrace, 166, l.v, '{'],
			[T.RBrace, 167, l.v, '}'],
			[T.LBrack, 168, l.v, '['],
			[T.RBrack, 169, l.v, ']'],
			[T.LParen, 170, l.v, '('],
			[T.RParen, 171, l.v, ')'],
			[T.LAngle, 172, l.v, '<'],
			[T.RAngle, 173, l.v, '>'],
			[T.Slash, 174, l.v, '/'],
			[T.Tilde, 175, l.v, '~'],
			[T.At, 176, l.v, '@'],
			[T.Hash, 177, l.v, '#'],
			[T.Dollar, 178, l.v, '$'],
			[T.Percent, 179, l.v, '%'],
			[T.Exponent, 180, l.v, '^'],
			[T.Ampersand, 181, l.v, '&'],
			[T.Asterisk, 182, l.v, '*'],
			[T.QuestionS, 183, l.v, '?'],
			[T.Minus, 184, l.v, '-'],
			[T.Plus, 185, l.v, '+'],
			[T.EqualS, 186, l.v, '='],
			[T.Underscore, 187, l.v, '_'],
			[T.Pipe, 188, l.v, '|'],
			[T.DblQuote, 189, l.v, '"'],
			[T.BackQuote, 190, l.v, '`'],
			[T.Dot, 191, l.v, '.'],
			[T.Comma, 192, l.v, ','],
			[T.ColonS, 193, l.v, ':'],
			[T.Semicolon, 194, l.v, ';'],
			[T.SsqSLMark, 195, l.v, '\'']
		]],
		[T.Newline, 196, l.v++, '\n'],
		[T.SsqSLiteral, 197, l.v, '\'\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\c\\ \'', [
			[T.SsqSLMark, 197, l.v, '\''],
			[T.OctalEscape, 198, l.v, '\\0', [
				[T.OctalEscapeStartMark, 198, l.v, '\\'],
				[T.OctalEscapeContent, 199, l.v, '0']
			]],
			[T.OctalEscape, 200, l.v, '\\12', [
				[T.OctalEscapeStartMark, 200, l.v, '\\'],
				[T.OctalEscapeContent, 201, l.v, '12']
			]],
			[T.OctalEscape, 203, l.v, '\\345', [
				[T.OctalEscapeStartMark, 203, l.v, '\\'],
				[T.OctalEscapeContent, 204, l.v, '345']
			]],
			[T.BadEscape, 207, l.v, '\\8'],
			[T.Word, 209, l.v, '9'],
			[T.UnicodeEscape, 210, l.v, '\\u', [
				[T.UnicodeEscapeStartMark, 210, l.v, '\\u']
			]],
			[T.UnicodeEscape, 212, l.v, '\\u0', [
				[T.UnicodeEscapeStartMark, 212, l.v, '\\u'],
				[T.UnicodeEscapeContent, 214, l.v, '0']
			]],
			[T.UnicodeEscape, 215, l.v, '\\u12', [
				[T.UnicodeEscapeStartMark, 215, l.v, '\\u'],
				[T.UnicodeEscapeContent, 217, l.v, '12']
			]],
			[T.UnicodeEscape, 219, l.v, '\\u345', [
				[T.UnicodeEscapeStartMark, 219, l.v, '\\u'],
				[T.UnicodeEscapeContent, 221, l.v, '345']
			]],
			[T.UnicodeEscape, 224, l.v, '\\uabcd', [
				[T.UnicodeEscapeStartMark, 224, l.v, '\\u'],
				[T.UnicodeEscapeContent, 226, l.v, 'abcd']
			]],
			[T.BadEscape, 230, l.v, '\\c'],
			[T.BadEscape, 232, l.v, '\\'],
			[T.Whitespaces, 233, l.v, ' '],
			[T.SsqSLMark, 234, l.v, '\'']
		]],
		[T.Newline, 235, l.v++, '\n'],
		[T.SsqSLiteral, 236, l.v, '\'\\', [
			[T.SsqSLMark, 236, l.v, '\''],
			[T.BadEscape, 237, l.v, '\\']
		]],
		[T.Newline, 238, l.v++, '\n'],
		[T.TsqSLiteral, 239, l.v, '\'\'\' \t{}[]()<>/~@#$%^&*?-+=_|\'"`.,:;\n\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\ \\c\nabc\\\n\\\n\'\'\'', [
			[T.TsqSLMark, 239, l.v, '\'\'\''],
			[T.Whitespaces, 242, l.v, ' '],
			[T.Tabs, 243, l.v, '\t'],
			[T.LBrace, 244, l.v, '{'],
			[T.RBrace, 245, l.v, '}'],
			[T.LBrack, 246, l.v, '['],
			[T.RBrack, 247, l.v, ']'],
			[T.LParen, 248, l.v, '('],
			[T.RParen, 249, l.v, ')'],
			[T.LAngle, 250, l.v, '<'],
			[T.RAngle, 251, l.v, '>'],
			[T.Slash, 252, l.v, '/'],
			[T.Tilde, 253, l.v, '~'],
			[T.At, 254, l.v, '@'],
			[T.Hash, 255, l.v, '#'],
			[T.Dollar, 256, l.v, '$'],
			[T.Percent, 257, l.v, '%'],
			[T.Exponent, 258, l.v, '^'],
			[T.Ampersand, 259, l.v, '&'],
			[T.Asterisk, 260, l.v, '*'],
			[T.QuestionS, 261, l.v, '?'],
			[T.Minus, 262, l.v, '-'],
			[T.Plus, 263, l.v, '+'],
			[T.EqualS, 264, l.v, '='],
			[T.Underscore, 265, l.v, '_'],
			[T.Pipe, 266, l.v, '|'],
			[T.Quote, 267, l.v, '\''],
			[T.DblQuote, 268, l.v, '"'],
			[T.BackQuote, 269, l.v, '`'],
			[T.Dot, 270, l.v, '.'],
			[T.Comma, 271, l.v, ','],
			[T.ColonS, 272, l.v, ':'],
			[T.Semicolon, 273, l.v, ';'],
			[T.Newline, 274, l.v++, '\n'],
			[T.OctalEscape, 275, l.v, '\\0', [
				[T.OctalEscapeStartMark, 275, l.v, '\\'],
				[T.OctalEscapeContent, 276, l.v, '0']
			]],
			[T.OctalEscape, 277, l.v, '\\12', [
				[T.OctalEscapeStartMark, 277, l.v, '\\'],
				[T.OctalEscapeContent, 278, l.v, '12']
			]],
			[T.OctalEscape, 280, l.v, '\\345', [
				[T.OctalEscapeStartMark, 280, l.v, '\\'],
				[T.OctalEscapeContent, 281, l.v, '345']
			]],
			[T.BadEscape, 284, l.v, '\\8'],
			[T.Word, 286, l.v, '9'],
			[T.UnicodeEscape, 287, l.v, '\\u', [
				[T.UnicodeEscapeStartMark, 287, l.v, '\\u']
			]],
			[T.UnicodeEscape, 289, l.v, '\\u0', [
				[T.UnicodeEscapeStartMark, 289, l.v, '\\u'],
				[T.UnicodeEscapeContent, 291, l.v, '0']
			]],
			[T.UnicodeEscape, 292, l.v, '\\u12', [
				[T.UnicodeEscapeStartMark, 292, l.v, '\\u'],
				[T.UnicodeEscapeContent, 294, l.v, '12']
			]],
			[T.UnicodeEscape, 296, l.v, '\\u345', [
				[T.UnicodeEscapeStartMark, 296, l.v, '\\u'],
				[T.UnicodeEscapeContent, 298, l.v, '345']
			]],
			[T.UnicodeEscape, 301, l.v, '\\uabcd', [
				[T.UnicodeEscapeStartMark, 301, l.v, '\\u'],
				[T.UnicodeEscapeContent, 303, l.v, 'abcd']
			]],
			[T.BadEscape, 307, l.v, '\\'],
			[T.Whitespaces, 308, l.v, ' '],
			[T.BadEscape, 309, l.v, '\\c'],
			[T.Newline, 311, l.v++, '\n'],
			[T.Word, 312, l.v, 'abc'],
			[T.MLSNewlineEraser, 315, l.v, '\\'],
			[T.Newline, 316, l.v++, '\n'],
			[T.MLSNewlineEraser, 317, l.v, '\\'],
			[T.Newline, 318, l.v++, '\n'],
			[T.TsqSLMark, 319, l.v, '\'\'\'']
		]],
		[T.Newline, 322, l.v++, '\n']
	];
};