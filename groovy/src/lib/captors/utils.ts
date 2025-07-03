import {BuildUtils, TokenCaptorOfStates, TokenCaptorStates, TokenMatcherBuilder} from '@rainbow-ast/core';
import {Excl, Incl, S} from '../alias';
import {GroovyAstBuildState, GroovyAstBuildStateName} from '../ast-build-state';
import {GroovyTokenId, GroovyTokenName} from '../token';
import {GroovyTokenCaptorDefs} from './types';

export const Comment = [
	S.ScriptCommand,
	S.SLComment,
	S.MLComment
];
export const NumberLiteral = [
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
export const StringLiteral = [
	S.SingleQuoteStringLiteral,
	S.TripleQuotesStringLiteral,
	S.SingleQuoteGStringLiteral,
	S.TripleQuotesGStringLiteral,
	S.SlashyGStringLiteral,
	S.DollarSlashyGStringLiteral
];
export const CommentString = [...Comment, ...StringLiteral];
export const CommentNumberString = [...Comment, ...NumberLiteral, ...StringLiteral];

export const InclCommentString: TokenCaptorStates<GroovyAstBuildState> = [Incl, CommentString];
export const ExclCommentNumberString: TokenCaptorStates<GroovyAstBuildState> = [Excl, CommentNumberString];
/** -1 is not a valid state, excludes -1 equals includes all */
export const InclAll: TokenCaptorStates<GroovyAstBuildState> = [Excl, -1 as GroovyAstBuildState];

export const GroovyTokenMatcherBuilder = TokenMatcherBuilder.create({LongestKeywordLength: 'synchronized'.length});

export const buildTokenCaptors = (defs: Array<GroovyTokenCaptorDefs>): TokenCaptorOfStates<GroovyAstBuildStateName> => {
	return BuildUtils.buildTokenCaptors({
		defs,
		tokenIdMap: GroovyTokenId as unknown as Record<GroovyTokenName, GroovyTokenId>,
		stateNameMap: GroovyAstBuildState,
		tokenMatcherBuilder: GroovyTokenMatcherBuilder
	});
};
