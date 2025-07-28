import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l40_44 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.DsGsLiteral, 558, 565, l.v, '$/abc/$', [
			[T.DsGsLStartMark, 558, 560, l.v, '$/'],
			[T.Word, 560, 563, l.v, 'abc'],
			[T.DsGsLEndMark, 563, 565, l.v, '/$']
		]],
		[T.Newline, 565, 566, l.v++, '\n'],
		[T.DsGsLiteral, 566, 602, l.v, '$/ \t{}[]()<>\\~@#$%^&*?-+=_|\'"`.,:;/$', [
			[T.DsGsLStartMark, 566, 568, l.v, '$/'],
			[T.Whitespaces, 568, 569, l.v, ' '],
			[T.Tabs, 569, 570, l.v, '\t'],
			[T.LBrace, 570, 571, l.v, '{'],
			[T.RBrace, 571, 572, l.v, '}'],
			[T.LBrack, 572, 573, l.v, '['],
			[T.RBrack, 573, 574, l.v, ']'],
			[T.LParen, 574, 575, l.v, '('],
			[T.RParen, 575, 576, l.v, ')'],
			[T.LAngle, 576, 577, l.v, '<'],
			[T.RAngle, 577, 578, l.v, '>'],
			[T.Backslash, 578, 579, l.v, '\\'],
			[T.Tilde, 579, 580, l.v, '~'],
			[T.At, 580, 581, l.v, '@'],
			[T.Hash, 581, 582, l.v, '#'],
			[T.Dollar, 582, 583, l.v, '$'],
			[T.Percent, 583, 584, l.v, '%'],
			[T.Exponent, 584, 585, l.v, '^'],
			[T.Ampersand, 585, 586, l.v, '&'],
			[T.Asterisk, 586, 587, l.v, '*'],
			[T.QuestionS, 587, 588, l.v, '?'],
			[T.Minus, 588, 589, l.v, '-'],
			[T.Plus, 589, 590, l.v, '+'],
			[T.EqualS, 590, 591, l.v, '='],
			[T.Underscore, 591, 592, l.v, '_'],
			[T.Pipe, 592, 593, l.v, '|'],
			[T.Quote, 593, 594, l.v, '\''],
			[T.DblQuote, 594, 595, l.v, '"'],
			[T.BackQuote, 595, 596, l.v, '`'],
			[T.Dot, 596, 597, l.v, '.'],
			[T.Comma, 597, 598, l.v, ','],
			[T.ColonS, 598, 599, l.v, ':'],
			[T.Semicolon, 599, 600, l.v, ';'],
			[T.DsGsLEndMark, 600, 602, l.v, '/$']
		]],
		[T.Newline, 602, 603, l.v++, '\n'],
		[T.DsGsLiteral, 603, 631, l.v, '$/$/$$\\u\\u0\\u12\\u345\\uabcd/$', [
			[T.DsGsLStartMark, 603, 605, l.v, '$/'],
			[T.SlashEscape, 605, 607, l.v, '$/'],
			[T.DollarEscape, 607, 609, l.v, '$$'],
			[T.Backslash, 609, 610, l.v, '\\'],
			[T.Word, 610, 611, l.v, 'u'],
			[T.Backslash, 611, 612, l.v, '\\'],
			[T.Word, 612, 614, l.v, 'u0'],
			[T.Backslash, 614, 615, l.v, '\\'],
			[T.Word, 615, 618, l.v, 'u12'],
			[T.Backslash, 618, 619, l.v, '\\'],
			[T.Word, 619, 623, l.v, 'u345'],
			[T.UnicodeEscape, 623, 629, l.v, '\\uabcd', [
				[T.UnicodeEscapeStartMark, 623, 625, l.v, '\\u'],
				[T.UnicodeEscapeContent, 625, 629, l.v, 'abcd']
			]],
			[T.DsGsLEndMark, 629, 631, l.v, '/$']
		]],
		[T.Newline, 631, 632, l.v++, '\n'],
		[T.DsGsLiteral, 632, 638, l.v, '$/\\\n/$', [
			[T.DsGsLStartMark, 632, 634, l.v, '$/'],
			[T.MLSNewlineEraser, 634, 635, l.v, '\\'],
			[T.Newline, 635, 636, l.v++, '\n'],
			[T.DsGsLEndMark, 636, 638, l.v, '/$']
		]],
		[T.Newline, 638, 639, l.v++, '\n']
	];
};
