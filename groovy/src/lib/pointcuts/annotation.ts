import {BlockToken} from '@rainbow-ast/core';
import {S, T} from '../alias';
import {GroovyTokenPointcutDefs} from './types';
import {moveTrailingWhitespaceTabCommentNewLineOfLastChildToCurrentBlock} from './utils';

export const AnnotationPointcutDefs: GroovyTokenPointcutDefs = {
	AnnotationDecl: {
		onBlockEnded: (_, context): void => {
			moveTrailingWhitespaceTabCommentNewLineOfLastChildToCurrentBlock(context);
		}
	},
	AnnotationDeclValues: {
		onBeforeChildAppend: (_, token, context): void => {
			const tokenId = token.id;
			if (![
				T.LParen, T.RParen, T.Comma,
				T.Whitespaces, T.Tabs, T.Newline, T.SLComment, T.MLComment,
				T.AnnotationDeclValue
			].includes(tokenId)) {
				const blockToken = new BlockToken(T.AnnotationDeclValue);
				context.appendBlock(blockToken, S.AnnDeclValSt);
			}
		},
		onBlockEnded: (_, context): void => {
			moveTrailingWhitespaceTabCommentNewLineOfLastChildToCurrentBlock(context);
			/** also end {@link T.AnnotationDecl} */
			context.endCurrentBlock();
		}
	}
};
