export enum GroovyTokenId {
	CompilationUnit,
	// whitespace, tabs and newline
	Whitespaces,
	Tabs,
	Newline,
	// bracket
	LBrace,
	RBrace,
	LBrack,
	RBrack,
	LParen,
	RParen,
	LAngle,
	RAngle,
	// symbol
	Slash,
	Backslash,
	Tilde,
	At,
	Hash,
	Dollar,
	Percent,
	Exponent,
	And,
	Asterisk,
	Question,
	Minus,
	Plus,
	Equal,
	Underscore,
	Pipe,
	Quote,
	DblQuote,
	BackQuote,
	Dot,
	Comma,
	Colon,
	Semicolon,
	// chars
	Word,
	UndeterminedChar,
	// shebang
	Shebang,
	ShebangStartMark,
	// comment
	SLComment,
	SLCommentStartMark,
	MLComment,
	MLCommentStartMark,
	MLCommentEndMark,
}

export const T = GroovyTokenId;
