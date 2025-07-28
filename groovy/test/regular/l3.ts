import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l3 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 28, 69, l.v, '// {}[]()<>/\\~@#$%^&*?-+=_|\'"`.,:; sl\tcmt', [
			[T.SLCommentStartMark, 28, 30, l.v, '//'],
			[T.Whitespaces, 30, 31, l.v, ' '],
			[T.LBrace, 31, 32, l.v, '{'],
			[T.RBrace, 32, 33, l.v, '}'],
			[T.LBrack, 33, 34, l.v, '['],
			[T.RBrack, 34, 35, l.v, ']'],
			[T.LParen, 35, 36, l.v, '('],
			[T.RParen, 36, 37, l.v, ')'],
			[T.LAngle, 37, 38, l.v, '<'],
			[T.RAngle, 38, 39, l.v, '>'],
			[T.Slash, 39, 40, l.v, '/'],
			[T.Backslash, 40, 41, l.v, '\\'],
			[T.Tilde, 41, 42, l.v, '~'],
			[T.At, 42, 43, l.v, '@'],
			[T.Hash, 43, 44, l.v, '#'],
			[T.Dollar, 44, 45, l.v, '$'],
			[T.Percent, 45, 46, l.v, '%'],
			[T.Exponent, 46, 47, l.v, '^'],
			[T.Ampersand, 47, 48, l.v, '&'],
			[T.Asterisk, 48, 49, l.v, '*'],
			[T.QuestionS, 49, 50, l.v, '?'],
			[T.Minus, 50, 51, l.v, '-'],
			[T.Plus, 51, 52, l.v, '+'],
			[T.EqualS, 52, 53, l.v, '='],
			[T.Underscore, 53, 54, l.v, '_'],
			[T.Pipe, 54, 55, l.v, '|'],
			[T.Quote, 55, 56, l.v, '\''],
			[T.DblQuote, 56, 57, l.v, '"'],
			[T.BackQuote, 57, 58, l.v, '`'],
			[T.Dot, 58, 59, l.v, '.'],
			[T.Comma, 59, 60, l.v, ','],
			[T.ColonS, 60, 61, l.v, ':'],
			[T.Semicolon, 61, 62, l.v, ';'],
			[T.Whitespaces, 62, 63, l.v, ' '],
			[T.Word, 63, 65, l.v, 'sl'],
			[T.Tabs, 65, 66, l.v, '\t'],
			[T.Word, 66, 69, l.v, 'cmt']
		]],
		[T.Newline, 69, 70, l.v++, '\n']
	];
};