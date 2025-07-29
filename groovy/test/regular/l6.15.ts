import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l6_15 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 76, l.v, '// number test', [
			[T.SLCommentStartMark, 76, l.v, '//'],
			[T.Whitespaces, 78, l.v, ' '],
			[T.Word, 79, l.v, 'number'],
			[T.Whitespaces, 85, l.v, ' '],
			[T.Word, 86, l.v, 'test']
		]],
		[T.Newline, 90, l.v++, '\n'],
		[T.IntegerLiteral, 91, l.v, '0', [
			[T.Numbers, 91, l.v, '0']
		]],
		[T.Newline, 92, l.v++, '\n'],
		[T.OctalLiteral, 93, l.v, '01', [
			[T.OctalStartMark, 93, l.v, '0'],
			[T.Numbers, 94, l.v, '1']
		]],
		[T.Newline, 95, l.v++, '\n'],
		[T.BinaryLiteral, 96, l.v, '0b01i', [
			[T.BinaryStartMark, 96, l.v, '0b'],
			[T.Numbers, 98, l.v, '01'],
			[T.NumberSuffix, 100, l.v, 'i']
		]],
		[T.Newline, 101, l.v++, '\n'],
		[T.HexadecimalLiteral, 102, l.v, '0XFFG', [
			[T.HexadecimalStartMark, 102, l.v, '0X'],
			[T.Numbers, 104, l.v, 'FF'],
			[T.NumberSuffix, 106, l.v, 'G']
		]],
		[T.Newline, 107, l.v++, '\n'],
		[T.DecimalLiteral, 108, l.v, '.1f', [
			[T.NumberDecimalPoint, 108, l.v, '.'],
			[T.Numbers, 109, l.v, '1'],
			[T.NumberSuffix, 110, l.v, 'f']
		]],
		[T.Newline, 111, l.v++, '\n'],
		[T.DecimalLiteral, 112, l.v, '1.7D', [
			[T.Numbers, 112, l.v, '1'],
			[T.NumberDecimalPoint, 113, l.v, '.'],
			[T.Numbers, 114, l.v, '7'],
			[T.NumberSuffix, 115, l.v, 'D']
		]],
		[T.Newline, 116, l.v++, '\n'],
		[T.DecimalLiteral, 117, l.v, '2e+5g', [
			[T.Numbers, 117, l.v, '2'],
			[T.NumberExponent, 118, l.v, 'e+5', [
				[T.NumberExponentStartMark, 118, l.v, 'e'],
				[T.NumberExponentSign, 119, l.v, '+'],
				[T.Numbers, 120, l.v, '5']
			]],
			[T.NumberSuffix, 121, l.v, 'g']
		]],
		[T.Newline, 122, l.v++, '\n'],
		[T.DecimalLiteral, 123, l.v, '2.5E-3_1', [
			[T.Numbers, 123, l.v, '2'],
			[T.NumberDecimalPoint, 124, l.v, '.'],
			[T.Numbers, 125, l.v, '5'],
			[T.NumberExponent, 126, l.v, 'E-3_1', [
				[T.NumberExponentStartMark, 126, l.v, 'E'],
				[T.NumberExponentSign, 127, l.v, '-'],
				[T.Numbers, 128, l.v, '3'],
				[T.NumberSeparators, 129, l.v, '_'],
				[T.Numbers, 130, l.v, '1']
			]]
		]],
		[T.Newline, 131, l.v++, '\n'],
		[T.DecimalLiteral, 132, l.v, '1__2.5_6F', [
			[T.Numbers, 132, l.v, '1'],
			[T.NumberSeparators, 133, l.v, '__'],
			[T.Numbers, 135, l.v, '2'],
			[T.NumberDecimalPoint, 136, l.v, '.'],
			[T.Numbers, 137, l.v, '5'],
			[T.NumberSeparators, 138, l.v, '_'],
			[T.Numbers, 139, l.v, '6'],
			[T.NumberSuffix, 140, l.v, 'F']
		]],
		[T.Newline, 141, l.v++, '\n']
	];
};