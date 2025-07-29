import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l49 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SGsLiteral, 709, l.v, '/$a$a.$a.b$$$_$1$$ a${}${ }$/', [
			[T.SGsLMark, 709, l.v, '/'],
			[T.GsInterpolation, 710, l.v, '$a', [
				[T.GsiStartMark, 710, l.v, '$'],
				[T.Identifier, 711, l.v, 'a']
			]],
			[T.GsInterpolation, 712, l.v, '$a', [
				[T.GsiStartMark, 712, l.v, '$'],
				[T.Identifier, 713, l.v, 'a']
			]],
			[T.Dot, 714, l.v, '.'],
			[T.GsInterpolation, 715, l.v, '$a.b', [
				[T.GsiStartMark, 715, l.v, '$'],
				[T.Identifier, 716, l.v, 'a'],
				[T.Dot, 717, l.v, '.'],
				[T.Identifier, 718, l.v, 'b']
			]],
			[T.Dollar, 719, l.v, '$'],
			[T.Dollar, 720, l.v, '$'],
			[T.GsInterpolation, 721, l.v, '$_', [
				[T.GsiStartMark, 721, l.v, '$'],
				[T.Identifier, 722, l.v, '_']
			]],
			[T.Dollar, 723, l.v, '$'],
			[T.Word, 724, l.v, '1'],
			[T.Dollar, 725, l.v, '$'],
			[T.Dollar, 726, l.v, '$'],
			[T.Whitespaces, 727, l.v, ' '],
			[T.Word, 728, l.v, 'a'],
			[T.GsInterpolation, 729, l.v, '${}', [
				[T.GsiBraceStartMark, 729, l.v, '${'],
				[T.GsiBraceEndMark, 731, l.v, '}']
			]],
			[T.GsInterpolation, 732, l.v, '${ }', [
				[T.GsiBraceStartMark, 732, l.v, '${'],
				[T.Whitespaces, 734, l.v, ' '],
				[T.GsiBraceEndMark, 735, l.v, '}']
			]],
			[T.Dollar, 736, l.v, '$'],
			[T.SGsLMark, 737, l.v, '/']
		]],
		[T.Newline, 738, l.v++, '\n']
	];
};
