import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l6_15 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 76, 90, l.v, '// number test', [
			[T.SLCommentStartMark, 76, 78, l.v, '//'],
			[T.Whitespaces, 78, 79, l.v, ' '],
			[T.Word, 79, 85, l.v, 'number'],
			[T.Whitespaces, 85, 86, l.v, ' '],
			[T.Word, 86, 90, l.v, 'test']
		]],
		[T.Newline, 90, 91, l.v++, '\n'],
		[T.IntegerLiteral, 91, 92, l.v, '0', [
			[T.Numbers, 91, 92, l.v, '0']
		]],
		[T.Newline, 92, 93, l.v++, '\n'],
		[T.OctalLiteral, 93, 95, l.v, '01', [
			[T.OctalStartMark, 93, 94, l.v, '0'],
			[T.Numbers, 94, 95, l.v, '1']
		]],
		[T.Newline, 95, 96, l.v++, '\n'],
		[T.BinaryLiteral, 96, 101, l.v, '0b01i', [
			[T.BinaryStartMark, 96, 98, l.v, '0b'],
			[T.Numbers, 98, 100, l.v, '01'],
			[T.NumberSuffix, 100, 101, l.v, 'i']
		]],
		[T.Newline, 101, 102, l.v++, '\n'],
		[T.HexadecimalLiteral, 102, 107, l.v, '0XFFG', [
			[T.HexadecimalStartMark, 102, 104, l.v, '0X'],
			[T.Numbers, 104, 106, l.v, 'FF'],
			[T.NumberSuffix, 106, 107, l.v, 'G']
		]],
		[T.Newline, 107, 108, l.v++, '\n'],
		[T.DecimalLiteral, 108, 111, l.v, '.1f', [
			[T.NumberDecimalPoint, 108, 109, l.v, '.'],
			[T.Numbers, 109, 110, l.v, '1'],
			[T.NumberSuffix, 110, 111, l.v, 'f']
		]],
		[T.Newline, 111, 112, l.v++, '\n'],
		[T.DecimalLiteral, 112, 116, l.v, '1.7D', [
			[T.Numbers, 112, 113, l.v, '1'],
			[T.NumberDecimalPoint, 113, 114, l.v, '.'],
			[T.Numbers, 114, 115, l.v, '7'],
			[T.NumberSuffix, 115, 116, l.v, 'D']
		]],
		[T.Newline, 116, 117, l.v++, '\n'],
		[T.DecimalLiteral, 117, 122, l.v, '2e+5g', [
			[T.Numbers, 117, 118, l.v, '2'],
			[T.NumberExponent, 118, 121, l.v, 'e+5', [
				[T.NumberExponentStartMark, 118, 119, l.v, 'e'],
				[T.NumberExponentSign, 119, 120, l.v, '+'],
				[T.Numbers, 120, 121, l.v, '5']
			]],
			[T.NumberSuffix, 121, 122, l.v, 'g']
		]],
		[T.Newline, 122, 123, l.v++, '\n'],
		[T.DecimalLiteral, 123, 131, l.v, '2.5E-3_1', [
			[T.Numbers, 123, 124, l.v, '2'],
			[T.NumberDecimalPoint, 124, 125, l.v, '.'],
			[T.Numbers, 125, 126, l.v, '5'],
			[T.NumberExponent, 126, 131, l.v, 'E-3_1', [
				[T.NumberExponentStartMark, 126, 127, l.v, 'E'],
				[T.NumberExponentSign, 127, 128, l.v, '-'],
				[T.Numbers, 128, 129, l.v, '3'],
				[T.NumberSeparators, 129, 130, l.v, '_'],
				[T.Numbers, 130, 131, l.v, '1']
			]]
		]],
		[T.Newline, 131, 132, l.v++, '\n'],
		[T.DecimalLiteral, 132, 141, l.v, '1__2.5_6F', [
			[T.Numbers, 132, 133, l.v, '1'],
			[T.NumberSeparators, 133, 135, l.v, '__'],
			[T.Numbers, 135, 136, l.v, '2'],
			[T.NumberDecimalPoint, 136, 137, l.v, '.'],
			[T.Numbers, 137, 138, l.v, '5'],
			[T.NumberSeparators, 138, 139, l.v, '_'],
			[T.Numbers, 139, 140, l.v, '6'],
			[T.NumberSuffix, 140, 141, l.v, 'F']
		]],
		[T.Newline, 141, 142, l.v++, '\n']
	];
};