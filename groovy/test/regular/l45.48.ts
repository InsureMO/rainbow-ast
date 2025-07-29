import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l45_48 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SdqGsLiteral, 639, l.v, '"$a$a.$a.b$$$_$1$$ "', [
			[T.SdqGsLMark, 639, l.v, '"'],
			[T.GsInterpolation, 640, l.v, '$a', [
				[T.GsiStartMark, 640, l.v, '$'],
				[T.Identifier, 641, l.v, 'a']
			]],
			[T.GsInterpolation, 642, l.v, '$a', [
				[T.GsiStartMark, 642, l.v, '$'],
				[T.Identifier, 643, l.v, 'a']
			]],
			[T.Dot, 644, l.v, '.'],
			[T.GsInterpolation, 645, l.v, '$a.b', [
				[T.GsiStartMark, 645, l.v, '$'],
				[T.Identifier, 646, l.v, 'a'],
				[T.Dot, 647, l.v, '.'],
				[T.Identifier, 648, l.v, 'b']
			]],
			[T.GsInterpolation, 649, l.v, '$', [
				[T.GsiStartMark, 649, l.v, '$']
			]],
			[T.GsInterpolation, 650, l.v, '$', [
				[T.GsiStartMark, 650, l.v, '$']
			]],
			[T.GsInterpolation, 651, l.v, '$_', [
				[T.GsiStartMark, 651, l.v, '$'],
				[T.Identifier, 652, l.v, '_']
			]],
			[T.GsInterpolation, 653, l.v, '$', [
				[T.GsiStartMark, 653, l.v, '$']
			]],
			[T.Word, 654, l.v, '1'],
			[T.GsInterpolation, 655, l.v, '$', [
				[T.GsiStartMark, 655, l.v, '$']
			]],
			[T.GsInterpolation, 656, l.v, '$', [
				[T.GsiStartMark, 656, l.v, '$']
			]],
			[T.Whitespaces, 657, l.v, ' '],
			[T.SdqGsLMark, 658, l.v, '"']
		]],
		[T.Newline, 659, l.v++, '\n'],
		[T.TdqGsLiteral, 660, l.v, '"""$a$a.$a.b$$$_$1$$ """', [
			[T.TdqGsLMark, 660, l.v, '"""'],
			[T.GsInterpolation, 663, l.v, '$a', [
				[T.GsiStartMark, 663, l.v, '$'],
				[T.Identifier, 664, l.v, 'a']
			]],
			[T.GsInterpolation, 665, l.v, '$a', [
				[T.GsiStartMark, 665, l.v, '$'],
				[T.Identifier, 666, l.v, 'a']
			]],
			[T.Dot, 667, l.v, '.'],
			[T.GsInterpolation, 668, l.v, '$a.b', [
				[T.GsiStartMark, 668, l.v, '$'],
				[T.Identifier, 669, l.v, 'a'],
				[T.Dot, 670, l.v, '.'],
				[T.Identifier, 671, l.v, 'b']
			]],
			[T.GsInterpolation, 672, l.v, '$', [
				[T.GsiStartMark, 672, l.v, '$']
			]],
			[T.GsInterpolation, 673, l.v, '$', [
				[T.GsiStartMark, 673, l.v, '$']
			]],
			[T.GsInterpolation, 674, l.v, '$_', [
				[T.GsiStartMark, 674, l.v, '$'],
				[T.Identifier, 675, l.v, '_']
			]],
			[T.GsInterpolation, 676, l.v, '$', [
				[T.GsiStartMark, 676, l.v, '$']
			]],
			[T.Word, 677, l.v, '1'],
			[T.GsInterpolation, 678, l.v, '$', [
				[T.GsiStartMark, 678, l.v, '$']
			]],
			[T.GsInterpolation, 679, l.v, '$', [
				[T.GsiStartMark, 679, l.v, '$']
			]],
			[T.Whitespaces, 680, l.v, ' '],
			[T.TdqGsLMark, 681, l.v, '"""']
		]],
		[T.Newline, 684, l.v++, '\n'],
		[T.SdqGsLiteral, 685, l.v, '"${}${ }"', [
			[T.SdqGsLMark, 685, l.v, '"'],
			[T.GsInterpolation, 686, l.v, '${}', [
				[T.GsiBraceStartMark, 686, l.v, '${'],
				[T.GsiBraceEndMark, 688, l.v, '}']
			]],
			[T.GsInterpolation, 689, l.v, '${ }', [
				[T.GsiBraceStartMark, 689, l.v, '${'],
				[T.Whitespaces, 691, l.v, ' '],
				[T.GsiBraceEndMark, 692, l.v, '}']
			]],
			[T.SdqGsLMark, 693, l.v, '"']
		]],
		[T.Newline, 694, l.v++, '\n'],
		[T.TdqGsLiteral, 695, l.v, '"""${}${ }"""', [
			[T.TdqGsLMark, 695, l.v, '"""'],
			[T.GsInterpolation, 698, l.v, '${}', [
				[T.GsiBraceStartMark, 698, l.v, '${'],
				[T.GsiBraceEndMark, 700, l.v, '}']
			]],
			[T.GsInterpolation, 701, l.v, '${ }', [
				[T.GsiBraceStartMark, 701, l.v, '${'],
				[T.Whitespaces, 703, l.v, ' '],
				[T.GsiBraceEndMark, 704, l.v, '}']
			]],
			[T.TdqGsLMark, 705, l.v, '"""']
		]],
		[T.Newline, 708, l.v++, '\n']
	];
};
