import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l50_59 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.DsGsLiteral, 739, l.v, '$/abc $$$abc $abc/$', [
			[T.DsGsLStartMark, 739, l.v, '$/'],
			[T.Word, 741, l.v, 'abc'],
			[T.Whitespaces, 744, l.v, ' '],
			[T.DollarEscape, 745, l.v, '$$'],
			[T.Dollar, 747, l.v, '$'],
			[T.Word, 748, l.v, 'abc'],
			[T.Whitespaces, 751, l.v, ' '],
			[T.GsInterpolation, 752, l.v, '$abc', [
				[T.GsiStartMark, 752, l.v, '$'],
				[T.Identifier, 753, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 756, l.v, '/$']
		]],
		[T.Newline, 758, l.v++, '\n'],
		[T.DsGsLiteral, 759, l.v, '$/abc $abc $$$abc/$', [
			[T.DsGsLStartMark, 759, l.v, '$/'],
			[T.Word, 761, l.v, 'abc'],
			[T.Whitespaces, 764, l.v, ' '],
			[T.GsInterpolation, 765, l.v, '$abc', [
				[T.GsiStartMark, 765, l.v, '$'],
				[T.Identifier, 766, l.v, 'abc']
			]],
			[T.Whitespaces, 769, l.v, ' '],
			[T.DollarEscape, 770, l.v, '$$'],
			[T.GsInterpolation, 772, l.v, '$abc', [
				[T.GsiStartMark, 772, l.v, '$'],
				[T.Identifier, 773, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 776, l.v, '/$']
		]],
		[T.Newline, 778, l.v++, '\n'],
		[T.DsGsLiteral, 779, l.v, '$/abc $$${abc} $abc/$', [
			[T.DsGsLStartMark, 779, l.v, '$/'],
			[T.Word, 781, l.v, 'abc'],
			[T.Whitespaces, 784, l.v, ' '],
			[T.DollarEscape, 785, l.v, '$$'],
			[T.Dollar, 787, l.v, '$'],
			[T.LBrace, 788, l.v, '{'],
			[T.Word, 789, l.v, 'abc'],
			[T.RBrace, 792, l.v, '}'],
			[T.Whitespaces, 793, l.v, ' '],
			[T.GsInterpolation, 794, l.v, '$abc', [
				[T.GsiStartMark, 794, l.v, '$'],
				[T.Identifier, 795, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 798, l.v, '/$']
		]],
		[T.Newline, 800, l.v++, '\n'],
		[T.DsGsLiteral, 801, l.v, '$/abc ${abc} $$${abc}/$', [
			[T.DsGsLStartMark, 801, l.v, '$/'],
			[T.Word, 803, l.v, 'abc'],
			[T.Whitespaces, 806, l.v, ' '],
			[T.GsInterpolation, 807, l.v, '${abc}', [
				[T.GsiBraceStartMark, 807, l.v, '${'],
				[T.Identifier, 809, l.v, 'abc'],
				[T.GsiBraceEndMark, 812, l.v, '}']
			]],
			[T.Whitespaces, 813, l.v, ' '],
			[T.DollarEscape, 814, l.v, '$$'],
			[T.GsInterpolation, 816, l.v, '${abc}', [
				[T.GsiBraceStartMark, 816, l.v, '${'],
				[T.Identifier, 818, l.v, 'abc'],
				[T.GsiBraceEndMark, 821, l.v, '}']
			]],
			[T.DsGsLEndMark, 822, l.v, '/$']
		]],
		[T.Newline, 824, l.v++, '\n'],
		[T.DsGsLiteral, 825, l.v, '$/$/$abc $abc/$', [
			[T.DsGsLStartMark, 825, l.v, '$/'],
			[T.SlashEscape, 827, l.v, '$/'],
			[T.Dollar, 829, l.v, '$'],
			[T.Word, 830, l.v, 'abc'],
			[T.Whitespaces, 833, l.v, ' '],
			[T.GsInterpolation, 834, l.v, '$abc', [
				[T.GsiStartMark, 834, l.v, '$'],
				[T.Identifier, 835, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 838, l.v, '/$']
		]],
		[T.Newline, 840, l.v++, '\n'],
		[T.DsGsLiteral, 841, l.v, '$/$abc $/$abc/$', [
			[T.DsGsLStartMark, 841, l.v, '$/'],
			[T.GsInterpolation, 843, l.v, '$abc', [
				[T.GsiStartMark, 843, l.v, '$'],
				[T.Identifier, 844, l.v, 'abc']
			]],
			[T.Whitespaces, 847, l.v, ' '],
			[T.SlashEscape, 848, l.v, '$/'],
			[T.Dollar, 850, l.v, '$'],
			[T.Word, 851, l.v, 'abc'],
			[T.DsGsLEndMark, 854, l.v, '/$']
		]],
		[T.Newline, 856, l.v++, '\n'],
		[T.DsGsLiteral, 857, l.v, '$/$abc $/$$$$$abc/$', [
			[T.DsGsLStartMark, 857, l.v, '$/'],
			[T.GsInterpolation, 859, l.v, '$abc', [
				[T.GsiStartMark, 859, l.v, '$'],
				[T.Identifier, 860, l.v, 'abc']
			]],
			[T.Whitespaces, 863, l.v, ' '],
			[T.SlashEscape, 864, l.v, '$/'],
			[T.DollarEscape, 866, l.v, '$$'],
			[T.DollarEscape, 868, l.v, '$$'],
			[T.Dollar, 870, l.v, '$'],
			[T.Word, 871, l.v, 'abc'],
			[T.DsGsLEndMark, 874, l.v, '/$']
		]],
		[T.Newline, 876, l.v++, '\n'],
		[T.DsGsLiteral, 877, l.v, '$/$/${abc} $abc/$', [
			[T.DsGsLStartMark, 877, l.v, '$/'],
			[T.SlashEscape, 879, l.v, '$/'],
			[T.Dollar, 881, l.v, '$'],
			[T.LBrace, 882, l.v, '{'],
			[T.Word, 883, l.v, 'abc'],
			[T.RBrace, 886, l.v, '}'],
			[T.Whitespaces, 887, l.v, ' '],
			[T.GsInterpolation, 888, l.v, '$abc', [
				[T.GsiStartMark, 888, l.v, '$'],
				[T.Identifier, 889, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 892, l.v, '/$']
		]],
		[T.Newline, 894, l.v++, '\n'],
		[T.DsGsLiteral, 895, l.v, '$/$abc $/${abc}/$', [
			[T.DsGsLStartMark, 895, l.v, '$/'],
			[T.GsInterpolation, 897, l.v, '$abc', [
				[T.GsiStartMark, 897, l.v, '$'],
				[T.Identifier, 898, l.v, 'abc']
			]],
			[T.Whitespaces, 901, l.v, ' '],
			[T.SlashEscape, 902, l.v, '$/'],
			[T.Dollar, 904, l.v, '$'],
			[T.LBrace, 905, l.v, '{'],
			[T.Word, 906, l.v, 'abc'],
			[T.RBrace, 909, l.v, '}'],
			[T.DsGsLEndMark, 910, l.v, '/$']
		]],
		[T.Newline, 912, l.v++, '\n'],
		[T.DsGsLiteral, 913, l.v, '$/$abc $/$$${abc}/$', [
			[T.DsGsLStartMark, 913, l.v, '$/'],
			[T.GsInterpolation, 915, l.v, '$abc', [
				[T.GsiStartMark, 915, l.v, '$'],
				[T.Identifier, 916, l.v, 'abc']
			]],
			[T.Whitespaces, 919, l.v, ' '],
			[T.SlashEscape, 920, l.v, '$/'],
			[T.DollarEscape, 922, l.v, '$$'],
			[T.Dollar, 924, l.v, '$'],
			[T.LBrace, 925, l.v, '{'],
			[T.Word, 926, l.v, 'abc'],
			[T.RBrace, 929, l.v, '}'],
			[T.DsGsLEndMark, 930, l.v, '/$']
		]],
		[T.Newline, 932, l.v++, '\n']
	];
};
