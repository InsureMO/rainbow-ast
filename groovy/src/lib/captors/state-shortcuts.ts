import {TokenCaptorStateInclusion, TokenCaptorStates} from '@rainbow-ast/core';
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
	Pkg: ss(S.PkgDeclSt, S.PkgDeclIdEd, S.PkgDeclDotEd),
	Imp: ss(S.ImpDeclSt, S.ImpDeclStaticEd, S.ImpDeclIdEd, S.ImpDeclDotEd, S.ImpDeclStarEd, S.ImpDeclAsEd, S.ImpDeclAsIdEd)
} as const;
export const SG = GroovyAstBuildStateGroup;

const convertState = (value: Incl | Excl | GroovyAstBuildState | keyof typeof SG): GroovyAstBuildState | ReadonlyArray<GroovyAstBuildState> => {
	if (Array.isArray(value)) {
		const [, ...states] = value;
		return states.flat();
	} else if (typeof value === 'string') {
		return SG[value];
	} else {
		return value;
	}
};
type Incl = [TokenCaptorStateInclusion.Include, GroovyAstBuildState | ReadonlyArray<GroovyAstBuildState>, ...Array<GroovyAstBuildState | ReadonlyArray<GroovyAstBuildState>>]
type Excl = [TokenCaptorStateInclusion.Exclude, GroovyAstBuildState | ReadonlyArray<GroovyAstBuildState>, ...Array<GroovyAstBuildState | ReadonlyArray<GroovyAstBuildState>>]
const tcs = (given: TokenCaptorStates<GroovyAstBuildState>): TokenCaptorStates<GroovyAstBuildState> => given;
export const Of = (first: Incl | GroovyAstBuildState | keyof typeof SG, ...more: Array<Incl | GroovyAstBuildState | keyof typeof SG>): Incl => {
	return tcs([Incl, convertState(first), ...more.map(key => convertState(key))]) as Incl;
};
export const Not = (first: Excl | GroovyAstBuildState | keyof typeof SG, ...more: Array<Excl | GroovyAstBuildState | keyof typeof SG>): Excl => {
	return tcs([Excl, convertState(first), ...more.map(key => convertState(key))]) as Excl;
};
export const CaptorForStates = {
	NotNumGStrItpInl: Not('Num', 'GStrItpInl'),
	NotNumGStrItpInlPkgImp: Not('Num', 'GStrItpInl', 'Pkg', 'Imp'),
	NotCmtNumStrGStrItpInl: Not('Cmt', 'Num', 'Str', 'GStrItpInl'),
	NotCmtNumStrGStrItpInlPkgImp: Not('Cmt', 'Num', 'Str', 'GStrItpInl', 'Pkg', 'Imp')
} as const;
export const CFS = CaptorForStates;
