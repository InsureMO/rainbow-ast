import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l68_79 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 1107, l.v, '// import declaration', [
			[T.SLCommentStartMark, 1107, l.v, '//'],
			[T.Whitespaces, 1109, l.v, ' '],
			[T.Word, 1110, l.v, 'import'],
			[T.Whitespaces, 1116, l.v, ' '],
			[T.Word, 1117, l.v, 'declaration']
		]],
		[T.Newline, 1128, l.v++, '\n'],
		[T.ImportDecl, 1129, l.v, 'import java.lang.Integer', [
			[T.IMPORT, 1129, l.v, 'import'],
			[T.Whitespaces, 1135, l.v, ' '],
			[T.Identifier, 1136, l.v, 'java'],
			[T.Dot, 1140, l.v, '.'],
			[T.Identifier, 1141, l.v, 'lang'],
			[T.Dot, 1145, l.v, '.'],
			[T.Identifier, 1146, l.v, 'Integer']
		]],
		[T.Newline, 1153, l.v++, '\n'],
		[T.ImportDecl, 1154, l.v, 'import\tjava. lang.Integer as I', [
			[T.IMPORT, 1154, l.v, 'import'],
			[T.Tabs, 1160, l.v, '\t'],
			[T.Identifier, 1161, l.v, 'java'],
			[T.Dot, 1165, l.v, '.'],
			[T.Whitespaces, 1166, l.v, ' '],
			[T.Identifier, 1167, l.v, 'lang'],
			[T.Dot, 1171, l.v, '.'],
			[T.Identifier, 1172, l.v, 'Integer'],
			[T.Whitespaces, 1179, l.v, ' '],
			[T.AsDecl, 1180, l.v, 'as I', [
				[T.AS, 1180, l.v, 'as'],
				[T.Whitespaces, 1182, l.v, ' '],
				[T.Identifier, 1183, l.v, 'I']
			]]
		]],
		[T.Newline, 1184, l.v++, '\n'],
		[T.ImportDecl, 1185, l.v, 'import java.lang.*', [
			[T.IMPORT, 1185, l.v, 'import'],
			[T.Whitespaces, 1191, l.v, ' '],
			[T.Identifier, 1192, l.v, 'java'],
			[T.Dot, 1196, l.v, '.'],
			[T.Identifier, 1197, l.v, 'lang'],
			[T.Dot, 1201, l.v, '.'],
			[T.Asterisk, 1202, l.v, '*']
		]],
		[T.Newline, 1203, l.v++, '\n'],
		[T.ImportDecl, 1204, l.v, 'import static java./*\n*/lang.Integer.MIN_VALUE as MIN;', [
			[T.IMPORT, 1204, l.v, 'import'],
			[T.Whitespaces, 1210, l.v, ' '],
			[T.STATIC, 1211, l.v, 'static'],
			[T.Whitespaces, 1217, l.v, ' '],
			[T.Identifier, 1218, l.v, 'java'],
			[T.Dot, 1222, l.v, '.'],
			[T.MLComment, 1223, l.v, '/*\n*/', [
				[T.MLCommentStartMark, 1223, l.v, '/*'],
				[T.Newline, 1225, l.v++, '\n'],
				[T.MLCommentEndMark, 1226, l.v, '*/']
			]],
			[T.Identifier, 1228, l.v, 'lang'],
			[T.Dot, 1232, l.v, '.'],
			[T.Identifier, 1233, l.v, 'Integer'],
			[T.Dot, 1240, l.v, '.'],
			[T.Identifier, 1241, l.v, 'MIN_VALUE'],
			[T.Whitespaces, 1250, l.v, ' '],
			[T.AsDecl, 1251, l.v, 'as MIN', [
				[T.AS, 1251, l.v, 'as'],
				[T.Whitespaces, 1253, l.v, ' '],
				[T.Identifier, 1254, l.v, 'MIN']
			]],
			[T.Semicolon, 1257, l.v, ';']
		]],
		[T.Newline, 1258, l.v++, '\n'],
		[T.ImportDecl, 1259, l.v, 'import static java.lang.Integer.*', [
			[T.IMPORT, 1259, l.v, 'import'],
			[T.Whitespaces, 1265, l.v, ' '],
			[T.STATIC, 1266, l.v, 'static'],
			[T.Whitespaces, 1272, l.v, ' '],
			[T.Identifier, 1273, l.v, 'java'],
			[T.Dot, 1277, l.v, '.'],
			[T.Identifier, 1278, l.v, 'lang'],
			[T.Dot, 1282, l.v, '.'],
			[T.Identifier, 1283, l.v, 'Integer'],
			[T.Dot, 1290, l.v, '.'],
			[T.Asterisk, 1291, l.v, '*']
		]],
		[T.Newline, 1292, l.v++, '\n'],
		[T.ImportDecl, 1293, l.v, 'import java.', [
			[T.IMPORT, 1293, l.v, 'import'],
			[T.Whitespaces, 1299, l.v, ' '],
			[T.Identifier, 1300, l.v, 'java'],
			[T.Dot, 1304, l.v, '.']
		]],
		[T.Dot, 1305, l.v, '.'],
		[T.Semicolon, 1306, l.v, ';'],
		[T.Newline, 1307, l.v++, '\n'],
		[T.ImportDecl, 1308, l.v, 'import java.lang.', [
			[T.IMPORT, 1308, l.v, 'import'],
			[T.Whitespaces, 1314, l.v, ' '],
			[T.Identifier, 1315, l.v, 'java'],
			[T.Dot, 1319, l.v, '.'],
			[T.Identifier, 1320, l.v, 'lang'],
			[T.Dot, 1324, l.v, '.']
		]],
		[T.Newline, 1325, l.v++, '\n'],
		[T.ImportDecl, 1326, l.v, 'import java ', [
			[T.IMPORT, 1326, l.v, 'import'],
			[T.Whitespaces, 1332, l.v, ' '],
			[T.Identifier, 1333, l.v, 'java'],
			[T.Whitespaces, 1337, l.v, ' ']
		]],
		[T.Identifier, 1338, l.v, 'lang'],
		[T.Newline, 1342, l.v++, '\n'],
		[T.ImportDecl, 1343, l.v, 'import java.lang.Integer as as', [
			[T.IMPORT, 1343, l.v, 'import'],
			[T.Whitespaces, 1349, l.v, ' '],
			[T.Identifier, 1350, l.v, 'java'],
			[T.Dot, 1354, l.v, '.'],
			[T.Identifier, 1355, l.v, 'lang'],
			[T.Dot, 1359, l.v, '.'],
			[T.Identifier, 1360, l.v, 'Integer'],
			[T.Whitespaces, 1367, l.v, ' '],
			[T.AsDecl, 1368, l.v, 'as as', [
				[T.AS, 1368, l.v, 'as'],
				[T.Whitespaces, 1370, l.v, ' '],
				[T.Identifier, 1371, l.v, 'as']
			]]
		]],
		[T.Newline, 1373, l.v++, '\n'],
		[T.ImportDecl, 1374, l.v, 'import as.def.var.record.sealed.trait.permits.yield.in.Integer as record', [
			[T.IMPORT, 1374, l.v, 'import'],
			[T.Whitespaces, 1380, l.v, ' '],
			[T.Identifier, 1381, l.v, 'as'],
			[T.Dot, 1383, l.v, '.'],
			[T.Identifier, 1384, l.v, 'def'],
			[T.Dot, 1387, l.v, '.'],
			[T.Identifier, 1388, l.v, 'var'],
			[T.Dot, 1391, l.v, '.'],
			[T.Identifier, 1392, l.v, 'record'],
			[T.Dot, 1398, l.v, '.'],
			[T.Identifier, 1399, l.v, 'sealed'],
			[T.Dot, 1405, l.v, '.'],
			[T.Identifier, 1406, l.v, 'trait'],
			[T.Dot, 1411, l.v, '.'],
			[T.Identifier, 1412, l.v, 'permits'],
			[T.Dot, 1419, l.v, '.'],
			[T.Identifier, 1420, l.v, 'yield'],
			[T.Dot, 1425, l.v, '.'],
			[T.Identifier, 1426, l.v, 'in'],
			[T.Dot, 1428, l.v, '.'],
			[T.Identifier, 1429, l.v, 'Integer'],
			[T.Whitespaces, 1436, l.v, ' '],
			[T.AsDecl, 1437, l.v, 'as record', [
				[T.AS, 1437, l.v, 'as'],
				[T.Whitespaces, 1439, l.v, ' '],
				[T.Identifier, 1440, l.v, 'record']
			]]
		]],
		[T.Newline, 1446, l.v++, '\n']
	];
};
