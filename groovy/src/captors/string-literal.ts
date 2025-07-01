export const StringLiteralPatterns = {
	StringMark: '\'',
	StringMarkML: '\':3',
	GStringMark: '"',
	GStringMarkML: '"""',
	SlashyGStringMark: '/',
	DollarSlashyGStringStartMark: '$/',
	DollarSlashyGStringEndMark: '/$',
	StringBackspaceEscape: '\\b',
	StringFormFeedEscape: '\\f',
	StringNewlineEscape: '\\\\n',
	StringCarriageReturnEscape: '\\\\r',
	StringTabulationEscape: '\\\\t',
	StringBackslashEscape: '\\/',
	StringSingleQuoteEscape: '\\',
	StringDoubleQuoteEscape: '\\"',
	StringDollarEscape: '\\$',
	StringOctal: '\\;fn#Oct:1,3',
	StringUnicode: '\\u;fn#Hex:4',
	SlashyGStringSlashEscape: '\\/',
	DollarSlashyGStringDollarEscape: '$$',
	DollarSlashyGStringSlashEscape: '$/',
	GStringInterpolationStartMark: '$',
	GStringInterpolationLBraceStartMark: '${',
	GStringInterpolationRBraceEndMark: '}',
	StringMLNewlineEraser: '\\'
};

// export const StringLiteralTokenMatchers = buildTokenMatchers(StringLiteralPatterns);
