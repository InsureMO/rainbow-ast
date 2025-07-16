import {AstBuildContext, BlockToken, BuildUtils, Token, TokenPointcuts} from '@rainbow-ast/core';
import {T} from '../alias';
import {GroovyTokenName} from '../token';
import {GroovyTokenPointcutDefs} from './types';

/**
 * move trailing tokens from last child of current block to current block.
 * token is whitespaces, tabs, ml comment, sl comment or newline
 */
export const moveTrailingWhitespaceTabCommentNewLineOfLastChildToCurrentBlock = (context: AstBuildContext): void => {
	const currentBlock = context.currentBlock;
	const children = currentBlock.children;
	const lastChild = children[children.length - 1];
	if (lastChild != null && lastChild instanceof BlockToken) {
		const childrenOfLastChild = lastChild.children;
		let count = 0;
		const popChildren: Array<Token> = [];
		for (let index = childrenOfLastChild.length - 1; index >= 0; index--) {
			const childOfLastChild = childrenOfLastChild[index];
			const tokenId = childOfLastChild.id;
			if ([T.Whitespaces, T.Tabs, T.Newline, T.SLComment, T.MLComment].includes(tokenId)) {
				popChildren.unshift(childOfLastChild);
				count++;
			} else {
				break;
			}
		}
		if (count !== 0) {
			lastChild.popChild(count);
			popChildren.forEach(child => currentBlock.appendChild(child));
		}
	}
};

export const buildTokenPointcuts = (defs: ReadonlyArray<GroovyTokenPointcutDefs>): TokenPointcuts<GroovyTokenName> => {
	return BuildUtils.buildTokenPointcuts({defs});
};
