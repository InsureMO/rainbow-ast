import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l3 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 28, l.v, '// {}[]()<>/\\~@#$%^&*?-+=_|\'"`.,:; sl\tcmt', [
			[T.SLCommentStartMark, 28, l.v, '//'],
			[T.Whitespaces, 30, l.v, ' '],
			[T.LBrace, 31, l.v, '{'],
			[T.RBrace, 32, l.v, '}'],
			[T.LBrack, 33, l.v, '['],
			[T.RBrack, 34, l.v, ']'],
			[T.LParen, 35, l.v, '('],
			[T.RParen, 36, l.v, ')'],
			[T.LAngle, 37, l.v, '<'],
			[T.RAngle, 38, l.v, '>'],
			[T.Slash, 39, l.v, '/'],
			[T.Backslash, 40, l.v, '\\'],
			[T.Tilde, 41, l.v, '~'],
			[T.At, 42, l.v, '@'],
			[T.Hash, 43, l.v, '#'],
			[T.Dollar, 44, l.v, '$'],
			[T.Percent, 45, l.v, '%'],
			[T.Exponent, 46, l.v, '^'],
			[T.Ampersand, 47, l.v, '&'],
			[T.Asterisk, 48, l.v, '*'],
			[T.QuestionS, 49, l.v, '?'],
			[T.Minus, 50, l.v, '-'],
			[T.Plus, 51, l.v, '+'],
			[T.EqualS, 52, l.v, '='],
			[T.Underscore, 53, l.v, '_'],
			[T.Pipe, 54, l.v, '|'],
			[T.Quote, 55, l.v, '\''],
			[T.DblQuote, 56, l.v, '"'],
			[T.BackQuote, 57, l.v, '`'],
			[T.Dot, 58, l.v, '.'],
			[T.Comma, 59, l.v, ','],
			[T.ColonS, 60, l.v, ':'],
			[T.Semicolon, 61, l.v, ';'],
			[T.Whitespaces, 62, l.v, ' '],
			[T.Word, 63, l.v, 'sl'],
			[T.Tabs, 65, l.v, '\t'],
			[T.Word, 66, l.v, 'cmt']
		]],
		[T.Newline, 69, l.v++, '\n']
	];
};