import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l26_34 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SdqGsLiteral, 323, l.v, '"abc"', [
			[T.SdqGsLMark, 323, l.v, '"'],
			[T.Word, 324, l.v, 'abc'],
			[T.SdqGsLMark, 327, l.v, '"']
		]],
		[T.Newline, 328, l.v++, '\n'],
		[T.SdqGsLiteral, 329, l.v, '" \t{}[]()<>/~@#%^&*?-+=_|\'`.,:;"', [
			[T.SdqGsLMark, 329, l.v, '"'],
			[T.Whitespaces, 330, l.v, ' '],
			[T.Tabs, 331, l.v, '\t'],
			[T.LBrace, 332, l.v, '{'],
			[T.RBrace, 333, l.v, '}'],
			[T.LBrack, 334, l.v, '['],
			[T.RBrack, 335, l.v, ']'],
			[T.LParen, 336, l.v, '('],
			[T.RParen, 337, l.v, ')'],
			[T.LAngle, 338, l.v, '<'],
			[T.RAngle, 339, l.v, '>'],
			[T.Slash, 340, l.v, '/'],
			[T.Tilde, 341, l.v, '~'],
			[T.At, 342, l.v, '@'],
			[T.Hash, 343, l.v, '#'],
			[T.Percent, 344, l.v, '%'],
			[T.Exponent, 345, l.v, '^'],
			[T.Ampersand, 346, l.v, '&'],
			[T.Asterisk, 347, l.v, '*'],
			[T.QuestionS, 348, l.v, '?'],
			[T.Minus, 349, l.v, '-'],
			[T.Plus, 350, l.v, '+'],
			[T.EqualS, 351, l.v, '='],
			[T.Underscore, 352, l.v, '_'],
			[T.Pipe, 353, l.v, '|'],
			[T.Quote, 354, l.v, '\''],
			[T.BackQuote, 355, l.v, '`'],
			[T.Dot, 356, l.v, '.'],
			[T.Comma, 357, l.v, ','],
			[T.ColonS, 358, l.v, ':'],
			[T.Semicolon, 359, l.v, ';'],
			[T.SdqGsLMark, 360, l.v, '"']
		]],
		[T.Newline, 361, l.v++, '\n'],
		[T.SdqGsLiteral, 362, l.v, '"\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\c\\ "', [
			[T.SdqGsLMark, 362, l.v, '"'],
			[T.OctalEscape, 363, l.v, '\\0', [
				[T.OctalEscapeStartMark, 363, l.v, '\\'],
				[T.OctalEscapeContent, 364, l.v, '0']
			]],
			[T.OctalEscape, 365, l.v, '\\12', [
				[T.OctalEscapeStartMark, 365, l.v, '\\'],
				[T.OctalEscapeContent, 366, l.v, '12']
			]],
			[T.OctalEscape, 368, l.v, '\\345', [
				[T.OctalEscapeStartMark, 368, l.v, '\\'],
				[T.OctalEscapeContent, 369, l.v, '345']
			]],
			[T.BadEscape, 372, l.v, '\\8'],
			[T.Word, 374, l.v, '9'],
			[T.UnicodeEscape, 375, l.v, '\\u', [
				[T.UnicodeEscapeStartMark, 375, l.v, '\\u']
			]],
			[T.UnicodeEscape, 377, l.v, '\\u0', [
				[T.UnicodeEscapeStartMark, 377, l.v, '\\u'],
				[T.UnicodeEscapeContent, 379, l.v, '0']
			]],
			[T.UnicodeEscape, 380, l.v, '\\u12', [
				[T.UnicodeEscapeStartMark, 380, l.v, '\\u'],
				[T.UnicodeEscapeContent, 382, l.v, '12']
			]],
			[T.UnicodeEscape, 384, l.v, '\\u345', [
				[T.UnicodeEscapeStartMark, 384, l.v, '\\u'],
				[T.UnicodeEscapeContent, 386, l.v, '345']
			]],
			[T.UnicodeEscape, 389, l.v, '\\uabcd', [
				[T.UnicodeEscapeStartMark, 389, l.v, '\\u'],
				[T.UnicodeEscapeContent, 391, l.v, 'abcd']
			]],
			[T.BadEscape, 395, l.v, '\\c'],
			[T.BadEscape, 397, l.v, '\\'],
			[T.Whitespaces, 398, l.v, ' '],
			[T.SdqGsLMark, 399, l.v, '"']
		]],
		[T.Newline, 400, l.v++, '\n'],
		[T.SdqGsLiteral, 401, l.v, '"\\', [
			[T.SdqGsLMark, 401, l.v, '"'],
			[T.BadEscape, 402, l.v, '\\']
		]],
		[T.Newline, 403, l.v++, '\n'],
		[T.TdqGsLiteral, 404, l.v, '""" \t{}[]()<>/~@#%^&*?-+=_|\'"`.,:;\n\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\ \\c\nabc\\\n\\\n"""', [
			[T.TdqGsLMark, 404, l.v, '"""'],
			[T.Whitespaces, 407, l.v, ' '],
			[T.Tabs, 408, l.v, '\t'],
			[T.LBrace, 409, l.v, '{'],
			[T.RBrace, 410, l.v, '}'],
			[T.LBrack, 411, l.v, '['],
			[T.RBrack, 412, l.v, ']'],
			[T.LParen, 413, l.v, '('],
			[T.RParen, 414, l.v, ')'],
			[T.LAngle, 415, l.v, '<'],
			[T.RAngle, 416, l.v, '>'],
			[T.Slash, 417, l.v, '/'],
			[T.Tilde, 418, l.v, '~'],
			[T.At, 419, l.v, '@'],
			[T.Hash, 420, l.v, '#'],
			[T.Percent, 421, l.v, '%'],
			[T.Exponent, 422, l.v, '^'],
			[T.Ampersand, 423, l.v, '&'],
			[T.Asterisk, 424, l.v, '*'],
			[T.QuestionS, 425, l.v, '?'],
			[T.Minus, 426, l.v, '-'],
			[T.Plus, 427, l.v, '+'],
			[T.EqualS, 428, l.v, '='],
			[T.Underscore, 429, l.v, '_'],
			[T.Pipe, 430, l.v, '|'],
			[T.Quote, 431, l.v, '\''],
			[T.DblQuote, 432, l.v, '"'],
			[T.BackQuote, 433, l.v, '`'],
			[T.Dot, 434, l.v, '.'],
			[T.Comma, 435, l.v, ','],
			[T.ColonS, 436, l.v, ':'],
			[T.Semicolon, 437, l.v, ';'],
			[T.Newline, 438, l.v++, '\n'],
			[T.OctalEscape, 439, l.v, '\\0', [
				[T.OctalEscapeStartMark, 439, l.v, '\\'],
				[T.OctalEscapeContent, 440, l.v, '0']
			]],
			[T.OctalEscape, 441, l.v, '\\12', [
				[T.OctalEscapeStartMark, 441, l.v, '\\'],
				[T.OctalEscapeContent, 442, l.v, '12']
			]],
			[T.OctalEscape, 444, l.v, '\\345', [
				[T.OctalEscapeStartMark, 444, l.v, '\\'],
				[T.OctalEscapeContent, 445, l.v, '345']
			]],
			[T.BadEscape, 448, l.v, '\\8'],
			[T.Word, 450, l.v, '9'],
			[T.UnicodeEscape, 451, l.v, '\\u', [
				[T.UnicodeEscapeStartMark, 451, l.v, '\\u']
			]],
			[T.UnicodeEscape, 453, l.v, '\\u0', [
				[T.UnicodeEscapeStartMark, 453, l.v, '\\u'],
				[T.UnicodeEscapeContent, 455, l.v, '0']
			]],
			[T.UnicodeEscape, 456, l.v, '\\u12', [
				[T.UnicodeEscapeStartMark, 456, l.v, '\\u'],
				[T.UnicodeEscapeContent, 458, l.v, '12']
			]],
			[T.UnicodeEscape, 460, l.v, '\\u345', [
				[T.UnicodeEscapeStartMark, 460, l.v, '\\u'],
				[T.UnicodeEscapeContent, 462, l.v, '345']
			]],
			[T.UnicodeEscape, 465, l.v, '\\uabcd', [
				[T.UnicodeEscapeStartMark, 465, l.v, '\\u'],
				[T.UnicodeEscapeContent, 467, l.v, 'abcd']
			]],
			[T.BadEscape, 471, l.v, '\\'],
			[T.Whitespaces, 472, l.v, ' '],
			[T.BadEscape, 473, l.v, '\\c'],
			[T.Newline, 475, l.v++, '\n'],
			[T.Word, 476, l.v, 'abc'],
			[T.MLSNewlineEraser, 479, l.v, '\\'],
			[T.Newline, 480, l.v++, '\n'],
			[T.MLSNewlineEraser, 481, l.v, '\\'],
			[T.Newline, 482, l.v++, '\n'],
			[T.TdqGsLMark, 483, l.v, '"""']
		]],
		[T.Newline, 486, l.v++, '\n']
	];
};