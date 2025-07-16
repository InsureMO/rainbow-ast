import {GroovyTokenPointcutDefs} from './types';
import {moveTrailingWhitespaceTabCommentNewLineOfLastChildToCurrentBlock} from './utils';

export const ImportDeclarationPointcutDefs: GroovyTokenPointcutDefs = {
	ImportDecl: {
		onBlockEnded: (_, context): void => {
			moveTrailingWhitespaceTabCommentNewLineOfLastChildToCurrentBlock(context);
		}
	}
};
