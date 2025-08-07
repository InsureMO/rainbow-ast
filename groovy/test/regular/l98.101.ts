import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l98_101 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 1868, l.v, '// method declaration #1', [
			[T.SLCommentStartMark, 1868, l.v, '//'],
			[T.Whitespaces, 1870, l.v, ' '],
			[T.Word, 1871, l.v, 'method'],
			[T.Whitespaces, 1877, l.v, ' '],
			[T.Word, 1878, l.v, 'declaration'],
			[T.Whitespaces, 1889, l.v, ' '],
			[T.Hash, 1890, l.v, '#'],
			[T.Word, 1891, l.v, '1']
		]],
		[T.Newline, 1892, l.v++, '\n'],
		[T.MethodDecl, 1893, l.v, 'void test() {}', [
			[T.MfvTypeSeg, 1893, l.v, 'void ', [
				[T.VOID, 1893, l.v, 'void'],
				[T.Whitespaces, 1897, l.v, ' ']
			]],
			[T.Identifier, 1898, l.v, 'test'],
			[T.MethodParamsBlk, 1902, l.v, '()', [
				[T.LParen, 1902, l.v, '('],
				[T.RParen, 1903, l.v, ')']
			]],
			[T.Whitespaces, 1904, l.v, ' '],
			[T.MethodBody, 1905, l.v, '{}', [
				[T.LBrace, 1905, l.v, '{'],
				[T.RBrace, 1906, l.v, '}']
			]]
		]],
		[T.Newline, 1907, l.v++, '\n'],
		[T.MethodDecl, 1908, l.v, 'boolean void test();', [
			[T.MfvTypeSeg, 1908, l.v, 'boolean void ', [
				[T.BOOLEAN, 1908, l.v, 'boolean'],
				[T.Whitespaces, 1915, l.v, ' '],
				[T.VOID, 1916, l.v, 'void'],
				[T.Whitespaces, 1920, l.v, ' ']
			]],
			[T.Identifier, 1921, l.v, 'test'],
			[T.MethodParamsBlk, 1925, l.v, '()', [
				[T.LParen, 1925, l.v, '('],
				[T.RParen, 1926, l.v, ')']
			]],
			[T.Semicolon, 1927, l.v, ';']
		]],
		[T.Newline, 1928, l.v++, '\n'],
		[T.MethodDecl, 1929, l.v, 'public java.util.List test() throws IOException, e.E {}', [
			[T.ModifierSeg, 1929, l.v, 'public ', [
				[T.PUBLIC, 1929, l.v, 'public'],
				[T.Whitespaces, 1935, l.v, ' ']
			]],
			[T.MfvTypeSeg, 1936, l.v, 'java.util.List ', [
				[T.Identifier, 1936, l.v, 'java'],
				[T.Dot, 1940, l.v, '.'],
				[T.Identifier, 1941, l.v, 'util'],
				[T.Dot, 1945, l.v, '.'],
				[T.Identifier, 1946, l.v, 'List'],
				[T.Whitespaces, 1950, l.v, ' ']
			]],
			[T.Identifier, 1951, l.v, 'test'],
			[T.MethodParamsBlk, 1955, l.v, '()', [
				[T.LParen, 1955, l.v, '('],
				[T.RParen, 1956, l.v, ')']
			]],
			[T.Whitespaces, 1957, l.v, ' '],
			[T.MethodThrowsSeg, 1958, l.v, 'throws IOException, e.E ', [
				[T.THROWS, 1958, l.v, 'throws'],
				[T.Whitespaces, 1964, l.v, ' '],
				[T.Identifier, 1965, l.v, 'IOException'],
				[T.Comma, 1976, l.v, ','],
				[T.Whitespaces, 1977, l.v, ' '],
				[T.Identifier, 1978, l.v, 'e'],
				[T.Dot, 1979, l.v, '.'],
				[T.Identifier, 1980, l.v, 'E'],
				[T.Whitespaces, 1981, l.v, ' ']
			]],
			[T.MethodBody, 1982, l.v, '{}', [
				[T.LBrace, 1982, l.v, '{'],
				[T.RBrace, 1983, l.v, '}']
			]]
		]],
		[T.Newline, 1984, l.v++, '\n']
	];
};
