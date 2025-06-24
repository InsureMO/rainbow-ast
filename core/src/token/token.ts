import {TokenId, TokenIds} from './token-id';

export interface IToken {
	get id(): TokenId;
	get text(): string;
	get start(): number;
	get end(): number;
	get line(): number;
	get column(): number;
	get parent(): IContainerToken | undefined;
	get ancestors(): ReadonlyArray<IContainerToken>;
	/**
	 * returns myself when no parent appointed
	 */
	get root(): IToken;
	get previousSiblings(): ReadonlyArray<IToken>;
	get previousSibling(): IToken | undefined;
	get nextSiblings(): ReadonlyArray<IToken>;
	get nextSibling(): IToken | undefined;

	stringify(ids: TokenIds): string;
}

export interface IContainerToken extends IToken {
	get children(): ReadonlyArray<IToken>;
}
