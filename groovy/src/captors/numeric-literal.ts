import {PostTokenCapturedActionType} from '@rainbow-ast/core';
import {GroovyAstBuildState} from '../ast-build-state';
import {GroovyTokenId} from '../token';
import {TokenCaptorDefs, TokenCaptorStateInclusion} from './types';
import {buildTokenCaptors, CommentNumberString} from './utils';

export const NumericLiteralDefs: TokenCaptorDefs = {
	// binary number
	BinaryStartMark: {
		patterns: ['0b;fn#Bin:!', '0B;fn#Bin!'],
		forStates: [TokenCaptorStateInclusion.Exclude, CommentNumberString],
		onCaptured: [PostTokenCapturedActionType.CreateBlock, GroovyTokenId.BinaryLiteral, GroovyAstBuildState.BinaryLiteral]
	},
	BinNumber: {
		patterns: 'fn#Bin;fn#Bin:*',
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.BinaryLiteral]
	},
	// hexadecimal number
	// HexStartMark: {
	// 	patterns: ['0x;fn#Hex:!', '0X;fn#Hex:!'],
	// 	forStates: [TokenCaptorStateInclusion.Exclude, CommentNumberString],
	// 	onCaptured: [PostTokenCapturedActionType.CreateBlock, GroovyTokenId.HexadecimalLiteral, GroovyAstBuildState.HexadecimalLiteral]
	// },
	// HexNumber: {
	// 	patterns: 'fn#Hex;fn#Hex:*',
	// 	forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.HexadecimalLiteral]
	// },
	// // octal or decimal number
	// Number: {
	// 	patterns: 'fn#Num;fn#Num:*',
	// 	forStates: [TokenCaptorStateInclusion.Exclude, CommentNumberString],
	// 	onCaptured: [PostTokenCapturedActionType.CreateBlock, GroovyTokenId.DecimalLiteral, GroovyAstBuildState.DecimalLiteral]
	// },
	// NumDot: {
	// 	patterns: '.;fn#Num:!',
	// 	forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.DecimalLiteral]
	// },
	// NumExponent: {
	// 	patterns: ['e;fn#Num:!', 'e;+:!;fn#Num:!', 'e;-:!;fn#Num:!', 'E;fn#Num:!', 'E;+:!;fn#Num:!', 'E;-:!;fn#Num:!'],
	// 	forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.DecimalLiteral]
	// },
	// NumSign: {
	// 	patterns: ['+;fn#Num:!', '-;fn#Num:!'],
	// 	forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.DecimalLiteral]
	// },
	// NumSep: {
	// 	patterns: '_;_:*;fn#Num:!',
	// 	forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.DecimalLiteral]
	// },
	NumIntSuffix: {
		patterns: ['i', 'I', 'l', 'L'],
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.DecimalLiteral]
	},
	// NumDecSuffix: {
	// 	patterns: ['f', 'F', 'd', 'D'],
	// 	forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.DecimalLiteral]
	// },
	NumGSuffix: {
		patterns: ['g', 'G'],
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.DecimalLiteral]
	}
};

export const NumericLiteralTokenMatchers = buildTokenCaptors(NumericLiteralDefs);
