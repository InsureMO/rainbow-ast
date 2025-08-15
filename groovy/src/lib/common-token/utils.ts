import {Token} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
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

export const IsAfterDot = (context: ParseContext) => {
	const block = context.block();
	const children = block.children;

	let childIndex = children.length - 1;
	let child = children[childIndex];

	while (childIndex >= 0) {
		const childTokenId = child.id;
		switch (childTokenId) {
			case T.SLComment:
			case T.MLComment:
			case T.Whitespaces:
			case T.Tabs:
			case T.Newline: {
				// ignore above token
				childIndex--;
				child = children[childIndex];
				break;
			}
			case T.Dot:
			case T.SafeDot:
			case T.SafeChainDot: {
				return true;
			}
			default: {
				return false;
			}
		}
	}
	return false;
};