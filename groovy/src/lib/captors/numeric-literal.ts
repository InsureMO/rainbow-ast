import {PostTokenCapturedActionType} from '@rainbow-ast/core';
import {GroovyAstBuildState} from '../ast-build-state';
import {GroovyTokenId} from '../token';
import {TokenCaptorDefs, TokenCaptorStateInclusion} from './types';
import {buildTokenCaptors, CommentNumberString} from './utils';

export const NumericLiteralDefs: TokenCaptorDefs = {
	// binary number
	BinaryStartMark: {
		patterns: ['0b;fn#Bin:!', '0B;fn#Bin:!'],
		forStates: [TokenCaptorStateInclusion.Exclude, CommentNumberString],
		onCaptured: [PostTokenCapturedActionType.CreateBlock, GroovyTokenId.BinaryLiteral, GroovyAstBuildState.BinaryLiteralExpectNumber]
	},
	BinNumber: {
		patterns: 'fn#Bin;fn#Bin:*',
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.BinaryLiteralExpectNumber],
		onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.BinaryLiteralExpectNumSepOrSuffix]
	},
	// hexadecimal number
	HexStartMark: {
		patterns: ['0x;fn#Hex:!', '0X;fn#Hex:!'],
		forStates: [TokenCaptorStateInclusion.Exclude, CommentNumberString],
		onCaptured: [PostTokenCapturedActionType.CreateBlock, GroovyTokenId.HexadecimalLiteral, GroovyAstBuildState.HexadecimalLiteralExpectNumber]
	},
	HexNumber: {
		patterns: 'fn#Hex;fn#Hex:*',
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.HexadecimalLiteralExpectNumber],
		onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.HexadecimalLiteralExpectNumSepOrSuffix]
	},
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
	NumSep: [
		{
			patterns: '_;_:*;fn#Bin:!',
			forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.BinaryLiteralExpectNumSepOrSuffix],
			onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.BinaryLiteralExpectNumber]
		},
		{
			patterns: '_;_:*;fn#Hex:!',
			forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.HexadecimalLiteralExpectNumSepOrSuffix],
			onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.HexadecimalLiteralExpectNumber]
		}
		// {
		// 	patterns: '_;_:*;fn#Num:!',
		// 	forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.DecimalLiteral]
		// }
	],
	NumIntSuffix: {
		patterns: ['i', 'I', 'l', 'L'],
		forStates: [
			TokenCaptorStateInclusion.Include,
			GroovyAstBuildState.BinaryLiteralExpectNumSepOrSuffix, GroovyAstBuildState.HexadecimalLiteralExpectNumSepOrSuffix
		]
	},
	// NumDecSuffix: {
	// 	patterns: ['f', 'F', 'd', 'D'],
	// 	forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.DecimalLiteral]
	// },
	NumGSuffix: {
		patterns: ['g', 'G'],
		forStates: [
			TokenCaptorStateInclusion.Include,
			GroovyAstBuildState.BinaryLiteralExpectNumSepOrSuffix, GroovyAstBuildState.HexadecimalLiteralExpectNumSepOrSuffix
		]
	}
};

export const NumericLiteralTokenCaptors = buildTokenCaptors(NumericLiteralDefs);
