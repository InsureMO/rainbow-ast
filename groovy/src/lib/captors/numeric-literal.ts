import {PostTokenCapturedActionType, TokenCaptorStateInclusion} from '@rainbow-ast/core';
import {GroovyAstBuildState} from '../ast-build-state';
import {GroovyTokenId} from '../token';
import {GroovyTokenCaptorDefs} from './types';
import {buildTokenCaptors, CommentNumberString} from './utils';

export const BinaryNumberLiteralDefs: GroovyTokenCaptorDefs = {
	BinaryStartMark: {
		patterns: ['0b;fn#Bin:!', '0B;fn#Bin:!'],
		forStates: [TokenCaptorStateInclusion.Exclude, CommentNumberString],
		onCaptured: [PostTokenCapturedActionType.CreateBlock, GroovyTokenId.BinaryLiteral, GroovyAstBuildState.BinNumLiteralStarted]
	},
	Number: {
		patterns: 'fn#Bin;fn#Bin:*',
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.BinNumLiteralStarted, GroovyAstBuildState.BinNumLiteralSepEd],
		onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.BinNumLiteralNumEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Bin:!',
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.BinNumLiteralNumEd],
		onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.BinNumLiteralSepEd]
	}
};

export const HexadecimalNumberLiteralDefs: GroovyTokenCaptorDefs = {
	HexStartMark: {
		patterns: ['0x;fn#Hex:!', '0X;fn#Hex:!'],
		forStates: [TokenCaptorStateInclusion.Exclude, CommentNumberString],
		onCaptured: [PostTokenCapturedActionType.CreateBlock, GroovyTokenId.HexadecimalLiteral, GroovyAstBuildState.HexNumLiteralStarted]
	},
	Number: {
		patterns: 'fn#Hex;fn#Hex:*',
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.HexNumLiteralStarted, GroovyAstBuildState.HexNumLiteralSepEd],
		onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.HexNumLiteralNumEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Hex:!',
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.HexNumLiteralNumEd],
		onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.HexNumLiteralSepEd]
	}
};

export const NumericLiteralDefs: GroovyTokenCaptorDefs = {
	Number: {
		patterns: 'fn#Num;fn#Num:*',
		forks: [
			{   // integral part
				forStates: [TokenCaptorStateInclusion.Exclude, CommentNumberString],
				onCaptured: [PostTokenCapturedActionType.CreateBlock, GroovyTokenId.DecimalLiteral, GroovyAstBuildState.NumLiteralIntEd]
			},
			{   // integral part after number separators
				forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.NumLiteralIntSepEd],
				onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.NumLiteralIntEd]
			},
			{ // fraction part
				forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.NumLiteralDotEd, GroovyAstBuildState.NumLiteralFracSepEd],
				onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.NumLiteralFracEd]
			},
			{ // exponent part
				forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.NumLiteralExpSignEd, GroovyAstBuildState.NumLiteralExpNumSepEd],
				onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.NumLiteralExpNumEd]
			}
		]
	},
	NumDot: {
		patterns: '.;fn#Num:!',
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.NumLiteralIntEd],
		onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.NumLiteralDotEd]
	},
	NumExponent: {
		patterns: ['e;fn#Num:!', 'e;+:!;fn#Num:!', 'e;-:!;fn#Num:!', 'E;fn#Num:!', 'E;+:!;fn#Num:!', 'E;-:!;fn#Num:!'],
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.NumLiteralIntEd, GroovyAstBuildState.NumLiteralFracEd],
		onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.NumLiteralExpSignEd]
	},
	NumExponentSign: {
		patterns: ['+;fn#Num:!', '-;fn#Num:!'],
		forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.NumLiteralExpSignEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Num:!',
		forks: [
			{
				forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.NumLiteralIntEd],
				onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.NumLiteralIntSepEd]
			},
			{
				forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.NumLiteralFracEd],
				onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.NumLiteralFracSepEd]
			},
			{
				forStates: [TokenCaptorStateInclusion.Include, GroovyAstBuildState.NumLiteralExpNumEd],
				onCaptured: [PostTokenCapturedActionType.SwitchState, GroovyAstBuildState.NumLiteralExpNumSepEd]
			}
		]
	}
};
export const NumberLiteralSuffixDefs: GroovyTokenCaptorDefs = {
	NumIntSuffix: {
		patterns: ['i', 'I', 'l', 'L'],
		forStates: [
			TokenCaptorStateInclusion.Include,
			GroovyAstBuildState.BinNumLiteralNumEd, GroovyAstBuildState.HexNumLiteralNumEd,
			GroovyAstBuildState.NumLiteralIntEd
		],
		onCaptured: [PostTokenCapturedActionType.EndBlock]
	},
	NumDecSuffix: {
		patterns: ['f', 'F', 'd', 'D'],
		forStates: [
			TokenCaptorStateInclusion.Include,
			GroovyAstBuildState.NumLiteralIntEd, GroovyAstBuildState.NumLiteralFracEd, GroovyAstBuildState.NumLiteralExpNumEd
		],
		onCaptured: [PostTokenCapturedActionType.EndBlock]
	},
	NumGSuffix: {
		patterns: ['g', 'G'],
		forStates: [
			TokenCaptorStateInclusion.Include,
			GroovyAstBuildState.BinNumLiteralNumEd, GroovyAstBuildState.HexNumLiteralNumEd,
			GroovyAstBuildState.NumLiteralIntEd, GroovyAstBuildState.NumLiteralFracEd, GroovyAstBuildState.NumLiteralExpNumEd
		],
		onCaptured: [PostTokenCapturedActionType.EndBlock]
	}
};

export const NumericLiteralTokenCaptors = buildTokenCaptors(
	BinaryNumberLiteralDefs, HexadecimalNumberLiteralDefs, NumericLiteralDefs, NumberLiteralSuffixDefs
);
