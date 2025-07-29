import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l60_67 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 933, l.v, '// package declaration', [
			[T.SLCommentStartMark, 933, l.v, '//'],
			[T.Whitespaces, 935, l.v, ' '],
			[T.Word, 936, l.v, 'package'],
			[T.Whitespaces, 943, l.v, ' '],
			[T.Word, 944, l.v, 'declaration']
		]],
		[T.Newline, 955, l.v++, '\n'],
		[T.PackageDecl, 956, l.v, 'package java.util', [
			[T.PACKAGE, 956, l.v, 'package'],
			[T.Whitespaces, 963, l.v, ' '],
			[T.Identifier, 964, l.v, 'java'],
			[T.Dot, 968, l.v, '.'],
			[T.Identifier, 969, l.v, 'util']
		]],
		[T.Newline, 973, l.v++, '\n'],
		[T.PackageDecl, 974, l.v, 'package\tjava./*\n*/util;', [
			[T.PACKAGE, 974, l.v, 'package'],
			[T.Tabs, 981, l.v, '\t'],
			[T.Identifier, 982, l.v, 'java'],
			[T.Dot, 986, l.v, '.'],
			[T.MLComment, 987, l.v, '/*\n*/', [
				[T.MLCommentStartMark, 987, l.v, '/*'],
				[T.Newline, 989, l.v++, '\n'],
				[T.MLCommentEndMark, 990, l.v, '*/']
			]],
			[T.Identifier, 992, l.v, 'util'],
			[T.Semicolon, 996, l.v, ';']
		]],
		[T.Newline, 997, l.v++, '\n'],
		[T.PackageDecl, 998, l.v, 'package java.', [
			[T.PACKAGE, 998, l.v, 'package'],
			[T.Whitespaces, 1005, l.v, ' '],
			[T.Identifier, 1006, l.v, 'java'],
			[T.Dot, 1010, l.v, '.']
		]],
		[T.Dot, 1011, l.v, '.'],
		[T.Semicolon, 1012, l.v, ';'],
		[T.Newline, 1013, l.v++, '\n'],
		[T.PackageDecl, 1014, l.v, 'package java.util.', [
			[T.PACKAGE, 1014, l.v, 'package'],
			[T.Whitespaces, 1021, l.v, ' '],
			[T.Identifier, 1022, l.v, 'java'],
			[T.Dot, 1026, l.v, '.'],
			[T.Identifier, 1027, l.v, 'util'],
			[T.Dot, 1031, l.v, '.']
		]],
		[T.Newline, 1032, l.v++, '\n'],
		[T.PackageDecl, 1033, l.v, 'package java ', [
			[T.PACKAGE, 1033, l.v, 'package'],
			[T.Whitespaces, 1040, l.v, ' '],
			[T.Identifier, 1041, l.v, 'java'],
			[T.Whitespaces, 1045, l.v, ' ']
		]],
		[T.Identifier, 1046, l.v, 'util'],
		[T.Newline, 1050, l.v++, '\n'],
		[T.PackageDecl, 1051, l.v, 'package as.def.var.record.sealed.permits.yield.in', [
			[T.PACKAGE, 1051, l.v, 'package'],
			[T.Whitespaces, 1058, l.v, ' '],
			[T.Identifier, 1059, l.v, 'as'],
			[T.Dot, 1061, l.v, '.'],
			[T.Identifier, 1062, l.v, 'def'],
			[T.Dot, 1065, l.v, '.'],
			[T.Identifier, 1066, l.v, 'var'],
			[T.Dot, 1069, l.v, '.'],
			[T.Identifier, 1070, l.v, 'record'],
			[T.Dot, 1076, l.v, '.'],
			[T.Identifier, 1077, l.v, 'sealed'],
			[T.Dot, 1083, l.v, '.'],
			[T.Identifier, 1084, l.v, 'permits'],
			[T.Dot, 1091, l.v, '.'],
			[T.Identifier, 1092, l.v, 'yield'],
			[T.Dot, 1097, l.v, '.'],
			[T.Identifier, 1098, l.v, 'in']
		]],
		[T.Newline, 1100, l.v++, '\n']
	];
};
