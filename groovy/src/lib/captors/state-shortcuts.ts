import {TokenCaptorStates} from '@rainbow-ast/core';
import {Excl, Incl, S} from '../alias';
import {GroovyAstBuildState} from '../ast-build-state';

const ss = (state: GroovyAstBuildState, ...more: Array<GroovyAstBuildState>): ReadonlyArray<GroovyAstBuildState> => [state, ...more];
export const GroovyAstBuildStateGroup = {
	Cmt: ss(S.ScriptCmd, S.SLCmt, S.MLCmt),
	Num: ss(
		S.BinNumSt, S.BinNumNumEd, S.BinNumSepEd,
		S.HexNumSt, S.HexNumNumEd, S.HexNumSepEd,
		S.NumIntEd, S.NumIntSepEd,
		S.NumDotEd,
		S.NumFracEd, S.NumFracSepEd,
		S.NumExpSignEd, S.NumExpNumEd, S.NumExpNumSepEd
	),
	Str: ss(
		S.SQStr, S.TQStr,
		S.SQGStr, S.TQGStr,
		S.SGStr,
		S.DSGStr
	),
	GStrItpInl: ss(S.GStrItpInl, S.GStrItpInlIdEd, S.GStrItpInlDotEd),
	Pkg: ss(S.PkgDeclSt, S.PkgDeclIdEd, S.PkgDeclDotEd)
} as const;
export const SG = GroovyAstBuildStateGroup;

const convertState = (value: GroovyAstBuildState | keyof typeof SG): GroovyAstBuildState | ReadonlyArray<GroovyAstBuildState> => {
	if (typeof value === 'string') {
		return SG[value];
	} else {
		return value;
	}
};
const tcs = (given: TokenCaptorStates<GroovyAstBuildState>): TokenCaptorStates<GroovyAstBuildState> => given;
export const Of = (first: GroovyAstBuildState | keyof typeof SG, ...more: Array<GroovyAstBuildState | keyof typeof SG>): TokenCaptorStates<GroovyAstBuildState> => {
	return tcs([Incl, convertState(first), ...more.map(key => convertState(key))]);
};
export const Not = (first: GroovyAstBuildState | keyof typeof SG, ...more: Array<GroovyAstBuildState | keyof typeof SG>): TokenCaptorStates<GroovyAstBuildState> => {
	return tcs([Excl, convertState(first), ...more.map(key => convertState(key))]);
};
export const CaptorForStates = {
	NotNumGStrItpInl: Not('Num', 'GStrItpInl'),
	NotCmtNumStrGStrItpInl: Not('Cmt', 'Num', 'Str', 'GStrItpInl')
} as const;
export const CFS = CaptorForStates;
