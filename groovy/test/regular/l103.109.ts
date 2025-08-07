import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l103_109 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 2012, l.v, '// field declaration #1', [
			[T.SLCommentStartMark, 2012, l.v, '//'],
			[T.Whitespaces, 2014, l.v, ' '],
			[T.Word, 2015, l.v, 'field'],
			[T.Whitespaces, 2020, l.v, ' '],
			[T.Word, 2021, l.v, 'declaration'],
			[T.Whitespaces, 2032, l.v, ' '],
			[T.Hash, 2033, l.v, '#'],
			[T.Word, 2034, l.v, '1']
		]],
		[T.Newline, 2035, l.v++, '\n'],
		[T.TypeDecl, 2036, l.v, 'class A {\n\tdef a\n\tpublic transient int long b\n\tvolatile java.util.List c =\n\tpublic float d, e\n}', [
			[T.CLASS, 2036, l.v, 'class'],
			[T.Whitespaces, 2041, l.v, ' '],
			[T.Identifier, 2042, l.v, 'A'],
			[T.Whitespaces, 2043, l.v, ' '],
			[T.TypeBody, 2044, l.v, '{\n\tdef a\n\tpublic transient int long b\n\t\tvolatile java.util.List c =\n\tpublic float d, e\n}', [
				[T.LBrace, 2044, l.v, '{'],
				[T.Newline, 2045, l.v++, '\n'],
				[T.Tabs, 2046, l.v, '\t'],
				[T.FieldDecl, 2047, l.v, 'def a', [
					[T.ModifierSeg, 2047, l.v, 'def ', [
						[T.DEF, 2047, l.v, 'def'],
						[T.Whitespaces, 2050, l.v, ' ']
					]],
					[T.MfvTypeSeg, 2051, l.v, 'a', [
						[T.Identifier, 2051, l.v, 'a']
					]],
					[T.Newline, 2052, l.v++, '\n'],
					[T.Tabs, 2053, l.v, '\t']
				]],
				[T.FieldDecl, 2054, l.v, 'public transient int long b', [
					[T.ModifierSeg, 2054, l.v, 'public transient ', [
						[T.PUBLIC, 2054, l.v, 'public'],
						[T.Whitespaces, 2060, l.v, ' '],
						[T.TRANSIENT, 2061, l.v, 'transient'],
						[T.Whitespaces, 2070, l.v, ' ']
					]],
					[T.MfvTypeSeg, 2071, l.v, 'int long ', [
						[T.INT, 2071, l.v, 'int'],
						[T.Whitespaces, 2074, l.v, ' '],
						[T.LONG, 2075, l.v, 'long'],
						[T.Whitespaces, 2079, l.v, ' ']
					]],
					[T.Identifier, 2080, l.v, 'b'],
					[T.Newline, 2081, l.v++, '\n'],
					[T.Tabs, 2082, l.v, '\t\t']
				]],
				[T.FieldDecl, 2084, l.v, 'volatile java.util.List c =', [
					[T.ModifierSeg, 2084, l.v, 'volatile ', [
						[T.VOLATILE, 2084, l.v, 'volatile'],
						[T.Whitespaces, 2092, l.v, ' ']
					]],
					[T.MfvTypeSeg, 2093, l.v, 'java.util.List ', [
						[T.Identifier, 2093, l.v, 'java'],
						[T.Dot, 2097, l.v, '.'],
						[T.Identifier, 2098, l.v, 'util'],
						[T.Dot, 2102, l.v, '.'],
						[T.Identifier, 2103, l.v, 'List'],
						[T.Whitespaces, 2107, l.v, ' ']
					]],
					[T.Identifier, 2108, l.v, 'c'],
					[T.Whitespaces, 2109, l.v, ' '],
					[T.Assign, 2110, l.v, '=']
				]],
				[T.Newline, 2111, l.v++, '\n'],
				[T.Tabs, 2112, l.v, '\t'],
				[T.FieldDecl, 2113, l.v, 'public float d, e', [
					[T.ModifierSeg, 2113, l.v, 'public ', [
						[T.PUBLIC, 2113, l.v, 'public'],
						[T.Whitespaces, 2119, l.v, ' ']
					]],
					[T.MfvTypeSeg, 2120, l.v, 'float ', [
						[T.FLOAT, 2120, l.v, 'float'],
						[T.Whitespaces, 2125, l.v, ' ']
					]],
					[T.Identifier, 2126, l.v, 'd'],
					[T.Comma, 2127, l.v, ','],
					[T.Whitespaces, 2128, l.v, ' '],
					[T.Identifier, 2129, l.v, 'e'],
					[T.Newline, 2130, l.v++, '\n'],
				]],
				[T.RBrace, 2131, l.v, '}']
			]]
		]],
		[T.Newline, 2132, l.v++, '\n']
	];
};
