import {DsGsLiteralParser} from './dollar-slashy-gstring-literal-parsers';
import {SdqGsLiteralParser} from './sdq-gstring-literal-parsers';
import {SGsLiteralParser} from './slashy-gstring-literal-parsers';
import {SsqSLiteralParser} from './ssq-string-literal-parsers';
import {TdqGsLiteralParser} from './tdq-gstring-literal-parsers';
import {TsqSLiteralParser} from './tsq-string-literal-parsers';

export const StringParsers = [
	SsqSLiteralParser.instance,
	TsqSLiteralParser.instance,
	SdqGsLiteralParser.instance,
	TdqGsLiteralParser.instance,
	SGsLiteralParser.instance,
	DsGsLiteralParser.instance
];
