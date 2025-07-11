import {CB, EB, Incl, S, SS, T} from '../alias';
import {CFS} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

export const BinaryNumberLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	BinaryStartMark: {
		patterns: ['0b;fn#Bin:!', '0B;fn#Bin:!'],
		forStates: CFS.NotCmtNumStrGStrItpInl,
		onCaptured: [CB, T.BinaryLiteral, S.BinNumSt]
	},
	Number: {
		patterns: 'fn#Bin;fn#Bin:*',
		forStates: [Incl, S.BinNumSt, S.BinNumSepEd],
		onCaptured: [SS, S.BinNumNumEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Bin:!',
		forStates: [Incl, S.BinNumNumEd],
		onCaptured: [SS, S.BinNumSepEd]
	}
};

export const HexadecimalNumberLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	HexStartMark: {
		patterns: ['0x;fn#Hex:!', '0X;fn#Hex:!'],
		forStates: CFS.NotCmtNumStrGStrItpInl,
		onCaptured: [CB, T.HexadecimalLiteral, S.HexNumSt]
	},
	Number: {
		patterns: 'fn#Hex;fn#Hex:*',
		forStates: [Incl, S.HexNumSt, S.HexNumSepEd],
		onCaptured: [SS, S.HexNumNumEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Hex:!',
		forStates: [Incl, S.HexNumNumEd],
		onCaptured: [SS, S.HexNumSepEd]
	}
};

export const DecimalLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	Number: {
		patterns: 'fn#Num;fn#Num:*',
		forks: [
			{   // integral part
				forStates: CFS.NotCmtNumStrGStrItpInl,
				onCaptured: [CB, T.DecimalLiteral, S.NumIntEd]
			},
			// following are excluded by first fork
			{   // integral part after number separators
				forStates: [Incl, S.NumIntSepEd],
				onCaptured: [SS, S.NumIntEd]
			},
			{ // fraction part
				forStates: [Incl, S.NumDotEd, S.NumFracSepEd],
				onCaptured: [SS, S.NumFracEd]
			},
			{ // exponent part
				forStates: [Incl, S.NumExpSignEd, S.NumExpNumSepEd],
				onCaptured: [SS, S.NumExpNumEd]
			}
		]
	},
	Dot: {
		patterns: '.;fn#Num:!',
		forStates: [Incl, S.NumIntEd],
		onCaptured: [SS, S.NumDotEd]
	},
	NumExponent: {
		patterns: ['e;fn#Num:!', 'e;+:!;fn#Num:!', 'e;-:!;fn#Num:!', 'E;fn#Num:!', 'E;+:!;fn#Num:!', 'E;-:!;fn#Num:!'],
		forStates: [Incl, S.NumIntEd, S.NumFracEd],
		onCaptured: [SS, S.NumExpSignEd]
	},
	NumExponentSign: {
		patterns: ['+;fn#Num:!', '-;fn#Num:!'],
		forStates: [Incl, S.NumExpSignEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Num:!',
		forks: [
			{
				forStates: [Incl, S.NumIntEd],
				onCaptured: [SS, S.NumIntSepEd]
			},
			{
				forStates: [Incl, S.NumFracEd],
				onCaptured: [SS, S.NumFracSepEd]
			},
			{
				forStates: [Incl, S.NumExpNumEd],
				onCaptured: [SS, S.NumExpNumSepEd]
			}
		]
	}
};
export const NumberLiteralSuffixCaptorDefs: GroovyTokenCaptorDefs = {
	NumSuffix: [
		{ // available for binary, hexadecimal and number only with integral part
			patterns: ['i', 'I', 'l', 'L'],
			forStates: [
				Incl,
				S.BinNumNumEd, S.HexNumNumEd,
				S.NumIntEd
			],
			onCaptured: EB
		},
		{ // available for number only
			patterns: ['f', 'F', 'd', 'D'],
			forStates: [
				Incl,
				S.NumIntEd, S.NumFracEd, S.NumExpNumEd
			],
			onCaptured: EB
		},
		{ // available for all
			patterns: ['g', 'G'],
			forStates: [
				Incl,
				S.BinNumNumEd, S.HexNumNumEd,
				S.NumIntEd, S.NumFracEd, S.NumExpNumEd
			],
			onCaptured: EB
		}
	]
};

export const NumberCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	BinaryNumberLiteralCaptorDefs,
	HexadecimalNumberLiteralCaptorDefs,
	DecimalLiteralCaptorDefs,
	NumberLiteralSuffixCaptorDefs
];
