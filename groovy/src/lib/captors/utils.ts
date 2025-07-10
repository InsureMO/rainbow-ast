import {
	AstBuildContext,
	BuildUtils,
	Token,
	TokenCaptorOfStates,
	TokenCaptorStates,
	TokenMatcherBuilder
} from '@rainbow-ast/core';
import {Excl, Incl, S, T} from '../alias';
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
export const GStringInterpolationInline = [
	S.GStringInterpolationInline,
	S.GStringInterpolationInlineIdentifierEd,
	S.GStringInterpolationInlineDotEd
];

export const InclCommentString: TokenCaptorStates<GroovyAstBuildState> = [Incl, Comment, StringLiteral];
export const ExclNumberGStringInterpolationInline: TokenCaptorStates<GroovyAstBuildState> = [Excl, NumberLiteral, GStringInterpolationInline];
export const ExclCommentNumberStringGStringInterpolationInline: TokenCaptorStates<GroovyAstBuildState> = [Excl, Comment, NumberLiteral, StringLiteral, GStringInterpolationInline];

export const GroovyTokenMatcherBuilder = TokenMatcherBuilder.create({LongestKeywordLength: 'synchronized'.length});

export const IsOperator = (token: Token): boolean => {
	const tokenId = token.id;
	return tokenId >= T.RangeInclusive && tokenId <= T.InstanceOf;
};

/**
 * any keyword includes:
 * 1. true/false
 * 2. java keyword and groovy keyword, such as: public, null, void, etc.
 * 3. in/instanceof,
 * 4. 8 primitive types.
 *
 * if there is a dot in front, not allowed. keyword will be treated as identifier, to visit the properties of object.
 */
export const IsKeywordAllowed = (context: AstBuildContext): boolean => {
	const block = context.currentBlock;
	const children = block.children;

	let childIndex = children.length - 1;
	let child = children[childIndex];

	while (childIndex >= 0) {
		const childTokenId = child.id;
		switch (childTokenId) {
			case T.ScriptCommand:
			case T.SLComment:
			case T.MLComment:
			case T.Whitespaces:
			case T.Tabs: {
				// ignore above token
				childIndex--;
				child = children[childIndex];
				break;
			}
			case T.Dot:
			case T.SafeDot:
			case T.SafeChainDot: {
				return false;
			}
		}
	}
	return true;
};
/**
 * at least one of the following conditions is met, it is allowed:
 * 1. after operator, operator must at same line
 * 2. after semicolon, dot, lbrace, lbrack, lparen, gstring interpolation lbrace start mark
 * 3.
 */
export const IsSlashyGStringStartAllowed = (context: AstBuildContext): boolean => {
	const block = context.currentBlock;
	const line = context.line;
	const children = block.children;
	if (children.length === 0) {
		return true;
	}

	let childIndex = children.length - 1;
	let child = children[childIndex];
	while (childIndex >= 0) {
		const childTokenId = child.id;
		switch (childTokenId) {
			case T.ScriptCommand:
			case T.SLComment:
			case T.MLComment:
			case T.Whitespaces:
			case T.Tabs: {
				// ignore above token
				childIndex--;
				child = children[childIndex];
				break;
			}
			case T.Semicolon:
			case T.Dot:
			case T.SafeDot:
			case T.SafeChainDot:
			case T.LBrace:
			case T.LBrack:
			case T.SafeIndex:
			case T.LParen:
			case T.GStringInterpolationLBraceStartMark: {
				// the first not ignored token is one of above, allowed
				return true;
			}
			default: {
				if (child.line !== line) {
					// slash is first not ignored token of line, allowed
					return true;
				} else {
					// at same line and after operator, allowed; otherwise not allowed.
					return IsOperator(child);
				}
			}
		}
	}
	// only ignored tokens in front, allowed
	return true;
};
/**
 * when {@link IsSlashyGStringStartAllowed} returns false
 */
export const SlashyGStringStartNotAllowed = (context: AstBuildContext): boolean => !IsSlashyGStringStartAllowed(context);

export const IsSafeIndex = (context: AstBuildContext): boolean => {
	const block = context.currentBlock;
	return block.id === T.IndexBlock && block.children[0].id === T.SafeIndex;
};
export const NotSafeIndex = (context: AstBuildContext): boolean => {
	const block = context.currentBlock;
	return block.id !== T.IndexBlock || block.children[0].id !== T.SafeIndex;
};

export const buildTokenCaptors = (defs: Array<GroovyTokenCaptorDefs>): TokenCaptorOfStates<GroovyAstBuildStateName> => {
	return BuildUtils.buildTokenCaptors({
		defs,
		tokenIdMap: GroovyTokenId as unknown as Record<GroovyTokenName, GroovyTokenId>,
		stateNameMap: GroovyAstBuildState,
		tokenMatcherBuilder: GroovyTokenMatcherBuilder
	});
};
