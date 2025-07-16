import {GroovyTokenPointcutDefs} from './types';
import {moveTrailingWhitespaceTabCommentNewLineOfLastChildToCurrentBlock} from './utils';

export const PackageDeclarationPointcutDefs: GroovyTokenPointcutDefs = {
	PackageDecl: {
		onBlockEnded: (_, context): void => {
			moveTrailingWhitespaceTabCommentNewLineOfLastChildToCurrentBlock(context);
		}
	}
};
