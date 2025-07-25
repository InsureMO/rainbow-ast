import {Token} from '@rainbow-ast/core';
import {T} from '../tokens';

export const IsOperator = (token: Token): boolean => {
	const tokenId = token.id;
	return tokenId >= T.RangeInclusive && tokenId <= T.InstanceOf;
};
