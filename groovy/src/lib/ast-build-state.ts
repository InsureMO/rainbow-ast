export enum GroovyAstBuildState {
	CompilationUnit,
	CompilationUnitOmitScriptCommand,

	// shebang command
	ScriptCommand,
	// comments
	SLComment,
	MLComment,
	// number literals
	/** 0b/0B captured */ BinNumLiteralStarted,
	/** binary numbers captured */ BinNumLiteralNumEd,
	/** binary number separators captured */ BinNumLiteralSepEd,
	/** 0x/0X captured */ HexNumLiteralStarted,
	/** hexadecimal numbers captured */ HexNumLiteralNumEd,
	/** hexadecimal number separators captured */ HexNumLiteralSepEd,
	/** integral numbers captured */ NumLiteralIntEd,
	/** integral number separators captured */ NumLiteralIntSepEd,
	/** dot captured */ NumLiteralDotEd,
	/** fraction numbers captured */ NumLiteralFracEd,
	/** fraction number separators captured */ NumLiteralFracSepEd,
	/** exponent sign captured */ NumLiteralExpSignEd,
	/** exponent numbers captured */ NumLiteralExpNumEd,
	/** exponent number separators captured */ NumLiteralExpNumSepEd,
	// string literals
	SingleQuoteStringLiteral,
	TripleQuotesStringLiteral,
	SingleQuoteGStringLiteral,
	TripleQuotesGStringLiteral,
	SlashyGStringLiteral,
	DollarSlashyGStringLiteral,
	/** $... */ GStringInterpolationInline,
	/** identifier captured */ GStringInterpolationInlineIdentifierEd,
	/** dot captured */ GStringInterpolationInlineDotEd,
	/** ${...} */ GStringInterpolation,
	// block
	CodeBlock,
	IndexBlock,  // [], ?[]
	//
	GenericType,
	AnnotationStarted,
}

export type GroovyAstBuildStateName = Exclude<keyof typeof GroovyAstBuildState, number>;
