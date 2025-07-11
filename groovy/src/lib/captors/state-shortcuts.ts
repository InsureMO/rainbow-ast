import {TokenCaptorStates} from '@rainbow-ast/core';
import {Excl, Incl, S} from '../alias';
import {GroovyAstBuildState} from '../ast-build-state';

const ss = (given: ReadonlyArray<GroovyAstBuildState>): ReadonlyArray<GroovyAstBuildState> => given;
export const GroovyAstBuildStateGroup = {
	Free: ss([S.CompilationUnit, S.CompilationUnitOmitScriptCommand, S.CodeBlock, S.IndexBlock]),
	Cmt: ss([S.ScriptCommand, S.SLComment, S.MLComment]),
	Num: ss([
		S.BinNumLiteralStarted, S.BinNumLiteralNumEd, S.BinNumLiteralSepEd,
		S.HexNumLiteralStarted, S.HexNumLiteralNumEd, S.HexNumLiteralSepEd,
		S.NumLiteralIntEd, S.NumLiteralIntSepEd,
		S.NumLiteralDotEd,
		S.NumLiteralFracEd, S.NumLiteralFracSepEd,
		S.NumLiteralExpSignEd, S.NumLiteralExpNumEd, S.NumLiteralExpNumSepEd
	]),
	Str: ss([
		S.SingleQuoteStringLiteral, S.TripleQuotesStringLiteral,
		S.SingleQuoteGStringLiteral, S.TripleQuotesGStringLiteral,
		S.SlashyGStringLiteral,
		S.DollarSlashyGStringLiteral
	]),
	GStrItpInl: ss([S.GStringInterpolationInline, S.GStringInterpolationInlineIdentifierEd, S.GStringInterpolationInlineDotEd])
} as const;
export const SG = GroovyAstBuildStateGroup;

const tcs = (given: TokenCaptorStates<GroovyAstBuildState>): TokenCaptorStates<GroovyAstBuildState> => given;
const incl = (key: keyof typeof SG, ...more: Array<keyof typeof SG>): TokenCaptorStates<GroovyAstBuildState> => {
	return tcs([Incl, SG[key], ...more.map(key => SG[key])]);
};
const excl = (key: keyof typeof SG, ...more: Array<keyof typeof SG>): TokenCaptorStates<GroovyAstBuildState> => {
	return tcs([Excl, SG[key], ...more.map(key => SG[key])]);
};
export const CaptorForStates = {
	CmtStr: incl('Cmt', 'Str'),
	NotNumGStrItpInl: excl('Num', 'GStrItpInl'),
	NotCmtNumStrGStrItpInl: excl('Cmt', 'Num', 'Str', 'GStrItpInl')
} as const;
export const CFS = CaptorForStates;
