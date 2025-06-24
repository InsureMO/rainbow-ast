export class PrintUtils {
	private static readonly ESCAPE_CHARS_FOR_PRINT: { [key: string]: string } = {
		'\n': '\\n',
		'\r': '\\r',
		'\t': '\\t',
		'\b': '\\b',
		'\f': '\\f',
		'\\': '\\\\',
		'\'': `\\'`,
		'\"': '\\"'
	};
	private static readonly ESCAPE_REGEXP_FOR_PRINT = new RegExp(`[${Object.keys(PrintUtils.ESCAPE_CHARS_FOR_PRINT).join('')}]`, 'g');

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// avoid extend
	}

	static escapeForPrint(text?: string): string | undefined {
		return text?.replace(PrintUtils.ESCAPE_REGEXP_FOR_PRINT, (match) => PrintUtils.ESCAPE_CHARS_FOR_PRINT[match]);
	}
}
