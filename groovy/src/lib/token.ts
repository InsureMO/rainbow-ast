import {TokenId} from '@rainbow-ast/core';

export enum GroovyTokenId {
	/** first one must be COMPILATION_UNIT, value is 0 */
	COMPILATION_UNIT,
	// primitive types
	BOOLEAN,
	CHAR,
	BYTE,
	SHORT,
	INT,
	LONG,
	FLOAT,
	DOUBLE,
	// groovy keywords
	AS, // G1.0
	DEF, // G1.0
	TRAIT, // G2.3
	THREADSAFE, // G2.4 @ThreadSafe
	// java keywords
	ABSTRACT, // 1.0
	ASSERT, // 1.4
	AT_INTERFACE, // 5
	BREAK, // 1.0
	CASE, // 1.0
	CATCH, // 1.0
	CLASS, // 1.0
	CONST, // reserved, 1.0
	CONTINUE, // 1.0
	DEFAULT, // 1.0
	DO, // 1.0
	ELSE, // 1.0
	ENUM, // 5
	EXTENDS, // 1.0
	FINAL, // 1.0
	FINALLY, // 1.0
	FOR, // 1.0
	GOTO, // reserved, 1.0
	IF, // 1.0
	IMPLEMENTS, // 1.0
	IMPORT, // 1.0
	INTERFACE, // 1.0
	NATIVE, // 1.0
	NEW, // 1.0
	NON_SEALED, // 17
	NULL, // 1.0
	PACKAGE, // 1.0
	PERMITS, // 17
	PRIVATE, // 1.0
	PROTECTED, // 1.0
	PUBLIC, // 1.0
	RECORD, // 16
	RETURN, // 1.0
	SEALED, // 17
	STATIC, // 1.0
	STRICTFP, // 1.2
	SUPER, // 1.0
	SWITCH, // 1.0
	SYNCHRONIZED, // 1.0
	THIS, // 1.0
	THROW, // 1.0
	THROWS, // 1.0
	TRANSIENT, // 1.0
	TRY, // 1.0
	VAR, // 10
	VOID, // 1.0
	VOLATILE, // 1.0
	WHILE, // 1.0
	YIELD, // 14
	// boolean
	BooleanTrue, // true
	BooleanFalse, // false
	// numeric
	Number, // numbers, not octal
	BinaryStartMark, // 0[Bb]...
	OctalStartMark, // 0...
	HexStartMark, // 0[xX]...
	NumExponent, // number, not binary/octal/hex, includes dot or exponent
	NumExponentSign, // +-
	NumSep,
	NumSuffix,
	// string and gstring
	StringMark, // '
	StringMarkML, // '''
	GStringMark, // "
	GStringMarkML, // """
	SlashyGStringMark, // /
	DollarSlashyGStringStartMark, // $/
	DollarSlashyGStringEndMark, // /$
	StringBackspaceEscape, // \b
	StringFormFeedEscape, // \f
	StringNewlineEscape, // \n
	StringCarriageReturnEscape, // \r
	StringTabulationEscape, // \t
	StringBackslashEscape, // \\
	StringSingleQuoteEscape, // \', in string, or optional in multiple string, gstring and multiple line gstring
	StringDoubleQuotesEscape, // \" in gstring, or optional in multiple string and multiple line gstring
	StringDollarEscape, // \$, not for slashy gstring or dollar slashy gstring
	StringOctal, // \ in octal escape
	StringUnicode, // \u in unicode escape
	SlashyGStringSlashEscape, // \/
	DollarSlashyGStringDollarEscape, // $$
	DollarSlashyGStringSlashEscape, // $/
	GStringInterpolationStartMark, // $ of $...
	GStringInterpolationLBraceStartMark, // ${ of ${...}
	GStringInterpolationRBraceEndMark, // } of ${...}
	StringMLNewlineEraser, // \ for multiple lines string/gstring literal, and no character after it, erase the following newline
	// Groovy Operators
	RangeInclusive, // ..
	RangeExclusiveLeft, // <..
	RangeExclusiveRight, // ..<
	RangeExclusiveFull, // <..<
	SpreadDot, // *.
	SafeDot, // ?.
	SafeIndex, // ?[
	SafeIndexClose, // ]
	SafeChainDot, // ??.
	Elvis, // ?:
	MethodPointer, // .&
	MethodReference, // :: // this also supported by java
	RegexFind, // =~
	RegexMatch, // ==~
	Power, // **
	PowerAssign, // **=
	Spaceship, // <=>
	Identical, // ===
	NotIdentical, // !==
	Arrow, // -> // this also supported by java
	In, // G1.0
	NotIn, // !in
	NotInstanceOf, // !instanceof
	// operators
	Assign, // =
	GreaterThan, // >
	LessThan, // <
	Not, // !
	Bitnot, // ~
	Question, // ?
	Colon, // :
	Equal, // ==
	LessThanOrEqual, // <=
	GreaterThanOrEqual, // >=
	NotEqual, // !=
	And, // &&
	Or, // ||
	Increase, // ++
	Decrease, // --
	Add, // +
	Subtract, // -
	Multiple, // *
	Divide, // /
	Bitand, // &
	Bitor, // |
	Xor, // ^
	Mod, // %
	Lshift, // <<
	Rshift, // >>
	Urshift, // >>>
	AddAssign, // +=
	SubtractAssign, // -=
	MultipleAssign, // *=
	DivideAssign, // /=
	BitandAssign, // &=
	BitorAssign, // |=
	XorAssign, // ^=
	ModAssign, // %=
	LshiftAssign, // <<=
	RshiftAssign, // >>=
	UrshiftAssign, // >>>=
	ElvisAssign, // ?=
	Ellipsis, // ...
	InstanceOf, // 1.0
	// separators
	LBrace, // {
	RBrace, // }
	LParen, // (
	RParen, // )
	LBrack, // [
	RBrack, // ]
	Semicolon, // ;
	Comma, // ,
	Dot, // .
	// generic type
	GenericTypeStartMark, // <
	GenericTypeEndMark, // >
	// annotation
	AnnotationStartMark, // @
	// comment
	SLCommentStartMark, // //
	MLCommentStartMark, // /*
	MLCommentEndMark, // */
	// shebang command
	ScriptCommandStartMark, // #!
	// text content
	Whitespaces,
	Tabs,
	Newline, // \n or \r\n
	Identifier,
	UndeterminedChar,
	Word,
	// block
	// script command
	ScriptCommand,
	// comment
	SLComment,
	MLComment,
	// numeric
	BinaryLiteral,
	OctalLiteral,
	IntegralLiteral,
	HexadecimalLiteral,
	DecimalLiteral,
	// string
	StringLiteral,
	GStringLiteral,
	SlashyGStringLiteral,
	DollarSlashyGStringLiteral,
	GStringInterpolation,
	// block
	CodeBlock,  // TODO
	IndexBlock,
	//
	GenericTypeDecl,  // TODO
	AnnotationDecl,  // TODO
	ImportDecl,  // TODO
	/**
	 * started by keyword "package"
	 * 1. pattern: identifier[ dot identifier [dot identifier [...]]],
	 * 2. whitespaces, tabs, ml comment is allowed,
	 * 3. keywords "as", "def", "var", "record", "sealed", "permits", "yield", "in", "trait" are treated as identifier,
	 * 4. newline is not allowed,
	 */
	PackageDecl,
}

export type GroovyTokenName = Exclude<keyof typeof GroovyTokenId, number>;

// following is preparing for code mirror
interface Token {
	id: TokenId;
	name: string;
	top?: boolean;
}

export type GroovyTokenRecord = { [key in GroovyTokenName]: Token };
// key of enumeration is, according to typescript standard:
// - explicit declared keys,
// - and value of them.
// noinspection JSUnusedGlobalSymbols
export const GroovyToken: Readonly<GroovyTokenRecord> = Object.keys(GroovyTokenId).reduce((ret, key) => {
	if ('0123456789'.includes(`${key}`[0])) {
		// keys are indexes and names
		// ignore index keys and temporary token keys
		return ret;
	}
	ret[key] = {id: GroovyTokenId[key], name: key};
	if (ret[key].id === GroovyTokenId.COMPILATION_UNIT) {
		ret[key].top = true;
	}
	return ret;
}, {} as GroovyTokenRecord);
