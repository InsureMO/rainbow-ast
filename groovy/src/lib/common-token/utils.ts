import {Token} from '@rainbow-ast/core';
import {T} from '../tokens';

export const IsOperator = (previous: Token): boolean => {
	const tokenId = previous.id;
	return tokenId >= T.RangeInclusive && tokenId <= T.InstanceOf;
};

export const IsLookForStrIdentifier = (previous: Token): boolean => {
	if (IsOperator(previous)) {
		return true;
	}
	const tokenId = previous.id;
	// noinspection RedundantIfStatementJS
	if ([T.ModifierSeg, T.MfvTypeSeg].includes(tokenId)) {
		return true;
	}
	return false;
};
