import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l80_92 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 1447, l.v, '// type declaration #1', [
			[T.SLCommentStartMark, 1447, l.v, '//'],
			[T.Whitespaces, 1449, l.v, ' '],
			[T.Word, 1450, l.v, 'type'],
			[T.Whitespaces, 1454, l.v, ' '],
			[T.Word, 1455, l.v, 'declaration'],
			[T.Whitespaces, 1466, l.v, ' '],
			[T.Hash, 1467, l.v, '#'],
			[T.Word, 1468, l.v, '1']
		]],
		[T.Newline, 1469, l.v++, '\n'],
		[T.TypeDecl, 1470, l.v, 'class record;', [
			[T.CLASS, 1470, l.v, 'class'],
			[T.Whitespaces, 1475, l.v, ' '],
			[T.Identifier, 1476, l.v, 'record'],
			[T.Semicolon, 1482, l.v, ';']
		]],
		[T.Newline, 1483, l.v++, '\n'],
		[T.TypeDecl, 1484, l.v, 'class trait;', [
			[T.CLASS, 1484, l.v, 'class'],
			[T.Whitespaces, 1489, l.v, ' '],
			[T.Identifier, 1480, l.v, 'trait'],
			[T.Semicolon, 1495, l.v, ';']
		]],
		[T.Newline, 1496, l.v++, '\n'],
		[T.TypeDecl, 1497, l.v, 'class as;', [
			[T.CLASS, 1497, l.v, 'class'],
			[T.Whitespaces, 1502, l.v, ' '],
			[T.Identifier, 1503, l.v, 'as'],
			[T.Semicolon, 1505, l.v, ';']
		]],
		[T.Newline, 1506, l.v++, '\n'],
		[T.TypeDecl, 1507, l.v, 'class yield;', [
			[T.CLASS, 1507, l.v, 'class'],
			[T.Whitespaces, 1512, l.v, ' '],
			[T.Identifier, 1513, l.v, 'yield'],
			[T.Semicolon, 1518, l.v, ';']
		]],
		[T.Newline, 1519, l.v++, '\n'],
	];
};
