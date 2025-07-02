import {BuildUtils, TokenCaptorOfStates, TokenMatcherBuilder} from '@rainbow-ast/core';
import {S} from '../alias';
import {GroovyAstBuildState, GroovyAstBuildStateName} from '../ast-build-state';
import {GroovyTokenId, GroovyTokenName} from '../token';
import {GroovyTokenCaptorDefs} from './types';

export const AllCUStates = [
	S.CompilationUnit,
	S.CompilationUnitOmitScriptCommand
];
export const CommentStates = [
	S.ScriptCommand,
	S.SLComment,
	S.MLComment
];
export const NumberLiteralStates = [
	S.BinNumLiteralStarted,
	S.BinNumLiteralNumEd,
	S.BinNumLiteralSepEd,
	S.HexNumLiteralStarted,
	S.HexNumLiteralNumEd,
	S.HexNumLiteralSepEd,
	S.NumLiteralIntEd,
	S.NumLiteralIntSepEd,
	S.NumLiteralDotEd,
	S.NumLiteralFracEd,
	S.NumLiteralFracSepEd,
	S.NumLiteralExpSignEd,
	S.NumLiteralExpNumEd,
	S.NumLiteralExpNumSepEd
];
export const StringLiteralStates = [
	S.SingleQuoteStringLiteral,
	S.TripleQuotesStringLiteral,
	S.SingleQuoteGStringLiteral,
	S.TripleQuotesGStringLiteral,
	S.SlashyGStringLiteral,
	S.DollarSlashyGStringLiteral
];
export const CommentString = [...CommentStates, ...StringLiteralStates];
export const CommentNumberString = [...CommentStates, ...NumberLiteralStates, ...StringLiteralStates];

export const GroovyTokenMatcherBuilder = TokenMatcherBuilder.create({LongestKeywordLength: 'synchronized'.length});

export const buildTokenCaptors = (defs: Array<GroovyTokenCaptorDefs>): TokenCaptorOfStates<GroovyAstBuildStateName> => {
	return BuildUtils.buildTokenCaptors({
		defs,
		tokenIdMap: GroovyTokenId as unknown as Record<GroovyTokenName, GroovyTokenId>,
		stateNameMap: GroovyAstBuildState,
		tokenMatcherBuilder: GroovyTokenMatcherBuilder
	});
};
