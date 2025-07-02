import {CB, EB, Excl, Incl, S, SS, T} from './alias';
import {GroovyTokenCaptorDefs} from './types';
import {buildTokenCaptors, CommentNumberString} from './utils';

export const BinaryNumberLiteralDefs: GroovyTokenCaptorDefs = {
	BinaryStartMark: {
		patterns: ['0b;fn#Bin:!', '0B;fn#Bin:!'],
		forStates: [Excl, CommentNumberString],
		onCaptured: [CB, T.BinaryLiteral, S.BinNumLiteralStarted]
	},
	Number: {
		patterns: 'fn#Bin;fn#Bin:*',
		forStates: [Incl, S.BinNumLiteralStarted, S.BinNumLiteralSepEd],
		onCaptured: [SS, S.BinNumLiteralNumEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Bin:!',
		forStates: [Incl, S.BinNumLiteralNumEd],
		onCaptured: [SS, S.BinNumLiteralSepEd]
	}
};

export const HexadecimalNumberLiteralDefs: GroovyTokenCaptorDefs = {
	HexStartMark: {
		patterns: ['0x;fn#Hex:!', '0X;fn#Hex:!'],
		forStates: [Excl, CommentNumberString],
		onCaptured: [CB, T.HexadecimalLiteral, S.HexNumLiteralStarted]
	},
	Number: {
		patterns: 'fn#Hex;fn#Hex:*',
		forStates: [Incl, S.HexNumLiteralStarted, S.HexNumLiteralSepEd],
		onCaptured: [SS, S.HexNumLiteralNumEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Hex:!',
		forStates: [Incl, S.HexNumLiteralNumEd],
		onCaptured: [SS, S.HexNumLiteralSepEd]
	}
};

export const NumericLiteralDefs: GroovyTokenCaptorDefs = {
	Number: {
		patterns: 'fn#Num;fn#Num:*',
		forks: [
			{   // integral part
				forStates: [Excl, CommentNumberString],
				onCaptured: [CB, T.DecimalLiteral, S.NumLiteralIntEd]
			},
			{   // integral part after number separators
				forStates: [Incl, S.NumLiteralIntSepEd],
				onCaptured: [SS, S.NumLiteralIntEd]
			},
			{ // fraction part
				forStates: [Incl, S.NumLiteralDotEd, S.NumLiteralFracSepEd],
				onCaptured: [SS, S.NumLiteralFracEd]
			},
			{ // exponent part
				forStates: [Incl, S.NumLiteralExpSignEd, S.NumLiteralExpNumSepEd],
				onCaptured: [SS, S.NumLiteralExpNumEd]
			}
		]
	},
	NumDot: {
		patterns: '.;fn#Num:!',
		forStates: [Incl, S.NumLiteralIntEd],
		onCaptured: [SS, S.NumLiteralDotEd]
	},
	NumExponent: {
		patterns: ['e;fn#Num:!', 'e;+:!;fn#Num:!', 'e;-:!;fn#Num:!', 'E;fn#Num:!', 'E;+:!;fn#Num:!', 'E;-:!;fn#Num:!'],
		forStates: [Incl, S.NumLiteralIntEd, S.NumLiteralFracEd],
		onCaptured: [SS, S.NumLiteralExpSignEd]
	},
	NumExponentSign: {
		patterns: ['+;fn#Num:!', '-;fn#Num:!'],
		forStates: [Incl, S.NumLiteralExpSignEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Num:!',
		forks: [
			{
				forStates: [Incl, S.NumLiteralIntEd],
				onCaptured: [SS, S.NumLiteralIntSepEd]
			},
			{
				forStates: [Incl, S.NumLiteralFracEd],
				onCaptured: [SS, S.NumLiteralFracSepEd]
			},
			{
				forStates: [Incl, S.NumLiteralExpNumEd],
				onCaptured: [SS, S.NumLiteralExpNumSepEd]
			}
		]
	}
};
export const NumberLiteralSuffixDefs: GroovyTokenCaptorDefs = {
	NumSuffix: [
		{ // available for binary, hexadecimal and number only with integral part
			patterns: ['i', 'I', 'l', 'L'],
			forStates: [
				Incl,
				S.BinNumLiteralNumEd, S.HexNumLiteralNumEd,
				S.NumLiteralIntEd
			],
			onCaptured: EB
		},
		{ // available for number only
			patterns: ['f', 'F', 'd', 'D'],
			forStates: [
				Incl,
				S.NumLiteralIntEd, S.NumLiteralFracEd, S.NumLiteralExpNumEd
			],
			onCaptured: EB
		},
		{ // available for all
			patterns: ['g', 'G'],
			forStates: [
				Incl,
				S.BinNumLiteralNumEd, S.HexNumLiteralNumEd,
				S.NumLiteralIntEd, S.NumLiteralFracEd, S.NumLiteralExpNumEd
			],
			onCaptured: EB
		}
	]
};

export const NumericLiteralTokenCaptors = buildTokenCaptors(
	BinaryNumberLiteralDefs, HexadecimalNumberLiteralDefs, NumericLiteralDefs, NumberLiteralSuffixDefs
);
