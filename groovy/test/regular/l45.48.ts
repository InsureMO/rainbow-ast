import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l45_48 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SdqGsLiteral, 639, 659, l.v, '"$a$a.$a.b$$$_$1$$ "', [
			[T.SdqGsLMark, 639, 640, l.v, '"'],
			[T.GsInterpolation, 640, 642, l.v, '$a', [
				[T.GsiStartMark, 640, 641, l.v, '$'],
				[T.Identifier, 641, 642, l.v, 'a']
			]],
			[T.GsInterpolation, 642, 644, l.v, '$a', [
				[T.GsiStartMark, 642, 643, l.v, '$'],
				[T.Identifier, 643, 644, l.v, 'a']
			]],
			[T.Dot, 644, 645, l.v, '.'],
			[T.GsInterpolation, 645, 649, l.v, '$a.b', [
				[T.GsiStartMark, 645, 646, l.v, '$'],
				[T.Identifier, 646, 647, l.v, 'a'],
				[T.Dot, 647, 648, l.v, '.'],
				[T.Identifier, 648, 649, l.v, 'b']
			]],
			[T.GsInterpolation, 649, 650, l.v, '$', [
				[T.GsiStartMark, 649, 650, l.v, '$']
			]],
			[T.GsInterpolation, 650, 651, l.v, '$', [
				[T.GsiStartMark, 650, 651, l.v, '$']
			]],
			[T.GsInterpolation, 651, 653, l.v, '$_', [
				[T.GsiStartMark, 651, 652, l.v, '$'],
				[T.Identifier, 652, 653, l.v, '_']
			]],
			[T.GsInterpolation, 653, 654, l.v, '$', [
				[T.GsiStartMark, 653, 654, l.v, '$']
			]],
			[T.Word, 654, 655, l.v, '1'],
			[T.GsInterpolation, 655, 656, l.v, '$', [
				[T.GsiStartMark, 655, 656, l.v, '$']
			]],
			[T.GsInterpolation, 656, 657, l.v, '$', [
				[T.GsiStartMark, 656, 657, l.v, '$']
			]],
			[T.Whitespaces, 657, 658, l.v, ' '],
			[T.SdqGsLMark, 658, 659, l.v, '"']
		]],
		[T.Newline, 659, 660, l.v++, '\n'],
		[T.TdqGsLiteral, 660, 684, l.v, '"""$a$a.$a.b$$$_$1$$ """', [
			[T.TdqGsLMark, 660, 663, l.v, '"""'],
			[T.GsInterpolation, 663, 665, l.v, '$a', [
				[T.GsiStartMark, 663, 664, l.v, '$'],
				[T.Identifier, 664, 665, l.v, 'a']
			]],
			[T.GsInterpolation, 665, 667, l.v, '$a', [
				[T.GsiStartMark, 665, 666, l.v, '$'],
				[T.Identifier, 666, 667, l.v, 'a']
			]],
			[T.Dot, 667, 668, l.v, '.'],
			[T.GsInterpolation, 668, 672, l.v, '$a.b', [
				[T.GsiStartMark, 668, 669, l.v, '$'],
				[T.Identifier, 669, 670, l.v, 'a'],
				[T.Dot, 670, 671, l.v, '.'],
				[T.Identifier, 671, 672, l.v, 'b']
			]],
			[T.GsInterpolation, 672, 673, l.v, '$', [
				[T.GsiStartMark, 672, 673, l.v, '$']
			]],
			[T.GsInterpolation, 673, 674, l.v, '$', [
				[T.GsiStartMark, 673, 674, l.v, '$']
			]],
			[T.GsInterpolation, 674, 676, l.v, '$_', [
				[T.GsiStartMark, 674, 675, l.v, '$'],
				[T.Identifier, 675, 676, l.v, '_']
			]],
			[T.GsInterpolation, 676, 677, l.v, '$', [
				[T.GsiStartMark, 676, 677, l.v, '$']
			]],
			[T.Word, 677, 678, l.v, '1'],
			[T.GsInterpolation, 678, 679, l.v, '$', [
				[T.GsiStartMark, 678, 679, l.v, '$']
			]],
			[T.GsInterpolation, 679, 680, l.v, '$', [
				[T.GsiStartMark, 679, 680, l.v, '$']
			]],
			[T.Whitespaces, 680, 681, l.v, ' '],
			[T.TdqGsLMark, 681, 684, l.v, '"""']
		]],
		[T.Newline, 684, 685, l.v++, '\n'],
		[T.SdqGsLiteral, 685, 694, l.v, '"${}${ }"', [
			[T.SdqGsLMark, 685, 686, l.v, '"'],
			[T.GsInterpolation, 686, 689, l.v, '\${}', [
				[T.GsiBraceStartMark, 686, 688, l.v, '\${'],
				[T.GsiBraceEndMark, 688, 689, l.v, `}`]
			]],
			[T.GsInterpolation, 689, 693, l.v, `\${ }`, [
				[T.GsiBraceStartMark, 689, 691, l.v, '\${'],
				[T.Whitespaces, 691, 692, l.v, ' '],
				[T.GsiBraceEndMark, 692, 693, l.v, `}`]
			]],
			[T.SdqGsLMark, 693, 694, l.v, '"']
		]],
		[T.Newline, 694, 695, l.v++, '\n'],
		[T.TdqGsLiteral, 695, 708, l.v, '"""${}${ }"""', [
			[T.TdqGsLMark, 695, 698, l.v, '"""'],
			[T.GsInterpolation, 698, 701, l.v, '\${}', [
				[T.GsiBraceStartMark, 698, 700, l.v, '\${'],
				[T.GsiBraceEndMark, 700, 701, l.v, `}`]
			]],
			[T.GsInterpolation, 701, 705, l.v, `\${ }`, [
				[T.GsiBraceStartMark, 701, 703, l.v, '\${'],
				[T.Whitespaces, 703, 704, l.v, ' '],
				[T.GsiBraceEndMark, 704, 705, l.v, `}`]
			]],
			[T.TdqGsLMark, 705, 708, l.v, '"""']
		]],
		[T.Newline, 708, 709, l.v++, '\n']
	];
};
