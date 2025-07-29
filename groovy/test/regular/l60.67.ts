import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l60_67 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 933, 955, l.v, '// package declaration', [
			[T.SLCommentStartMark, 933, 935, l.v, '//'],
			[T.Whitespaces, 935, 936, l.v, ' '],
			[T.Word, 936, 943, l.v, 'package'],
			[T.Whitespaces, 943, 944, l.v, ' '],
			[T.Word, 944, 955, l.v, 'declaration']
		]],
		[T.Newline, 955, 956, l.v++, '\n'],
		[T.PackageDecl, 956, 973, l.v, 'package java.util', [
			[T.PACKAGE, 956, 963, l.v, 'package'],
			[T.Whitespaces, 963, 964, l.v, ' '],
			[T.Identifier, 964, 968, l.v, 'java'],
			[T.Dot, 968, 969, l.v, '.'],
			[T.Identifier, 969, 973, l.v, 'util']
		]],
		[T.Newline, 973, 974, l.v++, '\n'],
		[T.PackageDecl, 974, 997, l.v, 'package\tjava./*\n*/util;', [
			[T.PACKAGE, 974, 981, l.v, 'package'],
			[T.Tabs, 981, 982, l.v, '\t'],
			[T.Identifier, 982, 986, l.v, 'java'],
			[T.Dot, 986, 987, l.v, '.'],
			[T.MLComment, 987, 992, l.v, '/*\n*/', [
				[T.MLCommentStartMark, 987, 989, l.v, '/*'],
				[T.Newline, 989, 990, l.v++, '\n'],
				[T.MLCommentEndMark, 990, 992, l.v, '*/']
			]],
			[T.Identifier, 992, 996, l.v, 'util'],
			[T.Semicolon, 996, 997, l.v, ';']
		]],
		[T.Newline, 997, 998, l.v++, '\n'],
		[T.PackageDecl, 998, 1011, l.v, 'package java.', [
			[T.PACKAGE, 998, 1005, l.v, 'package'],
			[T.Whitespaces, 1005, 1006, l.v, ' '],
			[T.Identifier, 1006, 1010, l.v, 'java'],
			[T.Dot, 1010, 1011, l.v, '.']
		]],
		[T.Dot, 1011, 1012, l.v, '.'],
		[T.Newline, 1012, 1013, l.v++, '\n'],
		[T.PackageDecl, 1013, 1031, l.v, 'package java.util.', [
			[T.PACKAGE, 1013, 1020, l.v, 'package'],
			[T.Whitespaces, 1020, 1021, l.v, ' '],
			[T.Identifier, 1021, 1025, l.v, 'java'],
			[T.Dot, 1025, 1026, l.v, '.'],
			[T.Identifier, 1026, 1030, l.v, 'util'],
			[T.Dot, 1030, 1031, l.v, '.'],
		]],
		[T.Newline, 1031, 1032, l.v++, '\n'],
		[T.PackageDecl, 1032, 1045, l.v, 'package java ', [
			[T.PACKAGE, 1032, 1039, l.v, 'package'],
			[T.Whitespaces, 1039, 1040, l.v, ' '],
			[T.Identifier, 1040, 1044, l.v, 'java'],
			[T.Whitespaces, 1044, 1045, l.v, ' '],
		]],
		[T.Identifier, 1045, 1049, l.v, 'util'],
		[T.Newline, 1049, 1050, l.v++, '\n'],
		[T.PackageDecl, 1050, 1099, l.v, 'package as.def.var.record.sealed.permits.yield.in', [
			[T.PACKAGE, 1050, 1057, l.v, 'package'],
			[T.Whitespaces, 1057, 1058, l.v, ' '],
			[T.Identifier, 1058, 1060, l.v, 'as'],
			[T.Dot, 1060, 1061, l.v, '.'],
			[T.Identifier, 1061, 1064, l.v, 'def'],
			[T.Dot, 1064, 1065, l.v, '.'],
			[T.Identifier, 1065, 1068, l.v, 'var'],
			[T.Dot, 1068, 1069, l.v, '.'],
			[T.Identifier, 1069, 1075, l.v, 'record'],
			[T.Dot, 1075, 1076, l.v, '.'],
			[T.Identifier, 1076, 1082, l.v, 'sealed'],
			[T.Dot, 1082, 1083, l.v, '.'],
			[T.Identifier, 1083, 1090, l.v, 'permits'],
			[T.Dot, 1090, 1091, l.v, '.'],
			[T.Identifier, 1091, 1096, l.v, 'yield'],
			[T.Dot, 1096, 1097, l.v, '.'],
			[T.Identifier, 1097, 1099, l.v, 'in'],
		]],
		[T.Newline, 1099, 1100, l.v++, '\n'],
	];
};
