import {AstBuildContext} from '../context';
import {AtomicToken} from '../token';
import {Char, TokenCharMatchUsage, TokenMatcher} from '../token-match';
import {AstBuildState, TokenId, TokenName} from '../types';

export type TokenCaptorAvailableCheck = (context: AstBuildContext) => boolean;

export enum BeforeCollectTokenActionType {
	/** end current block */
	EndBlock,
	/** custom action */
	Custom
}

export type EndBlockBeforeCollect = [BeforeCollectTokenActionType.EndBlock];
/**
 * given token has not been appended to context yet.
 */
export type DoBeforeCollect = (token: AtomicToken, context: AstBuildContext) => void;
export type CustomActionBeforeCollect = [BeforeCollectTokenActionType.Custom, DoBeforeCollect];
export type BeforeCollectTokenAction =
	| EndBlockBeforeCollect
	| CustomActionBeforeCollect;

export enum CollectTokenActionType {
	/**
	 * create a block token, append to created token.
	 * and append created block token to current block,
	 * and unshift created block to context block stack, unshift new state to context state stack
	 */
	CreateBlock,
	/** append to current block, and switch current state to another */
	SwitchState,
	/** append to current block, and end it */
	EndBlock,
	/** block contains only one child, create it, append child, and end it immediately */
	CreateAndEndBlock
}

export type CreateBlock = [CollectTokenActionType.CreateBlock, TokenId, AstBuildState];
export type SwitchState = [CollectTokenActionType.SwitchState, AstBuildState];
export type EndBlock = [CollectTokenActionType.EndBlock];
export type CreateAndEndBlock = [CollectTokenActionType.CreateAndEndBlock, TokenId, AstBuildState];
export type CollectTokenAction =
	| CreateBlock
	| SwitchState
	| EndBlock
	| CreateAndEndBlock;

export interface TokenCaptorOptions {
	tokenId: TokenId;
	name: TokenName;
	matcher: TokenMatcher;
	availableCheck?: TokenCaptorAvailableCheck;
	/** default do nothing */
	beforeCollect?: BeforeCollectTokenAction;
	/** default append token to current block */
	collect?: CollectTokenAction;
}

/**
 * the token captor is static. it can be referenced in one or more different context states,
 * and references in different states will not change the behavior of the captor.
 */
export class TokenCaptor {
	private readonly _tokenId: TokenId;
	private readonly _tokenName: TokenName;
	private readonly _matcher: TokenMatcher;
	private readonly _availableCheck: TokenCaptorAvailableCheck;
	private readonly _beforeCollectAction?: BeforeCollectTokenAction;
	private readonly _collectAction?: CollectTokenAction;

	constructor(options: TokenCaptorOptions) {
		this._tokenId = options.tokenId;
		this._tokenName = options.name;
		this._matcher = options.matcher;
		this._availableCheck = options.availableCheck;
		this._beforeCollectAction = options.beforeCollect;
		this._collectAction = options.collect;
	}

	get tokenId(): TokenId {
		return this._tokenId;
	}

	get tokenName(): TokenName {
		return this._tokenName;
	}

	get matcher(): TokenMatcher {
		return this._matcher;
	}

	get availableCheck(): TokenCaptorAvailableCheck | undefined {
		return this._availableCheck;
	}

	get beforeCollectAction(): BeforeCollectTokenAction | undefined {
		return this._beforeCollectAction;
	}

	get collectAction(): CollectTokenAction | undefined {
		return this._collectAction;
	}

	get description(): string {
		return this._matcher.description;
	}

	/**
	 * capture token from given context.
	 * make sure the capture operation can be performed, otherwise error raised!
	 */
	capture(context: AstBuildContext): AtomicToken | undefined {
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
				if (usage !== TokenCharMatchUsage.END_BEFORE_ME) {
					// ignore the char when usage is end before me.
					chars.push(char);
				}
				charIndex++;
				char = doc[charIndex];
				if (usage !== TokenCharMatchUsage.ANY_TIMES) {
					charMatchIndex++;
				}
			} else if (usage === TokenCharMatchUsage.ANY_TIMES) {
				// not matched, but current char match is any times
				// means any times char match is over, check next one
				charMatchIndex++;
			} else {
				return (void 0);
			}
		}

		return new AtomicToken({
			id: this._tokenId, text: chars.join(''),
			start: context.charIndex, line: context.line, column: context.column
		});
	}
}
