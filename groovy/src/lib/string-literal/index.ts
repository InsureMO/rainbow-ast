import {SsqSLiteralParser} from './ssq-string-literal';

export * from './backslash-escape';
export * from './octal-escape';
export * from './ssq-string-literal';

export const StringParsers = [
	SsqSLiteralParser.instance
];
