import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l80_96 = (l: { v: number }): Array<TokenSpec> => {
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
			[T.Identifier, 1490, l.v, 'trait'],
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
		[T.TypeDecl, 1520, l.v, 'public protected private\nabstract abstract\nfinal final\nstrictfp strictfp  // abc\nstatic /*\n*/ static\ndef\nclass @interface interface enum record trait A;', [
			[T.ModifierSeg, 1520, l.v, 'public protected private\nabstract abstract\nfinal final\nstrictfp strictfp  // abc\nstatic /*\n*/ static\ndef\n', [
				[T.PUBLIC, 1520, l.v, 'public'],
				[T.Whitespaces, 1526, l.v, ' '],
				[T.PROTECTED, 1527, l.v, 'protected'],
				[T.Whitespaces, 1536, l.v, ' '],
				[T.PRIVATE, 1537, l.v, 'private'],
				[T.Newline, 1544, l.v++, '\n'],
				[T.ABSTRACT, 1545, l.v, 'abstract'],
				[T.Whitespaces, 1553, l.v, ' '],
				[T.ABSTRACT, 1554, l.v, 'abstract'],
				[T.Newline, 1562, l.v++, '\n'],
				[T.FINAL, 1563, l.v, 'final'],
				[T.Whitespaces, 1568, l.v, ' '],
				[T.FINAL, 1569, l.v, 'final'],
				[T.Newline, 1574, l.v++, '\n'],
				[T.STRICTFP, 1575, l.v, 'strictfp'],
				[T.Whitespaces, 1583, l.v, ' '],
				[T.STRICTFP, 1584, l.v, 'strictfp'],
				[T.Whitespaces, 1592, l.v, '  '],
				[T.SLComment, 1594, l.v, '// abc', [
					[T.SLCommentStartMark, 1594, l.v, '//'],
					[T.Whitespaces, 1596, l.v, ' '],
					[T.Word, 1597, l.v, 'abc']
				]],
				[T.Newline, 1600, l.v++, '\n'],
				[T.STATIC, 1601, l.v, 'static'],
				[T.Whitespaces, 1607, l.v, ' '],
				[T.MLComment, 1608, l.v, '/*\n*/', [
					[T.MLCommentStartMark, 1608, l.v, '/*'],
					[T.Newline, 1610, l.v++, '\n'],
					[T.MLCommentEndMark, 1611, l.v, '*/']
				]],
				[T.Whitespaces, 1613, l.v, ' '],
				[T.STATIC, 1614, l.v, 'static'],
				[T.Newline, 1620, l.v++, '\n'],
				[T.DEF, 1621, l.v, 'def'],
				[T.Newline, 1624, l.v++, '\n']
			]],
			[T.CLASS, 1625, l.v, 'class'],
			[T.Whitespaces, 1630, l.v, ' '],
			[T.AT_INTERFACE, 1631, l.v, '@interface'],
			[T.Whitespaces, 1641, l.v, ' '],
			[T.INTERFACE, 1642, l.v, 'interface'],
			[T.Whitespaces, 1651, l.v, ' '],
			[T.ENUM, 1652, l.v, 'enum'],
			[T.Whitespaces, 1656, l.v, ' '],
			[T.Identifier, 1657, l.v, 'record'],
			[T.Whitespaces, 1663, l.v, ' '],
			[T.Identifier, 1664, l.v, 'trait'],
			[T.Whitespaces, 1669, l.v, ' '],
			[T.Identifier, 1670, l.v, 'A'],
			[T.Semicolon, 1671, l.v, ';']
		]],
		[T.Newline, 1672, l.v++, '\n'],
		[T.TypeDecl, 1673, l.v, 'public class A extends b.C extends implements implements d.E permits f.G, i.H permits;', [
			[T.ModifierSeg, 1673, l.v, 'public ', [
				[T.PUBLIC, 1673, l.v, 'public'],
				[T.Whitespaces, 1679, l.v, ' ']
			]],
			[T.CLASS, 1680, l.v, 'class'],
			[T.Whitespaces, 1685, l.v, ' '],
			[T.Identifier, 1686, l.v, 'A'],
			[T.Whitespaces, 1687, l.v, ' '],
			[T.TypeInheritSeg, 1688, l.v, 'extends b.C ', [
				[T.EXTENDS, 1688, l.v, 'extends'],
				[T.Whitespaces, 1695, l.v, ' '],
				[T.Identifier, 1696, l.v, 'b'],
				[T.Dot, 1697, l.v, '.'],
				[T.Identifier, 1698, l.v, 'C'],
				[T.Whitespaces, 1699, l.v, ' ']
			]],
			[T.TypeInheritSeg, 1700, l.v, 'extends ', [
				[T.EXTENDS, 1700, l.v, 'extends'],
				[T.Whitespaces, 1707, l.v, ' ']
			]],
			[T.TypeInheritSeg, 1708, l.v, 'implements ', [
				[T.IMPLEMENTS, 1708, l.v, 'implements'],
				[T.Whitespaces, 1718, l.v, ' ']
			]],
			[T.TypeInheritSeg, 1719, l.v, 'implements d.E ', [
				[T.IMPLEMENTS, 1719, l.v, 'implements'],
				[T.Whitespaces, 1729, l.v, ' '],
				[T.Identifier, 1730, l.v, 'd'],
				[T.Dot, 1731, l.v, '.'],
				[T.Identifier, 1732, l.v, 'E'],
				[T.Whitespaces, 1733, l.v, ' ']
			]],
			[T.TypeInheritSeg, 1734, l.v, 'permits f.G, i.H ', [
				[T.PERMITS, 1734, l.v, 'permits'],
				[T.Whitespaces, 1741, l.v, ' '],
				[T.Identifier, 1742, l.v, 'f'],
				[T.Dot, 1743, l.v, '.'],
				[T.Identifier, 1744, l.v, 'G'],
				[T.Comma, 1745, l.v, ','],
				[T.Whitespaces, 1746, l.v, ' '],
				[T.Identifier, 1747, l.v, 'i'],
				[T.Dot, 1748, l.v, '.'],
				[T.Identifier, 1749, l.v, 'H'],
				[T.Whitespaces, 1750, l.v, ' ']
			]],
			[T.TypeInheritSeg, 1751, l.v, 'permits', [
				[T.PERMITS, 1751, l.v, 'permits']
			]],
			[T.Semicolon, 1758, l.v, ';']
		]],
		[T.Newline, 1759, l.v++, '\n'],
		[T.TypeDecl, 1760, l.v, 'class A {}', [
			[T.CLASS, 1760, l.v, 'class'],
			[T.Whitespaces, 1765, l.v, ' '],
			[T.Identifier, 1766, l.v, 'A'],
			[T.Whitespaces, 1767, l.v, ' '],
			[T.TypeBody, 1768, l.v, '{}', [
				[T.LBrace, 1768, l.v, '{'],
				[T.RBrace, 1769, l.v, '}']
			]]
		]],
		[T.Newline, 1770, l.v++, '\n'],
		[T.TypeDecl, 1771, l.v, 'public sealed class B extends C implements D permits E, F {}', [
			[T.ModifierSeg, 1771, l.v, 'public ', [
				[T.PUBLIC, 1771, l.v, 'public'],
				[T.Whitespaces, 1777, l.v, ' '],
				[T.SEALED, 1778, l.v, 'sealed'],
				[T.Whitespaces, 1784, l.v, ' '],
			]],
			[T.CLASS, 1785, l.v, 'class'],
			[T.Whitespaces, 1790, l.v, ' '],
			[T.Identifier, 1791, l.v, 'B'],
			[T.Whitespaces, 1792, l.v, ' '],
			[T.TypeInheritSeg, 1793, l.v, 'extends C ', [
				[T.EXTENDS, 1793, l.v, 'extends'],
				[T.Whitespaces, 1800, l.v, ' '],
				[T.Identifier, 1801, l.v, 'C'],
				[T.Whitespaces, 1802, l.v, ' '],
			]],
			[T.TypeInheritSeg, 1803, l.v, 'implements D ', [
				[T.IMPLEMENTS, 1803, l.v, 'implements'],
				[T.Whitespaces, 1813, l.v, ' '],
				[T.Identifier, 1814, l.v, 'D'],
				[T.Whitespaces, 1815, l.v, ' '],
			]],
			[T.TypeInheritSeg, 1816, l.v, 'permits E, F ', [
				[T.PERMITS, 1816, l.v, 'permits'],
				[T.Whitespaces, 1823, l.v, ' '],
				[T.Identifier, 1824, l.v, 'E'],
				[T.Comma, 1825, l.v, ','],
				[T.Whitespaces, 1826, l.v, ' '],
				[T.Identifier, 1827, l.v, 'F'],
				[T.Whitespaces, 1828, l.v, ' '],
			]],
			[T.TypeBody, 1829, l.v, '{}', [
				[T.LBrace, 1829, l.v, '{'],
				[T.RBrace, 1830, l.v, '}']
			]]
		]],
		[T.Newline, 1831, l.v++, '\n'],
		[T.StaticBlockDecl, 1832, l.v, 'static static {}', [
			[T.ModifierSeg, 1832, l.v, 'static static ', [
				[T.STATIC, 1832, l.v, 'static'],
				[T.Whitespaces, 1838, l.v, ' '],
				[T.STATIC, 1839, l.v, 'static'],
				[T.Whitespaces, 1845, l.v, ' '],
			]],
			[T.StaticBody, 1846, l.v, '{}', [
				[T.LBrace, 1846, l.v, '{'],
				[T.RBrace, 1847, l.v, '}']
			]]
		]],
		[T.Newline, 1848, l.v++, '\n'],
	];
};
