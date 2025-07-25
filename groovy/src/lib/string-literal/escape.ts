import {BackslashEscapeParser, SqSLBadBackslashEscapeParser, TqSLBadBackslashEscapeParser} from './backslash-escape';
import {DollarEscapeParser} from './dollar-escape';
import {OctalEscapeParser} from './octal-escape';
import {QSLUnicodeEscapeParser} from './unicode-escape';

/**
 * SqSL = single-quote string literal, double-quotes gstring literal
 */
export const SqSLEscapeParsers = [
	BackslashEscapeParser.instanceB,
	BackslashEscapeParser.instanceF,
	BackslashEscapeParser.instanceN,
	BackslashEscapeParser.instanceR,
	BackslashEscapeParser.instanceT,
	BackslashEscapeParser.instanceBackslash,
	BackslashEscapeParser.instanceSingleQuote,
	BackslashEscapeParser.instanceDoubleQuotes,
	BackslashEscapeParser.instanceDollar,
	SqSLBadBackslashEscapeParser.instance,
	OctalEscapeParser.instance,
	QSLUnicodeEscapeParser.instance
];
/**
 * TqSL = triple single-quotes string literal, triple double-quotes gstring literal
 */
export const TqSLEscapeParsers = [
	BackslashEscapeParser.instanceB,
	BackslashEscapeParser.instanceF,
	BackslashEscapeParser.instanceN,
	BackslashEscapeParser.instanceR,
	BackslashEscapeParser.instanceT,
	BackslashEscapeParser.instanceBackslash,
	BackslashEscapeParser.instanceSingleQuote,
	BackslashEscapeParser.instanceDoubleQuotes,
	BackslashEscapeParser.instanceDollar,
	TqSLBadBackslashEscapeParser.instance,
	OctalEscapeParser.instance,
	QSLUnicodeEscapeParser.instance
];

/**
 * for slashy gstring literal.
 * SGsL = slashy gstring literal
 */
export const SGsLEscapeParsers = [
	BackslashEscapeParser.instanceSlash,
	QSLUnicodeEscapeParser.instance
];

/**
 * for dollar slashy gstring literal
 * DSGsL = dollar slashy gstring literal.
 */
export const DSGsLEscapeParsers = [
	DollarEscapeParser.instanceDollar,
	DollarEscapeParser.instanceSlash,
	QSLUnicodeEscapeParser.instance
];
