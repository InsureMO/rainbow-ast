import {AbstractParser} from './abstract';
import {DefParser} from './def';
import {FinalParser} from './final';
import {PrivateParser, ProtectedParser, PublicParser} from './public-protected-private';
import {StaticParser} from './static';
import {StrictfpParser} from './strictfp';

export * from './tsscmfv-modifier-keyword';

export * from './abstract';
export * from './as';
export * from './def';
export * from './final';
export * from './public-protected-private';
export * from './static';
export * from './strictfp';

/**
 * keywords for type, static block, synchronized block, constructor, method, field and variable
 */
export const TsscmfvKeywordParsers = [
	AbstractParser.instance,
	DefParser.instance,
	FinalParser.instance,
	PrivateParser.instance,
	ProtectedParser.instance,
	PublicParser.instance,
	StaticParser.instance,
	StrictfpParser.instance
];
