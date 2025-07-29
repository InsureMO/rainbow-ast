import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l50_59 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.DsGsLiteral, 739, 758, l.v, '$/abc $$$abc $abc/$', [
			[T.DsGsLStartMark, 739, 741, l.v, '$/'],
			[T.Word, 741, 744, l.v, 'abc'],
			[T.Whitespaces, 744, 745, l.v, ' '],
			[T.DollarEscape, 745, 747, l.v, '$$'],
			[T.Dollar, 747, 748, l.v, '$'],
			[T.Word, 748, 751, l.v, 'abc'],
			[T.Whitespaces, 751, 752, l.v, ' '],
			[T.GsInterpolation, 752, 756, l.v, '$abc', [
				[T.GsiStartMark, 752, 753, l.v, '$'],
				[T.Identifier, 753, 756, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 756, 758, l.v, '/$']
		]],
		[T.Newline, 758, 759, l.v++, '\n'],
		[T.DsGsLiteral, 759, 778, l.v, '$/abc $abc $$$abc/$', [
			[T.DsGsLStartMark, 759, 761, l.v, '$/'],
			[T.Word, 761, 764, l.v, 'abc'],
			[T.Whitespaces, 764, 765, l.v, ' '],
			[T.GsInterpolation, 765, 769, l.v, '$abc', [
				[T.GsiStartMark, 765, 766, l.v, '$'],
				[T.Identifier, 766, 769, l.v, 'abc']
			]],
			[T.Whitespaces, 769, 770, l.v, ' '],
			[T.DollarEscape, 770, 772, l.v, '$$'],
			[T.GsInterpolation, 772, 776, l.v, '$abc', [
				[T.GsiStartMark, 772, 773, l.v, '$'],
				[T.Identifier, 773, 776, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 776, 778, l.v, '/$']
		]],
		[T.Newline, 778, 779, l.v++, '\n'],
		[T.DsGsLiteral, 779, 800, l.v, '$/abc $$${abc} $abc/$', [
			[T.DsGsLStartMark, 779, 781, l.v, '$/'],
			[T.Word, 781, 784, l.v, 'abc'],
			[T.Whitespaces, 784, 785, l.v, ' '],
			[T.DollarEscape, 785, 787, l.v, '$$'],
			[T.Dollar, 787, 788, l.v, '$'],
			[T.LBrace, 788, 789, l.v, '{'],
			[T.Word, 789, 792, l.v, 'abc'],
			[T.RBrace, 792, 793, l.v, '}'],
			[T.Whitespaces, 793, 794, l.v, ' '],
			[T.GsInterpolation, 794, 798, l.v, '$abc', [
				[T.GsiStartMark, 794, 795, l.v, '$'],
				[T.Identifier, 795, 798, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 798, 800, l.v, '/$']
		]],
		[T.Newline, 800, 801, l.v++, '\n'],
		[T.DsGsLiteral, 801, 824, l.v, '$/abc ${abc} $$${abc}/$', [
			[T.DsGsLStartMark, 801, 803, l.v, '$/'],
			[T.Word, 803, 806, l.v, 'abc'],
			[T.Whitespaces, 806, 807, l.v, ' '],
			[T.GsInterpolation, 807, 813, l.v, '${abc}', [
				[T.GsiBraceStartMark, 807, 809, l.v, '${'],
				[T.Identifier, 809, 812, l.v, 'abc'],
				[T.GsiBraceEndMark, 812, 813, l.v, '}']
			]],
			[T.Whitespaces, 813, 814, l.v, ' '],
			[T.DollarEscape, 814, 816, l.v, '$$'],
			[T.GsInterpolation, 816, 822, l.v, '${abc}', [
				[T.GsiBraceStartMark, 816, 818, l.v, '${'],
				[T.Identifier, 818, 821, l.v, 'abc'],
				[T.GsiBraceEndMark, 821, 822, l.v, '}']
			]],
			[T.DsGsLEndMark, 822, 824, l.v, '/$']
		]],
		[T.Newline, 824, 825, l.v++, '\n'],
		[T.DsGsLiteral, 825, 840, l.v, '$/$/$abc $abc/$', [
			[T.DsGsLStartMark, 825, 827, l.v, '$/'],
			[T.SlashEscape, 827, 829, l.v, '$/'],
			[T.Dollar, 829, 830, l.v, '$'],
			[T.Word, 830, 833, l.v, 'abc'],
			[T.Whitespaces, 833, 834, l.v, ' '],
			[T.GsInterpolation, 834, 838, l.v, '$abc', [
				[T.GsiStartMark, 834, 835, l.v, '$'],
				[T.Identifier, 835, 838, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 838, 840, l.v, '/$']
		]],
		[T.Newline, 840, 841, l.v++, '\n'],
		[T.DsGsLiteral, 841, 856, l.v, '$/$abc $/$abc/$', [
			[T.DsGsLStartMark, 841, 843, l.v, '$/'],
			[T.GsInterpolation, 843, 847, l.v, '$abc', [
				[T.GsiStartMark, 843, 844, l.v, '$'],
				[T.Identifier, 844, 847, l.v, 'abc']
			]],
			[T.Whitespaces, 847, 848, l.v, ' '],
			[T.SlashEscape, 848, 850, l.v, '$/'],
			[T.Dollar, 850, 851, l.v, '$'],
			[T.Word, 851, 854, l.v, 'abc'],
			[T.DsGsLEndMark, 854, 856, l.v, '/$']
		]],
		[T.Newline, 856, 857, l.v++, '\n'],
		[T.DsGsLiteral, 857, 876, l.v, '$/$abc $/$$$$$abc/$', [
			[T.DsGsLStartMark, 857, 859, l.v, '$/'],
			[T.GsInterpolation, 859, 863, l.v, '$abc', [
				[T.GsiStartMark, 859, 860, l.v, '$'],
				[T.Identifier, 860, 863, l.v, 'abc']
			]],
			[T.Whitespaces, 863, 864, l.v, ' '],
			[T.SlashEscape, 864, 866, l.v, '$/'],
			[T.DollarEscape, 866, 868, l.v, '$$'],
			[T.DollarEscape, 868, 870, l.v, '$$'],
			[T.Dollar, 870, 871, l.v, '$'],
			[T.Word, 871, 874, l.v, 'abc'],
			[T.DsGsLEndMark, 874, 876, l.v, '/$']
		]],
		[T.Newline, 876, 877, l.v++, '\n'],
		[T.DsGsLiteral, 877, 894, l.v, '$/$/${abc} $abc/$', [
			[T.DsGsLStartMark, 877, 879, l.v, '$/'],
			[T.SlashEscape, 879, 881, l.v, '$/'],
			[T.Dollar, 881, 882, l.v, '$'],
			[T.LBrace, 882, 883, l.v, '{'],
			[T.Word, 883, 886, l.v, 'abc'],
			[T.RBrace, 886, 887, l.v, '}'],
			[T.Whitespaces, 887, 888, l.v, ' '],
			[T.GsInterpolation, 888, 892, l.v, '$abc', [
				[T.GsiStartMark, 888, 889, l.v, '$'],
				[T.Identifier, 889, 892, l.v, 'abc']
			]],
			[T.DsGsLEndMark, 892, 894, l.v, '/$']
		]],
		[T.Newline, 894, 895, l.v++, '\n'],
		[T.DsGsLiteral, 895, 912, l.v, '$/$abc $/${abc}/$', [
			[T.DsGsLStartMark, 895, 897, l.v, '$/'],
			[T.GsInterpolation, 897, 901, l.v, '$abc', [
				[T.GsiStartMark, 897, 898, l.v, '$'],
				[T.Identifier, 898, 901, l.v, 'abc']
			]],
			[T.Whitespaces, 901, 902, l.v, ' '],
			[T.SlashEscape, 902, 904, l.v, '$/'],
			[T.Dollar, 904, 905, l.v, '$'],
			[T.LBrace, 905, 906, l.v, '{'],
			[T.Word, 906, 909, l.v, 'abc'],
			[T.RBrace, 909, 910, l.v, '}'],
			[T.DsGsLEndMark, 910, 912, l.v, '/$']
		]],
		[T.Newline, 912, 913, l.v++, '\n'],
		[T.DsGsLiteral, 913, 932, l.v, '$/$abc $/$$${abc}/$', [
			[T.DsGsLStartMark, 913, 915, l.v, '$/'],
			[T.GsInterpolation, 915, 919, l.v, '$abc', [
				[T.GsiStartMark, 915, 916, l.v, '$'],
				[T.Identifier, 916, 919, l.v, 'abc']
			]],
			[T.Whitespaces, 919, 920, l.v, ' '],
			[T.SlashEscape, 920, 922, l.v, '$/'],
			[T.DollarEscape, 922, 924, l.v, '$$'],
			[T.Dollar, 924, 925, l.v, '$'],
			[T.LBrace, 925, 926, l.v, '{'],
			[T.Word, 926, 929, l.v, 'abc'],
			[T.RBrace, 929, 930, l.v, '}'],
			[T.DsGsLEndMark, 930, 932, l.v, '/$']
		]],
		[T.Newline, 932, 933, l.v++, '\n']
	];
};
