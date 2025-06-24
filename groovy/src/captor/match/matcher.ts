import {IToken} from '@rainbow-ast/core';
import {GroovyAstBuildContext} from '../../ast/context';

export type TokenMismatched = [false, undefined];
export type TokenMatched = [true, IToken]
export type TokenMatchResult = TokenMismatched | TokenMatched;

export interface TokenMatcher {
	matches(context: GroovyAstBuildContext): TokenMatchResult;
	/**
	 * get human reading string
	 */
	stringify(): string;
}
