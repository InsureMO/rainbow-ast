import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l49 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SGsLiteral, 709, 738, l.v, '/$a$a.$a.b$$$_$1$$ a${}${ }$/', [
			[T.SGsLMark, 709, 710, l.v, '/'],
			[T.GsInterpolation, 710, 712, l.v, '$a', [
				[T.GsiStartMark, 710, 711, l.v, '$'],
				[T.Identifier, 711, 712, l.v, 'a']
			]],
			[T.GsInterpolation, 712, 714, l.v, '$a', [
				[T.GsiStartMark, 712, 713, l.v, '$'],
				[T.Identifier, 713, 714, l.v, 'a']
			]],
			[T.Dot, 714, 715, l.v, '.'],
			[T.GsInterpolation, 715, 719, l.v, '$a.b', [
				[T.GsiStartMark, 715, 716, l.v, '$'],
				[T.Identifier, 716, 717, l.v, 'a'],
				[T.Dot, 717, 718, l.v, '.'],
				[T.Identifier, 718, 719, l.v, 'b']
			]],
			[T.Dollar, 719, 720, l.v, '$'],
			[T.Dollar, 720, 721, l.v, '$'],
			[T.GsInterpolation, 721, 723, l.v, '$_', [
				[T.GsiStartMark, 721, 722, l.v, '$'],
				[T.Identifier, 722, 723, l.v, '_']
			]],
			[T.Dollar, 723, 724, l.v, '$'],
			[T.Word, 724, 725, l.v, '1'],
			[T.Dollar, 725, 726, l.v, '$'],
			[T.Dollar, 726, 727, l.v, '$'],
			[T.Whitespaces, 727, 728, l.v, ' '],
			[T.Word, 728, 729, l.v, 'a'],
			[T.GsInterpolation, 729, 732, l.v, '${}', [
				[T.GsiBraceStartMark, 729, 731, l.v, '${'],
				[T.GsiBraceEndMark, 731, 732, l.v, '}']
			]],
			[T.GsInterpolation, 732, 736, l.v, '${ }', [
				[T.GsiBraceStartMark, 732, 734, l.v, '${'],
				[T.Whitespaces, 734, 735, l.v, ' '],
				[T.GsiBraceEndMark, 735, 736, l.v, '}']
			]],
			[T.Dollar, 736, 737, l.v, '$'],
			[T.SGsLMark, 737, 738, l.v, '/']
		]],
		[T.Newline, 738, 739, l.v++, '\n']
	];
};
