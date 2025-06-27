import {LeafToken, TokenId} from '@rainbow-ast/core';
import {AstBuildContext} from '../ast';
import {GroovyTokenId, GroovyTokenName} from '../token';
import {Char, TokenCharMatchUsage, TokenMatcher} from './match';

export interface TokenCaptorOptions {
	name: GroovyTokenName;
	matcher: TokenMatcher;
}

/**
 * the token captor is static. it can be referenced in one or more different context states,
 * and references in different states will not change the behavior of the captor.
 */
export class TokenCaptor {
	private readonly _tokenId: TokenId;
	private readonly _name: GroovyTokenName;
	private readonly _matcher: TokenMatcher;

	constructor(options: TokenCaptorOptions) {
		this._name = options.name;
		this._tokenId = GroovyTokenId[this._name];
		this._matcher = options.matcher;
	}

	get tokenId(): TokenId {
		return this._tokenId;
	}

	get name(): GroovyTokenName {
		return this._name;
	}

	get matcher(): TokenMatcher {
		return this._matcher;
	}

	get description(): string {
		return this._matcher.description;
	}

	/**
	 * capture token from given context.
	 * make sure the capture operation can be performed, otherwise error raised!
	 */
	capture(context: AstBuildContext): LeafToken {
		const doc = context.document;
		const matcher = this._matcher;
		const matches = matcher.matches;

		const chars: Array<Char> = [];

		let charIndex = context.charIndex;
		let char = doc[charIndex];
		let charMatchIndex = 0;

		while (char != null) {
			const charMatch = matches[charMatchIndex];
			if (charMatch == null) {
				// all char matches are performed
				break;
			}

			const {rule, usage} = charMatch;
			if (rule === char || (typeof rule !== 'string' && rule(char))) {
				if (usage === TokenCharMatchUsage.END_BEFORE_ME) {
					// it is the last char match
					break;
				}
				chars.push(char);
				charIndex++;
				char = doc[charIndex];
				if (usage !== TokenCharMatchUsage.ANY_TIMES) {
					charMatchIndex++;
				}
			} else if (usage !== TokenCharMatchUsage.ANY_TIMES) {
				// not matched, but current char match is any times
				// means any times char match is over, check next one
				charMatchIndex++;
			} else {
				throw new Error(`Cannot capture token from context, starts at char index[${context.charIndex}].`);
			}
		}

		let {line, column} = context;
		const text = chars.join('');
		const lastNewlineIndex = text.lastIndexOf('\n');
		if (lastNewlineIndex === -1) {
			// no newline
			column = column + chars.length;
		} else {
			line = line + text.split('\n').length - 1;
			column = text.slice(lastNewlineIndex).length;
		}

		return new LeafToken({
			id: this._tokenId, text: chars.join(''),
			start: context.charIndex, line, column
		});
	}
}
