import {CB, EB, Incl, S, SS, T} from '../../alias';
import {CFS} from '../state-shortcuts';
import {GroovyTokenCaptorDefs} from '../types';

export const BinaryNumberLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	BinaryStartMark: {
		patterns: ['0b;fn#Bin:!', '0B;fn#Bin:!'],
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn,
		collect: [CB, T.BinaryLiteral, S.BinNumSt]
	},
	Number: {
		patterns: 'fn#Bin;fn#Bin:*',
		forStates: [Incl, S.BinNumSt, S.BinNumSepEd],
		collect: [SS, S.BinNumNumEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Bin:!',
		forStates: [Incl, S.BinNumNumEd],
		collect: [SS, S.BinNumSepEd]
	}
};

export const HexadecimalNumberLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	HexStartMark: {
		patterns: ['0x;fn#Hex:!', '0X;fn#Hex:!'],
		forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn,
		collect: [CB, T.HexadecimalLiteral, S.HexNumSt]
	},
	Number: {
		patterns: 'fn#Hex;fn#Hex:*',
		forStates: [Incl, S.HexNumSt, S.HexNumSepEd],
		collect: [SS, S.HexNumNumEd]
	},
	NumSep: {
		patterns: '_;_:*;fn#Hex:!',
		forStates: [Incl, S.HexNumNumEd],
		collect: [SS, S.HexNumSepEd]
	}
};

export const DecimalLiteralCaptorDefs: GroovyTokenCaptorDefs = {
	Number: {
		patterns: 'fn#Num;fn#Num:*',
		forks: [
			{   // integral part
				forStates: CFS.NotCmtNumStrGStrItpInlPkgImpAnn,
				collect: [CB, T.DecimalLiteral, S.NumIntEd]
			},
			// following are excluded by first fork
			{   // integral part after number separators
				forStates: [Incl, S.NumIntSepEd],
				collect: [SS, S.NumIntEd]
			},
			{ // fraction part
				forStates: [Incl, S.NumDotEd, S.NumFracSepEd],
				collect: [SS, S.NumFracEd]
			},
			{ // exponent part
				forStates: [Incl, S.NumExpSignEd, S.NumExpNumSepEd],
				collect: [SS, S.NumExpNumEd]
			}
		]
	},
	Dot: { // in number literal, next char must be number
		patterns: '.;fn#Num:!',
		forStates: [Incl, S.NumIntEd],
		collect: [SS, S.NumDotEd]
	},
	NumExponent: {
		patterns: ['e;fn#Num:!', 'e;+:!;fn#Num:!', 'e;-:!;fn#Num:!', 'E;fn#Num:!', 'E;+:!;fn#Num:!', 'E;-:!;fn#Num:!'],
		forStates: [Incl, S.NumIntEd, S.NumFracEd],
		collect: [SS, S.NumExpSignEd]
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
				collect: [SS, S.NumIntSepEd]
			},
			{
				forStates: [Incl, S.NumFracEd],
				collect: [SS, S.NumFracSepEd]
			},
			{
				forStates: [Incl, S.NumExpNumEd],
				collect: [SS, S.NumExpNumSepEd]
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
			collect: EB
		},
		{ // available for number only
			patterns: ['f', 'F', 'd', 'D'],
			forStates: [
				Incl,
				S.NumIntEd, S.NumFracEd, S.NumExpNumEd
			],
			collect: EB
		},
		{ // available for all
			patterns: ['g', 'G'],
			forStates: [
				Incl,
				S.BinNumNumEd, S.HexNumNumEd,
				S.NumIntEd, S.NumFracEd, S.NumExpNumEd
			],
			collect: EB
		}
	]
};

export const NumberCaptorDefs: Array<GroovyTokenCaptorDefs> = [
	BinaryNumberLiteralCaptorDefs,
	HexadecimalNumberLiteralCaptorDefs,
	DecimalLiteralCaptorDefs,
	NumberLiteralSuffixCaptorDefs
];
