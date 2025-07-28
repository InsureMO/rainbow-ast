import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l26_34 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SdqGsLiteral, 323, 328, l.v, '"abc"', [
			[T.SdqGsLMark, 323, 324, l.v, '"'],
			[T.Word, 324, 327, l.v, 'abc'],
			[T.SdqGsLMark, 327, 328, l.v, '"']
		]],
		[T.Newline, 328, 329, l.v++, '\n'],
		[T.SdqGsLiteral, 329, 361, l.v, '" \t{}[]()<>/~@#%^&*?-+=_|\'`.,:;"', [
			[T.SdqGsLMark, 329, 330, l.v, '"'],
			[T.Whitespaces, 330, 331, l.v, ' '],
			[T.Tabs, 331, 332, l.v, '\t'],
			[T.LBrace, 332, 333, l.v, '{'],
			[T.RBrace, 333, 334, l.v, '}'],
			[T.LBrack, 334, 335, l.v, '['],
			[T.RBrack, 335, 336, l.v, ']'],
			[T.LParen, 336, 337, l.v, '('],
			[T.RParen, 337, 338, l.v, ')'],
			[T.LAngle, 338, 339, l.v, '<'],
			[T.RAngle, 339, 340, l.v, '>'],
			[T.Slash, 340, 341, l.v, '/'],
			[T.Tilde, 341, 342, l.v, '~'],
			[T.At, 342, 343, l.v, '@'],
			[T.Hash, 343, 344, l.v, '#'],
			[T.Percent, 344, 345, l.v, '%'],
			[T.Exponent, 345, 346, l.v, '^'],
			[T.Ampersand, 346, 347, l.v, '&'],
			[T.Asterisk, 347, 348, l.v, '*'],
			[T.QuestionS, 348, 349, l.v, '?'],
			[T.Minus, 349, 350, l.v, '-'],
			[T.Plus, 350, 351, l.v, '+'],
			[T.EqualS, 351, 352, l.v, '='],
			[T.Underscore, 352, 353, l.v, '_'],
			[T.Pipe, 353, 354, l.v, '|'],
			[T.Quote, 354, 355, l.v, '\''],
			[T.BackQuote, 355, 356, l.v, '`'],
			[T.Dot, 356, 357, l.v, '.'],
			[T.Comma, 357, 358, l.v, ','],
			[T.ColonS, 358, 359, l.v, ':'],
			[T.Semicolon, 359, 360, l.v, ';'],
			[T.SdqGsLMark, 360, 361, l.v, '"']
		]],
		[T.Newline, 361, 362, l.v++, '\n'],
		[T.SdqGsLiteral, 362, 400, l.v, '"\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\c\\ "', [
			[T.SdqGsLMark, 362, 363, l.v, '"'],
			[T.OctalEscape, 363, 365, l.v, '\\0', [
				[T.OctalEscapeStartMark, 363, 364, l.v, '\\'],
				[T.OctalEscapeContent, 364, 365, l.v, '0']
			]],
			[T.OctalEscape, 365, 368, l.v, '\\12', [
				[T.OctalEscapeStartMark, 365, 366, l.v, '\\'],
				[T.OctalEscapeContent, 366, 368, l.v, '12']
			]],
			[T.OctalEscape, 368, 372, l.v, '\\345', [
				[T.OctalEscapeStartMark, 368, 369, l.v, '\\'],
				[T.OctalEscapeContent, 369, 372, l.v, '345']
			]],
			[T.BadEscape, 372, 374, l.v, '\\8'],
			[T.Word, 374, 375, l.v, '9'],
			[T.UnicodeEscape, 375, 377, l.v, '\\u', [
				[T.UnicodeEscapeStartMark, 375, 377, l.v, '\\u']
			]],
			[T.UnicodeEscape, 377, 380, l.v, '\\u0', [
				[T.UnicodeEscapeStartMark, 377, 379, l.v, '\\u'],
				[T.UnicodeEscapeContent, 379, 380, l.v, '0']
			]],
			[T.UnicodeEscape, 380, 384, l.v, '\\u12', [
				[T.UnicodeEscapeStartMark, 380, 382, l.v, '\\u'],
				[T.UnicodeEscapeContent, 382, 384, l.v, '12']
			]],
			[T.UnicodeEscape, 384, 389, l.v, '\\u345', [
				[T.UnicodeEscapeStartMark, 384, 386, l.v, '\\u'],
				[T.UnicodeEscapeContent, 386, 389, l.v, '345']
			]],
			[T.UnicodeEscape, 389, 395, l.v, '\\uabcd', [
				[T.UnicodeEscapeStartMark, 389, 391, l.v, '\\u'],
				[T.UnicodeEscapeContent, 391, 395, l.v, 'abcd']
			]],
			[T.BadEscape, 395, 397, l.v, '\\c'],
			[T.BadEscape, 397, 398, l.v, '\\'],
			[T.Whitespaces, 398, 399, l.v, ' '],
			[T.SdqGsLMark, 399, 400, l.v, '"']
		]],
		[T.Newline, 400, 401, l.v++, '\n'],
		[T.SdqGsLiteral, 401, 403, l.v, '"\\', [
			[T.SdqGsLMark, 401, 402, l.v, '"'],
			[T.BadEscape, 402, 403, l.v, '\\']
		]],
		[T.Newline, 403, 404, l.v++, '\n'],
		[T.TdqGsLiteral, 404, 486, l.v, '""" \t{}[]()<>/~@#%^&*?-+=_|\'"`.,:;\n\\0\\12\\345\\89\\u\\u0\\u12\\u345\\uabcd\\ \\c\nabc\\\n\\\n"""', [
			[T.TdqGsLMark, 404, 407, l.v, '"""'],
			[T.Whitespaces, 407, 408, l.v, ' '],
			[T.Tabs, 408, 409, l.v, '\t'],
			[T.LBrace, 409, 410, l.v, '{'],
			[T.RBrace, 410, 411, l.v, '}'],
			[T.LBrack, 411, 412, l.v, '['],
			[T.RBrack, 412, 413, l.v, ']'],
			[T.LParen, 413, 414, l.v, '('],
			[T.RParen, 414, 415, l.v, ')'],
			[T.LAngle, 415, 416, l.v, '<'],
			[T.RAngle, 416, 417, l.v, '>'],
			[T.Slash, 417, 418, l.v, '/'],
			[T.Tilde, 418, 419, l.v, '~'],
			[T.At, 419, 420, l.v, '@'],
			[T.Hash, 420, 421, l.v, '#'],
			[T.Percent, 421, 422, l.v, '%'],
			[T.Exponent, 422, 423, l.v, '^'],
			[T.Ampersand, 423, 424, l.v, '&'],
			[T.Asterisk, 424, 425, l.v, '*'],
			[T.QuestionS, 425, 426, l.v, '?'],
			[T.Minus, 426, 427, l.v, '-'],
			[T.Plus, 427, 428, l.v, '+'],
			[T.EqualS, 428, 429, l.v, '='],
			[T.Underscore, 429, 430, l.v, '_'],
			[T.Pipe, 430, 431, l.v, '|'],
			[T.Quote, 431, 432, l.v, '\''],
			[T.DblQuote, 432, 433, l.v, '"'],
			[T.BackQuote, 433, 434, l.v, '`'],
			[T.Dot, 434, 435, l.v, '.'],
			[T.Comma, 435, 436, l.v, ','],
			[T.ColonS, 436, 437, l.v, ':'],
			[T.Semicolon, 437, 438, l.v, ';'],
			[T.Newline, 438, 439, l.v++, '\n'],
			[T.OctalEscape, 439, 441, l.v, '\\0', [
				[T.OctalEscapeStartMark, 439, 440, l.v, '\\'],
				[T.OctalEscapeContent, 440, 441, l.v, '0']
			]],
			[T.OctalEscape, 441, 444, l.v, '\\12', [
				[T.OctalEscapeStartMark, 441, 442, l.v, '\\'],
				[T.OctalEscapeContent, 442, 444, l.v, '12']
			]],
			[T.OctalEscape, 444, 448, l.v, '\\345', [
				[T.OctalEscapeStartMark, 444, 445, l.v, '\\'],
				[T.OctalEscapeContent, 445, 448, l.v, '345']
			]],
			[T.BadEscape, 448, 450, l.v, '\\8'],
			[T.Word, 450, 451, l.v, '9'],
			[T.UnicodeEscape, 451, 453, l.v, '\\u', [
				[T.UnicodeEscapeStartMark, 451, 453, l.v, '\\u']
			]],
			[T.UnicodeEscape, 453, 456, l.v, '\\u0', [
				[T.UnicodeEscapeStartMark, 453, 455, l.v, '\\u'],
				[T.UnicodeEscapeContent, 455, 456, l.v, '0']
			]],
			[T.UnicodeEscape, 456, 460, l.v, '\\u12', [
				[T.UnicodeEscapeStartMark, 456, 458, l.v, '\\u'],
				[T.UnicodeEscapeContent, 458, 460, l.v, '12']
			]],
			[T.UnicodeEscape, 460, 465, l.v, '\\u345', [
				[T.UnicodeEscapeStartMark, 460, 462, l.v, '\\u'],
				[T.UnicodeEscapeContent, 462, 465, l.v, '345']
			]],
			[T.UnicodeEscape, 465, 471, l.v, '\\uabcd', [
				[T.UnicodeEscapeStartMark, 465, 467, l.v, '\\u'],
				[T.UnicodeEscapeContent, 467, 471, l.v, 'abcd']
			]],
			[T.BadEscape, 471, 472, l.v, '\\'],
			[T.Whitespaces, 472, 473, l.v, ' '],
			[T.BadEscape, 473, 475, l.v, '\\c'],
			[T.Newline, 475, 476, l.v++, '\n'],
			[T.Word, 476, 479, l.v, 'abc'],
			[T.MLSNewlineEraser, 479, 480, l.v, '\\'],
			[T.Newline, 480, 481, l.v++, '\n'],
			[T.MLSNewlineEraser, 481, 482, l.v, '\\'],
			[T.Newline, 482, 483, l.v++, '\n'],
			[T.TdqGsLMark, 483, 486, l.v, '"""']
		]],
		[T.Newline, 486, 487, l.v++, '\n']
	];
};