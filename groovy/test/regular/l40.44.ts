import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l40_44 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.DsGsLiteral, 558, l.v, '$/abc/$', [
			[T.DsGsLStartMark, 558, l.v, '$/'],
			[T.Word, 560, l.v, 'abc'],
			[T.DsGsLEndMark, 563, l.v, '/$']
		]],
		[T.Newline, 565, l.v++, '\n'],
		[T.DsGsLiteral, 566, l.v, '$/ \t{}[]()<>\\~@#$%^&*?-+=_|\'"`.,:;/$', [
			[T.DsGsLStartMark, 566, l.v, '$/'],
			[T.Whitespaces, 568, l.v, ' '],
			[T.Tabs, 569, l.v, '\t'],
			[T.LBrace, 570, l.v, '{'],
			[T.RBrace, 571, l.v, '}'],
			[T.LBrack, 572, l.v, '['],
			[T.RBrack, 573, l.v, ']'],
			[T.LParen, 574, l.v, '('],
			[T.RParen, 575, l.v, ')'],
			[T.LAngle, 576, l.v, '<'],
			[T.RAngle, 577, l.v, '>'],
			[T.Backslash, 578, l.v, '\\'],
			[T.Tilde, 579, l.v, '~'],
			[T.At, 580, l.v, '@'],
			[T.Hash, 581, l.v, '#'],
			[T.Dollar, 582, l.v, '$'],
			[T.Percent, 583, l.v, '%'],
			[T.Exponent, 584, l.v, '^'],
			[T.Ampersand, 585, l.v, '&'],
			[T.Asterisk, 586, l.v, '*'],
			[T.QuestionS, 587, l.v, '?'],
			[T.Minus, 588, l.v, '-'],
			[T.Plus, 589, l.v, '+'],
			[T.EqualS, 590, l.v, '='],
			[T.Underscore, 591, l.v, '_'],
			[T.Pipe, 592, l.v, '|'],
			[T.Quote, 593, l.v, '\''],
			[T.DblQuote, 594, l.v, '"'],
			[T.BackQuote, 595, l.v, '`'],
			[T.Dot, 596, l.v, '.'],
			[T.Comma, 597, l.v, ','],
			[T.ColonS, 598, l.v, ':'],
			[T.Semicolon, 599, l.v, ';'],
			[T.DsGsLEndMark, 600, l.v, '/$']
		]],
		[T.Newline, 602, l.v++, '\n'],
		[T.DsGsLiteral, 603, l.v, '$/$/$$\\u\\u0\\u12\\u345\\uabcd/$', [
			[T.DsGsLStartMark, 603, l.v, '$/'],
			[T.SlashEscape, 605, l.v, '$/'],
			[T.DollarEscape, 607, l.v, '$$'],
			[T.Backslash, 609, l.v, '\\'],
			[T.Word, 610, l.v, 'u'],
			[T.Backslash, 611, l.v, '\\'],
			[T.Word, 612, l.v, 'u0'],
			[T.Backslash, 614, l.v, '\\'],
			[T.Word, 615, l.v, 'u12'],
			[T.Backslash, 618, l.v, '\\'],
			[T.Word, 619, l.v, 'u345'],
			[T.UnicodeEscape, 623, l.v, '\\uabcd', [
				[T.UnicodeEscapeStartMark, 623, l.v, '\\u'],
				[T.UnicodeEscapeContent, 625, l.v, 'abcd']
			]],
			[T.DsGsLEndMark, 629, l.v, '/$']
		]],
		[T.Newline, 631, l.v++, '\n'],
		[T.DsGsLiteral, 632, l.v, '$/\\\n/$', [
			[T.DsGsLStartMark, 632, l.v, '$/'],
			[T.MLSNewlineEraser, 634, l.v, '\\'],
			[T.Newline, 635, l.v++, '\n'],
			[T.DsGsLEndMark, 636, l.v, '/$']
		]],
		[T.Newline, 638, l.v++, '\n']
	];
};
