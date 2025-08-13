import {BlockToken, Token} from '@rainbow-ast/core';
import {AnnotationDeclParser} from '../../annotation';
import {CommentParsers} from '../../comment';
import {VariableNameParser, WsTabNlParsers} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {StringParsers} from '../../string-literal';
import {ParserSelector} from '../../token-parser';
import {T} from '../../tokens';
import {TsscmfvKeywordUtils} from '../utils';

/**
 * annotation is allowed before variable name (string literal).
 *
 * the tricky thing is for method, name can be a string literal; but for field or variable, it is not allowed.
 * when parsing, it is allowed anyway, since in most case method or field/variable cannot be identified util the method parameters or assign operator appears.
 *
 */
export class MfvNameParser {
	private static readonly Selector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance,
			VariableNameParser.instance,
			CommentParsers, WsTabNlParsers
		]
	});
	private static readonly WithStrSelector = new ParserSelector({
		parsers: [
			AnnotationDeclParser.instance,
			VariableNameParser.instance, StringParsers,
			CommentParsers, WsTabNlParsers
		]
	});

	private isStrNameAllowed(context: ParseContext): boolean {
		const block = context.block();
		return block.id !== T.FieldDecl && block.id !== T.VarDecl;
	}

	try(context: ParseContext): void {
		const selector = this.isStrNameAllowed(context) ? MfvNameParser.WithStrSelector : MfvNameParser.Selector;
		let c = context.char();
		let found = false;
		while (c != null) {
			const parser = selector.find(c, context);
			if (parser == null) {
				break;
			}
			parser.parse(c, context);
			// @ts-expect-error ignore the type check when perform includes function
			if (parser === VariableNameParser.instance || StringParsers.includes(parser)) {
				found = true;
				break;
			}
			c = context.char();
		}

		/**
		 * Another tricky problem: if the modifiers contain def or var, then the type definition becomes optional (if not, the type is Object).
		 * in this case, the name might be collected as a type by {@link MfvTypeParser}, and the name cannot be resolved here.
		 * therefore, an additional piece of logic is needed here to retrieve the name in this situation.
		 */
		if (!found) {
			const block = context.block();
			if (TsscmfvKeywordUtils.containsDefOrVar(block)) {
				// the last one if type token
				const typeToken = block.children?.find(c => c.id === T.MfvTypeSeg) as BlockToken | undefined;
				if (typeToken != null) {
					// only an independent identifier is considered a name.
					// that is to say, the type node cannot contain multiple identifiers.
					// if it does, it is a qualified name and not a simple name.
					let identifierIndex = -1;
					let multiple = false;
					const children = typeToken.children ?? [];
					for (let index = children.length - 1; index >= 0; index--) {
						const child = children[index];
						if (child.id === T.Identifier) {
							if (identifierIndex !== -1) {
								multiple = true;
								break;
							} else {
								identifierIndex = index;
							}
						}
					}
					if (!multiple && identifierIndex !== -1) {
						const tokens = typeToken.popChild(children.length - identifierIndex);
						// before re-append these tokens,
						// remove the parsed tokens of this parser first (needs to be re-appended after)
						// and if there is no child token in type token, remove it as well
						let startIndexOfPopFromBlock = block.children.indexOf(typeToken);
						if ((typeToken as BlockToken).children.length !== 0) {
							startIndexOfPopFromBlock += 1;
						}
						let removedTokensOfBlock: Array<Token> = [];
						const removedTokensOfBlockCount = block.children.length - startIndexOfPopFromBlock;
						if (removedTokensOfBlockCount !== 0) {
							removedTokensOfBlock = block.popChild(block.children.length - startIndexOfPopFromBlock);
							// if the type token is removed from block, means no child exists, then remove it from re-append array
							if (removedTokensOfBlock[0]?.id === T.MfvTypeSeg) {
								removedTokensOfBlock.shift();
							}
						}
						tokens.forEach(token => block.appendChild(token));
						removedTokensOfBlock.forEach(token => block.appendChild(token));
					}
				}
			}
		}
	}

	static readonly instance = new MfvNameParser();
}
