export enum GroovyAstBuildState {
	CU,
	CUOmitScriptCmd,

	// shebang command
	/** script command, shebang */ ScriptCmd,
	// comments
	/** single line comment */ SLCmt,
	/** multiple lines comment */ MLCmt,
	// number literals
	/** 0b/0B captured, binary number started */ BinNumSt,
	/** binary numbers captured */ BinNumNumEd,
	/** binary number separators captured */ BinNumSepEd,
	/** 0x/0X captured, hexadecimal number started */ HexNumSt,
	/** hexadecimal numbers captured */ HexNumNumEd,
	/** hexadecimal number separators captured */ HexNumSepEd,
	/** integral numbers captured */ NumIntEd,
	/** integral number separators captured */ NumIntSepEd,
	/** dot captured */ NumDotEd,
	/** fraction numbers captured */ NumFracEd,
	/** fraction number separators captured */ NumFracSepEd,
	/** exponent sign captured */ NumExpSignEd,
	/** exponent numbers captured */ NumExpNumEd,
	/** exponent number separators captured */ NumExpNumSepEd,
	// string literals
	/** single quote string */ SQStr,
	/** triple quotes string */ TQStr,
	/** single quote gstring */ SQGStr,
	/** triple quote gstring */ TQGStr,
	/** slashy gstring */ SGStr,
	/** dollar slashy gstring */ DSGStr,
	/** gstring interpolation inline, $... */ GStrItpInl,
	/** identifier captured */ GStrItpInlIdEd,
	/** dot captured */ GStrItpInlDotEd,
	/** gstring interpolation, ${...} */ GStrItp,
	// block
	/** code block */ CodeBlk,
	/** index block, [], ?[] */ IndexBlk,
	//
	/** generic type */ GenT,
	/** annotation started */ AnnSt,
	// package declaration
	/** keyword package captured, started */ PkgDeclSt,
	/** identifier captured */ PkgDeclIdEd,
	/** dot captured */ PkgDeclDotEd,
	// import declaration
	/** keyword import captured, started */ ImpDeclSt,
	/** keyword static captured */ ImpDeclStaticEd,
	/** identifier captured */ ImpDeclIdEd,
	/** dot captured */ ImpDeclDotEd,
	/** star(asterisk) captured */ ImpDeclStarEd,
	/** as captured */ ImpDeclAsEd,
	/** identifier after as captured */ ImpDeclAsIdEd,
}

export type GroovyAstBuildStateName = Exclude<keyof typeof GroovyAstBuildState, number>;
