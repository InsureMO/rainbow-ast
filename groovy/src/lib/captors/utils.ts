import {
	AstBuildContext,
	AtomicToken,
	BeforeCollectTokenActionType,
	BuildUtils,
	CustomActionBeforeCollect,
	Token,
	TokenCaptorAvailableCheck,
	TokenCaptorDef,
	TokenCaptorOfStates,
	TokenMatcherBuilder
} from '@rainbow-ast/core';
import {EBBC, Incl, T} from '../alias';
import {GroovyAstBuildState, GroovyAstBuildStateName} from '../ast-build-state';
import {GroovyTokenId, GroovyTokenName} from '../token';
import {CFS, SG} from './state-shortcuts';
import {GroovyTokenCaptorDefs} from './types';

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
export const IsKeywordAllowed: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
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
			default: {
				return true;
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
export const IsSlashyGStringStartAllowed: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
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
export const SlashyGStringStartNotAllowed: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => !IsSlashyGStringStartAllowed(context);

export const IsSafeIndex: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
	const block = context.currentBlock;
	return block.id === T.IndexBlock && block.children[0].id === T.SafeIndex;
};
export const NotSafeIndex: TokenCaptorAvailableCheck = (context: AstBuildContext): boolean => {
	const block = context.currentBlock;
	return block.id !== T.IndexBlock || block.children[0].id !== T.SafeIndex;
};

export const EndBlockBeforeCollectKeywordFork: Readonly<Omit<TokenCaptorDef<GroovyAstBuildState>, 'patterns'>> = {
	/**
	 * in following states, always allowed:
	 * 1. package declaration
	 * 2. import declaration
	 * 3. annotation declaration
	 */
	forStates: [Incl, SG.Pkg, SG.Imp, SG.Ann],
	beforeCollect: EBBC
};
/**
 * 1. when state is not one of follow, and is keyword allowed:
 *    comment,
 *    number, string, gstring interpolation inline,
 *    package declaration, import declaration
 * 2. when state is package declaration
 * 3. when state is import declaration
 */
export const KeywordForks: ReadonlyArray<Omit<TokenCaptorDef<GroovyAstBuildState>, 'patterns'>> = [
	{
		forStates: CFS.Keywords,
		enabledWhen: IsKeywordAllowed
	},
	EndBlockBeforeCollectKeywordFork
];

/**
 * check the symmetry of right parentheses, including {@link T.RBrace}, {@link T.RBrack}, and {@link T.RParen}.
 * - if block is compilation unit, do nothing,
 * - if first child is matched, do nothing,
 * - if first child is not matched,
 *   - if first child is other types of parentheses, do nothing,
 *   - if first child is not any type of parentheses, move to parent block, and check again.
 */
export const RBracketBC: CustomActionBeforeCollect = [BeforeCollectTokenActionType.Custom, (token: AtomicToken, context: AstBuildContext): void => {
	const currentBlock = context.currentBlock;
	const currentBlockTokenId = currentBlock.id;
	if (currentBlockTokenId === T.COMPILATION_UNIT) {
		// under compilation unit, do nothing
		return;
	}

	const tokenId = token.id;
	let leftBracketTokenIds: Array<GroovyTokenId>;
	let otherBracketTokenIds: Array<GroovyTokenId>;
	switch (tokenId) {
		case T.RBrace:
			leftBracketTokenIds = [T.LBrace, T.GStringInterpolationLBraceStartMark];
			otherBracketTokenIds = [T.LBrack, T.SafeIndex, T.LParen];
			break;
		case T.RBrack:
			leftBracketTokenIds = [T.LBrack, T.SafeIndex];
			otherBracketTokenIds = [T.LBrace, T.GStringInterpolationLBraceStartMark, T.LParen];
			break;
		case T.RParen:
			leftBracketTokenIds = [T.LParen];
			otherBracketTokenIds = [T.LBrace, T.GStringInterpolationLBraceStartMark, T.LBrack, T.SafeIndex];
			break;
		default:
			throw new Error(`Unsupported bracket token[${tokenId}, ${GroovyTokenId[tokenId]}].`);
	}

	let matched = false;
	let endBlockCount = 0;
	let block = currentBlock;
	while (block.id !== T.COMPILATION_UNIT) {
		const firstChildOfBlock = block.children[0];
		const firstChildOfBlockTokenId = firstChildOfBlock.id;
		if (leftBracketTokenIds.includes(firstChildOfBlockTokenId)) {
			// left and right matched, do nothing
			matched = true;
			break;
		} else if (otherBracketTokenIds.includes(firstChildOfBlockTokenId)) {
			// left and right unmatched, and this block starts with other left bracket
			// which means the started bracket not closed yet, and captured token appears at incorrect position
			// do nothing
			return;
		} else {
			// close current block, and check again
			endBlockCount++;
			// context.endCurrentBlock();
			block = block.parent;
		}
	}
	if (matched) {
		for (let index = 0; index < endBlockCount; index++) {
			context.endCurrentBlock();
		}
		const bracketMap = {
			[T.LBrace]: T.RBrace,
			[T.GStringInterpolationLBraceStartMark]: T.GStringInterpolationRBraceEndMark,
			[T.LBrack]: T.RBrack,
			[T.SafeIndex]: T.SafeIndexClose,
			[T.LParen]: T.RParen
		};
		const firstChildOfBlock = block.children[0];
		const firstChildOfBlockTokenId = firstChildOfBlock.id;
		const rewriteTokenId = bracketMap[firstChildOfBlockTokenId];
		if (rewriteTokenId !== tokenId) {
			token.rewriteId(rewriteTokenId);
		}
		context.endCurrentBlock();
	}
}];

export const buildTokenCaptors = (defs: ReadonlyArray<GroovyTokenCaptorDefs>): TokenCaptorOfStates<GroovyAstBuildStateName> => {
	return BuildUtils.buildTokenCaptors({
		defs,
		tokenIdMap: GroovyTokenId as unknown as Record<GroovyTokenName, GroovyTokenId>,
		stateNameMap: GroovyAstBuildState,
		tokenMatcherBuilder: GroovyTokenMatcherBuilder
	});
};
