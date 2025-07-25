import {SdqGsLiteralParser} from './sdq-gstring-literal';
import {SsqSLiteralParser} from './ssq-string-literal';
import {TdqGsLiteralParser} from './tdq-gstring-literal';
import {TsqSLiteralParser} from './tsq-string-literal';

export * from './backslash-escape';
export * from './octal-escape';
export * from './unicode-escape';
export * from './dollar-escape';
export * from './escape';

export * from './standalone-symbol';

export * from './ml-eraser';

export * from './ssq-string-literal';
export * from './tsq-string-literal';
export * from './sdq-gstring-literal';
export * from './tdq-gstring-literal';

export const StringParsers = [
	SsqSLiteralParser.instance,
	TsqSLiteralParser.instance,
	SdqGsLiteralParser.instance,
	TdqGsLiteralParser.instance
];
