import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l35_39 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SGsLiteral, 487, 492, l.v, '/abc/', [
			[T.SGsLMark, 487, 488, l.v, '/'],
			[T.Word, 488, 491, l.v, 'abc'],
			[T.SGsLMark, 491, 492, l.v, '/']
		]],
		[T.Newline, 492, 493, l.v++, '\n'],
		[T.SGsLiteral, 493, 527, l.v, '/ \t{}[]()<>\\~@#$%^&*?-+=_|\'"`.,:;/', [
			[T.SGsLMark, 493, 494, l.v, '/'],
			[T.Whitespaces, 494, 495, l.v, ' '],
			[T.Tabs, 495, 496, l.v, '\t'],
			[T.LBrace, 496, 497, l.v, '{'],
			[T.RBrace, 497, 498, l.v, '}'],
			[T.LBrack, 498, 499, l.v, '['],
			[T.RBrack, 499, 500, l.v, ']'],
			[T.LParen, 500, 501, l.v, '('],
			[T.RParen, 501, 502, l.v, ')'],
			[T.LAngle, 502, 503, l.v, '<'],
			[T.RAngle, 503, 504, l.v, '>'],
			[T.Backslash, 504, 505, l.v, '\\'],
			[T.Tilde, 505, 506, l.v, '~'],
			[T.At, 506, 507, l.v, '@'],
			[T.Hash, 507, 508, l.v, '#'],
			[T.Dollar, 508, 509, l.v, '$'],
			[T.Percent, 509, 510, l.v, '%'],
			[T.Exponent, 510, 511, l.v, '^'],
			[T.Ampersand, 511, 512, l.v, '&'],
			[T.Asterisk, 512, 513, l.v, '*'],
			[T.QuestionS, 513, 514, l.v, '?'],
			[T.Minus, 514, 515, l.v, '-'],
			[T.Plus, 515, 516, l.v, '+'],
			[T.EqualS, 516, 517, l.v, '='],
			[T.Underscore, 517, 518, l.v, '_'],
			[T.Pipe, 518, 519, l.v, '|'],
			[T.Quote, 519, 520, l.v, '\''],
			[T.DblQuote, 520, 521, l.v, '"'],
			[T.BackQuote, 521, 522, l.v, '`'],
			[T.Dot, 522, 523, l.v, '.'],
			[T.Comma, 523, 524, l.v, ','],
			[T.ColonS, 524, 525, l.v, ':'],
			[T.Semicolon, 525, 526, l.v, ';'],
			[T.SGsLMark, 526, 527, l.v, '/']
		]],
		[T.Newline, 527, 528, l.v++, '\n'],
		[T.SGsLiteral, 528, 552, l.v, '/\\/\\u\\u0\\u12\\u345\\uabcd/', [
			[T.SGsLMark, 528, 529, l.v, '/'],
			[T.SlashEscape, 529, 531, l.v, '\\/'],
			[T.Backslash, 531, 532, l.v, '\\'],
			[T.Word, 532, 533, l.v, 'u'],
			[T.Backslash, 533, 534, l.v, '\\'],
			[T.Word, 534, 536, l.v, 'u0'],
			[T.Backslash, 536, 537, l.v, '\\'],
			[T.Word, 537, 540, l.v, 'u12'],
			[T.Backslash, 540, 541, l.v, '\\'],
			[T.Word, 541, 545, l.v, 'u345'],
			[T.UnicodeEscape, 545, 551, l.v, '\\uabcd', [
				[T.UnicodeEscapeStartMark, 545, 547, l.v, '\\u'],
				[T.UnicodeEscapeContent, 547, 551, l.v, 'abcd']
			]],
			[T.SGsLMark, 551, 552, l.v, '/']
		]],
		[T.Newline, 552, 553, l.v++, '\n'],
		[T.SGsLiteral, 553, 557, l.v, '/\\\n/', [
			[T.SGsLMark, 553, 554, l.v, '/'],
			[T.MLSNewlineEraser, 554, 555, l.v, '\\'],
			[T.Newline, 555, 556, l.v++, '\n'],
			[T.SGsLMark, 556, 557, l.v, '/']
		]],
		[T.Newline, 557, 558, l.v++, '\n']
	];
};
