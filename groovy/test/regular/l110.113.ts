import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l110_113 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 2133, l.v, '// annotation declaration #1', [
			[T.SLCommentStartMark, 2133, l.v, '//'],
			[T.Whitespaces, 2135, l.v, ' '],
			[T.Word, 2136, l.v, 'annotation'],
			[T.Whitespaces, 2146, l.v, ' '],
			[T.Word, 2147, l.v, 'declaration'],
			[T.Whitespaces, 2158, l.v, ' '],
			[T.Hash, 2159, l.v, '#'],
			[T.Word, 2160, l.v, '1']
		]],
		[T.Newline, 2161, l.v++, '\n'],
		[T.TypeDecl, 2162, l.v, 'public @A() private @B() class @C() X @D() extends @E ArrayList @F implements @G List @H {}', [
			[T.ModifierSeg, 2162, l.v, 'public @A() private @B() ', [
				[T.PUBLIC, 2162, l.v, 'public'],
				[T.Whitespaces, 2168, l.v, ' '],
				[T.AnnoDecl, 2169, l.v, '@A()', [
					[T.At, 2169, l.v, '@'],
					[T.Identifier, 2170, l.v, 'A'],
					[T.AnnoParamsBlk, 2171, l.v, '()', [
						[T.LParen, 2171, l.v, '('],
						[T.RParen, 2172, l.v, ')']
					]]
				]],
				[T.Whitespaces, 2173, l.v, ' '],
				[T.PRIVATE, 2174, l.v, 'private'],
				[T.Whitespaces, 2181, l.v, ' '],
				[T.AnnoDecl, 2182, l.v, '@B()', [
					[T.At, 2182, l.v, '@'],
					[T.Identifier, 2183, l.v, 'B'],
					[T.AnnoParamsBlk, 2184, l.v, '()', [
						[T.LParen, 2184, l.v, '('],
						[T.RParen, 2185, l.v, ')']
					]]
				]],
				[T.Whitespaces, 2186, l.v, ' ']
			]],
			[T.CLASS, 2187, l.v, 'class'],
			[T.Whitespaces, 2192, l.v, ' '],
			[T.AnnoDecl, 2193, l.v, '@C()', [
				[T.At, 2193, l.v, '@'],
				[T.Identifier, 2194, l.v, 'C'],
				[T.AnnoParamsBlk, 2195, l.v, '()', [
					[T.LParen, 2195, l.v, '('],
					[T.RParen, 2196, l.v, ')']
				]]
			]],
			[T.Whitespaces, 2197, l.v, ' '],
			[T.Identifier, 2198, l.v, 'X'],
			[T.Whitespaces, 2199, l.v, ' '],
			[T.AnnoDecl, 2200, l.v, '@D()', [
				[T.At, 2200, l.v, '@'],
				[T.Identifier, 2201, l.v, 'D'],
				[T.AnnoParamsBlk, 2202, l.v, '()', [
					[T.LParen, 2202, l.v, '('],
					[T.RParen, 2203, l.v, ')']
				]]
			]],
			[T.Whitespaces, 2204, l.v, ' '],
			[T.TypeInheritSeg, 2205, l.v, 'extends @E ArrayList ', [
				[T.EXTENDS, 2205, l.v, 'extends'],
				[T.Whitespaces, 2212, l.v, ' '],
				[T.AnnoDecl, 2213, l.v, '@E ', [
					[T.At, 2213, l.v, '@'],
					[T.Identifier, 2214, l.v, 'E'],
					[T.Whitespaces, 2215, l.v, ' ']
				]],
				[T.Identifier, 2216, l.v, 'ArrayList'],
				[T.Whitespaces, 2225, l.v, ' ']
			]],
			[T.AnnoDecl, 2226, l.v, '@F ', [
				[T.At, 2226, l.v, '@'],
				[T.Identifier, 2227, l.v, 'F'],
				[T.Whitespaces, 2228, l.v, ' ']
			]],
			[T.TypeInheritSeg, 2229, l.v, 'implements @G List ', [
				[T.IMPLEMENTS, 2229, l.v, 'implements'],
				[T.Whitespaces, 2239, l.v, ' '],
				[T.AnnoDecl, 2240, l.v, '@G()', [
					[T.At, 2240, l.v, '@'],
					[T.Identifier, 2241, l.v, 'G'],
					[T.Whitespaces, 2242, l.v, ' ']
				]],
				[T.Identifier, 2243, l.v, 'List'],
				[T.Whitespaces, 2247, l.v, ' ']
			]],
			[T.AnnoDecl, 2248, l.v, '@H ', [
				[T.At, 2248, l.v, '@'],
				[T.Identifier, 2249, l.v, 'H'],
				[T.Whitespaces, 2250, l.v, ' ']
			]],
			[T.TypeBody, 2251, l.v, '{}', [
				[T.LBrace, 2251, l.v, '{'],
				[T.RBrace, 2252, l.v, '}']
			]]
		]],
		[T.Newline, 2253, l.v++, '\n'],
		[T.SyncBlockDecl, 2254, l.v, 'synchronized @A() () @B() {}', [
			[T.ModifierSeg, 2254, l.v, 'synchronized @A ', [
				[T.SYNCHRONIZED, 2254, l.v, 'synchronized'],
				[T.Whitespaces, 2266, l.v, ' '],
				[T.AnnoDecl, 2267, l.v, '@A ', [
					[T.At, 2267, l.v, '@'],
					[T.Identifier, 2268, l.v, 'A'],
					[T.AnnoParamsBlk, 2269, l.v, '()', [
						[T.LParen, 2269, l.v, '('],
						[T.RParen, 2270, l.v, ')']
					]]
				]],
				[T.Whitespaces, 2271, l.v, ' ']
			]],
			[T.SyncExprBlk, 2272, l.v, '()', [
				[T.LParen, 2272, l.v, '('],
				[T.RParen, 2273, l.v, ')']
			]],
			[T.Whitespaces, 2274, l.v, ' '],
			[T.AnnoDecl, 2275, l.v, '@B ', [
				[T.At, 2275, l.v, '@'],
				[T.Identifier, 2276, l.v, 'B'],
				[T.AnnoParamsBlk, 2277, l.v, '()', [
					[T.LParen, 2277, l.v, '('],
					[T.RParen, 2278, l.v, ')']
				]]
			]],
			[T.Whitespaces, 2279, l.v, ' '],
			[T.SyncBody, 2280, l.v, '{}', [
				[T.LBrace, 2280, l.v, '{'],
				[T.RBrace, 2281, l.v, '}']
			]]
		]],
		[T.Newline, 2282, l.v++, '\n'],
		[T.StaticBlockDecl, 2283, l.v, 'static @A {}', [
			[T.ModifierSeg, 2283, l.v, 'static @A ', [
				[T.STATIC, 2283, l.v, 'static'],
				[T.Whitespaces, 2289, l.v, ' '],
				[T.AnnoDecl, 2290, l.v, '@A ', [
					[T.At, 2290, l.v, '@'],
					[T.Identifier, 2291, l.v, 'A'],
					[T.Whitespaces, 2292, l.v, ' ']
				]]
			]],
			[T.StaticBody, 2293, l.v, '{}', [
				[T.LBrace, 2293, l.v, '{'],
				[T.RBrace, 2294, l.v, '}']
			]]
		]],
		[T.Newline, 2295, l.v++, '\n']
	];
};
