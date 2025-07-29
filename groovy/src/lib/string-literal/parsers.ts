import {DsGsLiteralParser} from './dollar-slashy-gstring-literal';
import {SdqGsLiteralParser} from './sdq-gstring-literal';
import {SGsLiteralParser} from './slashy-gstring-literal';
import {SsqSLiteralParser} from './ssq-string-literal';
import {TdqGsLiteralParser} from './tdq-gstring-literal';
import {TsqSLiteralParser} from './tsq-string-literal';

export const StringParsers = [
	SsqSLiteralParser.instance,
	TsqSLiteralParser.instance,
	SdqGsLiteralParser.instance,
	TdqGsLiteralParser.instance,
	SGsLiteralParser.instance,
	DsGsLiteralParser.instance
];
