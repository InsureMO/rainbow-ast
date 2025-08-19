import {syntaxTree} from '@codemirror/language';
import {EditorState, Range} from '@codemirror/state';
import {Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate} from '@codemirror/view';
import {SyntaxNodeRef} from '@lezer/common';
import {Token} from '@rainbow-ast/core';
import {GroovyTokenId} from '@rainbow-ast/groovy';
import {GroovyFacet, GroovyFacetDocument} from './facet';

// noinspection JSUnusedGlobalSymbols
export enum DecorationMarkTypes {
	NONE = 'none',
	SYMBOL = 'symbol',
	PRIMITIVE = 'primitive',
	KEYWORD = 'keyword',
	LITERAL = 'literal',
	LITERAL_MARK = 'literal-mark',
	STR_ESCAPE = 'str-esc',
	OPERATOR = 'operator',
	IDENTIFIER = 'identifier',
	WORD_OR_CHAR = 'woc',
	BLOCK_SE = 'block-se'
}

const DMT = DecorationMarkTypes;

const mark = (type: DecorationMarkTypes, name: string): Decoration => {
	if (type === DMT.NONE) {
		return Decoration.mark({class: `gt-${name}`});
	} else {
		return Decoration.mark({class: `gt-${type} gt-${type}-${name}`});
	}
};
const markNone = (name: string) => Decoration.mark({class: `gt-${name}`});
const markSym = (name: string) => mark(DMT.SYMBOL, name);
const markPt = (name: string) => mark(DMT.PRIMITIVE, name);
const markKw = (name: string) => mark(DMT.KEYWORD, name);
const markResvdKw = (name: string) => Decoration.mark({class: `gt-${DMT.KEYWORD} gt-${DMT.KEYWORD}-reserved gt-${DMT.KEYWORD}-${name}`});
const markLit = (name: string) => mark(DMT.LITERAL, name);
const markLitM = (name: string) => mark(DMT.LITERAL_MARK, name);
const markStrE = (name: string) => mark(DMT.STR_ESCAPE, name);
const markOp = (name: string) => mark(DMT.OPERATOR, name);
const markId = (name: string) => mark(DMT.IDENTIFIER, name);
const markWoc = (name: string) => mark(DMT.WORD_OR_CHAR, name);
const markBlockSE = (name: string) => mark(DMT.BLOCK_SE, name);

const markCmtSym = (name: string) => Decoration.mark({class: `gt-cmt gt-${DMT.SYMBOL} gt-${DMT.SYMBOL}-${name}`});
const markCmtWoc = (name: string) => Decoration.mark({class: `gt-cmt gt-${DMT.WORD_OR_CHAR} gt-${DMT.WORD_OR_CHAR}-${name}`});
const markStrSym = (name: string) => Decoration.mark({class: `gt-sl gt-${DMT.SYMBOL} gt-${DMT.SYMBOL}-${name}`});
const markStrWoc = (name: string) => Decoration.mark({class: `gt-sl gt-${DMT.WORD_OR_CHAR} gt-${DMT.WORD_OR_CHAR}-${name}`});

export const SyntaxNodeDecorations: Record<string, Decoration> = {
	// whitespace, tabs and newline
	Whitespaces: markNone('ws'),
	Tabs: markNone('tab'),
	Newline: markNone('nl'),
	// bracket
	LBrace: markBlockSE('lbrace'),
	RBrace: markBlockSE('rbrace'),
	LBrack: markBlockSE('lbrack'),
	RBrack: markBlockSE('rbrack'),
	LParen: markBlockSE('lparen'),
	RParen: markBlockSE('rparen'),
	LAngle: markBlockSE('langle'),
	RAngle: markBlockSE('rangle'),
	// symbol
	/** / */ Slash: markSym('slash'),
	/** \ */ Backslash: markSym('backslash'),
	/** ~ */ Tilde: markSym('tilde'),
	/** @ */ At: markSym('at'),
	/** # */ Hash: markSym('hash'),
	/** $ */ Dollar: markSym('dollar'),
	/** % */ Percent: markSym('percent'),
	/** ^ */ Exponent: markSym('exponent'),
	/** & */ Ampersand: markSym('ampersand'),
	/** * */ Asterisk: markSym('asterisk'),
	/** ?, S means symbol, to avoid duplication with the "Question" in the operators */ QuestionS: markSym('question'),
	/** - */ Minus: markSym('minus'),
	/** + */ Plus: markSym('plus'),
	/** =, S means symbol, to avoid duplication with the "Equal(==)" in the operators */ EqualS: markSym('equal'),
	/** _ */ Underscore: markSym('underscore'),
	/** | */ Pipe: markSym('pipe'),
	/** ' */ Quote: markSym('quote'),
	/** " */ DblQuote: markSym('dbl-quote'),
	/** ` */ BackQuote: markSym('backquote'),
	/** . */ Dot: markSym('dot'),
	/** , */ Comma: markSym('comma'),
	/** :, S means symbol, to avoid duplication with the "Colon" in the operators  */ ColonS: markSym('colon'),
	/** ; */ Semicolon: markSym('semicolon'),
	// literal
	// number literal
	/** 0B, 0b */ BinaryStartMark: markLitM('bin-st'),
	/** 0 */ OctalStartMark: markLitM('oct-st'),
	/** 0X, 0x */ HexadecimalStartMark: markLitM('hex-st'),
	/** 0-9, a-f, A-F, continuous. allowed number depends on radix (binary, octal, integral and hexadecimal) */ Numbers: markLit('num'),
	/** _, continuous */ NumberSeparators: markLit('num-sep'),
	/** . */ NumberDecimalPoint: markLit('num-dot'),
	/** Ee */ NumberExponentStartMark: markLitM('exp-st'),
	/** +- */ NumberExponentSign: markLitM('exp-sig'),
	/** IiLlFfDdGg */ NumberSuffix: markLitM('exp-sfx'),
	// string literal
	/** single quote string literal mark */ SsqSLMark: markLitM('sqs-se'),
	/** triple quotes string literal mark */ TsqSLMark: markLitM('tqs-se'),
	/** single double-quotes gstring literal mark */ SdqGsLMark: markLitM('sdqgs-se'),
	/** triple double-quotes gstring literal mark */ TdqGsLMark: markLitM('tdqgs-se'),
	/** slashy gstring literal mark */ SGsLMark: markLitM('sgs-se'),
	/** dollar slashy gstring literal start mark */ DsGsLStartMark: markLitM('dsgs-st'),
	/** dollar slashy gstring literal end mark */ DsGsLEndMark: markLitM('dsgs-ed'),
	/** \b */ BackspaceEscape: markStrE('backspace'),
	/** \f */ FormFeedEscape: markStrE('form-feed'),
	/** \n */ NewlineEscape: markStrE('nl'),
	/** \r */ CarriageReturnEscape: markStrE('cr'),
	/** \t */ TabulationEscape: markStrE('tab'),
	/** \\ */ BackslashEscape: markStrE('backslash'),
	/** \' */ SingleQuoteEscape: markStrE('quote'),
	/** \" */ DoubleQuotesEscape: markStrE('dbl-quote'),
	/** \$ for all quote string literals, $$ for slashy dollar gstring literal */ DollarEscape: markStrE('dollar'),
	/** \/ for slashy gstring literals, $/ for slashy dollar gstring literal */ SlashEscape: markStrE('slash'),
	/** \ */ OctalEscapeStartMark: markStrE('oct-st'),
	OctalEscapeContent: markStrE('oct-content'),
	/** \u */ UnicodeEscapeStartMark: markStrE('uni-st'),
	UnicodeEscapeContent: markStrE('uni-content'),
	/** incorrect escape of string literal, incorrect unicode escape is not included */ BadEscape: markStrE('bad'),
	/** newline eraser for multiple-lines string/gstring */ MLSNewlineEraser: markStrE('nl-eraser'),
	/** gstring interpolation start mark, $ */ GsiStartMark: markLitM('gsi-st'),
	/** gstring interpolation start mark, ${ */ GsiBraceStartMark: markLitM('gsi-brace-st'),
	/** gstring interpolation end mark, } */ GsiBraceEndMark: markLitM('gsi-brace-ed'),
	// boolean literal
	True: markLit('true'),
	False: markLit('false'),
	// primitive types
	BOOLEAN: markPt('bool'),
	CHAR: markPt('char'),
	BYTE: markPt('byte'),
	SHORT: markPt('short'),
	INT: markPt('int'),
	LONG: markPt('long'),
	FLOAT: markPt('float'),
	DOUBLE: markPt('double'),
	// groovy keywords
	/** G1.0 */ AS: markKw('as'),
	/** G1.0 */ DEF: markKw('def'),
	/** G2.3 */ TRAIT: markKw('trait'),
	/** reserved, threadsafe */ THREADSAFE: markResvdKw('threadsafe'),
	// java keywords
	/** 1.0 */ ABSTRACT: markKw('abstract'),
	/** 1.4 */ ASSERT: markKw('assert'),
	/** 5 @interface */ AT_INTERFACE: markKw('at-interface'),
	/** 1.0 */ BREAK: markKw('break'),
	/** 1.0 */ CASE: markKw('case'),
	/** 1.0 */ CATCH: markKw('catch'),
	/** 1.0 */ CLASS: markKw('class'),
	/** reserved, 1.0 */ CONST: markResvdKw('const'),
	/** 1.0 */ CONTINUE: markKw('continue'),
	/** 1.0 */ DEFAULT: markKw('default'),
	/** 1.0 */ DO: markKw('do'),
	/** 1.0 */ ELSE: markKw('else'),
	/** 5 */ ENUM: markKw('enum'),
	/** 1.0 */ EXTENDS: markKw('extends'),
	/** 1.0 */ FINAL: markKw('final'),
	/** 1.0 */ FINALLY: markKw('finally'),
	/** 1.0 */ FOR: markKw('for'),
	/** reserved, 1.0 */ GOTO: markResvdKw('goto'),
	/** 1.0 */ IF: markKw('if'),
	/** 1.0 */ IMPLEMENTS: markKw('implements'),
	/** 1.0 */ IMPORT: markKw('import'),
	/** 1.0 */ INTERFACE: markKw('interface'),
	/** 1.0 */ NATIVE: markKw('native'),
	/** 1.0 */ NEW: markKw('new'),
	/** 17, non-sealed */ NON_SEALED: markKw('non-sealed'),
	/** 1.0 */ NULL: markKw('null'),
	/** 1.0 */ PACKAGE: markKw('package'),
	/** 15 */ PERMITS: markKw('permits'),
	/** 1.0 */ PRIVATE: markKw('private'),
	/** 1.0 */ PROTECTED: markKw('protected'),
	/** 1.0 */ PUBLIC: markKw('public'),
	/** 16 */ RECORD: markKw('record'),
	/** 1.0 */ RETURN: markKw('return'),
	/** 15 */ SEALED: markKw('sealed'),
	/** 1.0 */ STATIC: markKw('static'),
	/** 1.2 */ STRICTFP: markKw('strictfp'),
	/** 1.0 */ SUPER: markKw('super'),
	/** 1.0 */ SWITCH: markKw('switch'),
	/** 1.0 */ SYNCHRONIZED: markKw('synchronized'),
	/** 1.0 */ THIS: markKw('this'),
	/** 1.0 */ THROW: markKw('throw'),
	/** 1.0 */ THROWS: markKw('throws'),
	/** 1.0 */ TRANSIENT: markKw('transient'),
	/** 1.0 */ TRY: markKw('try'),
	/** 10 */ VAR: markKw('var'),
	/** 1.0 */ VOID: markKw('void'),
	/** 1.0 */ VOLATILE: markKw('volatile'),
	/** 1.0 */ WHILE: markKw('while'),
	/** 14 */ YIELD: markKw('yield'),
	// DO NOT change the order of groovy and java operators, value compare is part of logic.
	// Groovy Operators
	/** .. */ RangeInclusive: markOp('range-incl'),
	/** <.. */ RangeExclusiveLeft: markOp('range-excl-l'),
	/** ..< */ RangeExclusiveRight: markOp('range-excl-r'),
	/** <..< */ RangeExclusiveFull: markOp('range-excl-f'),
	/** *. */ SpreadDot: markOp('spread-dot'),
	/** ?. */ SafeDot: markOp('safe-dot'),
	/** ?[ */ SafeIndex: markOp('safe-idx-st'),
	/** ] */ SafeIndexClose: markOp('safe-idx-ed'),
	/** ??. */ SafeChainDot: markOp('safe-chain-dot'),
	/** ?: */ Elvis: markOp('elvis'),
	/** .& */ MethodPointer: markOp('method-pointer'),
	/** ::, also supported by java */ MethodReference: markOp('method-ref'),
	/** =~ */ RegexFind: markOp('regex-find'),
	/** ==~ */ RegexMatch: markOp('regex-match'),
	/** ** */ Power: markOp('power'),
	/** **= */ PowerAssign: markOp('power-assign'),
	/** <=> */ Spaceship: markOp('spaceship'),
	/** === */ Identical: markOp('identical'),
	/** !== */ NotIdentical: markOp('not-identical'),
	/** ->, also supported by java, lambda */ Arrow: markOp('arrow'),
	/** G1.0 */ In: markOp('in'),
	/** !in */ NotIn: markOp('notin'),
	/** !instanceof */ NotInstanceOf: markOp('not-instanceof'),
	// Java Operators
	/** = */ Assign: markOp('assign'),
	/** > */ GreaterThan: markOp('gt'),
	/** < */ LessThan: markOp('lt'),
	/** ! */ Not: markOp('not'),
	/** ~ */ Bitnot: markOp('bitnot'),
	/** ? */ Question: markOp('question'),
	/** : */ Colon: markOp('colon'),
	/** == */ Equal: markOp('equal'),
	/** <= */ LessThanOrEqual: markOp('lte'),
	/** >= */ GreaterThanOrEqual: markOp('gte'),
	/** != */ NotEqual: markOp('not-equal'),
	/** && */ And: markOp('and'),
	/** || */ Or: markOp('or'),
	/** ++ */ Increase: markOp('increase'),
	/** -- */ Decrease: markOp('decrease'),
	/** + */ Add: markOp('add'),
	/** - */ Subtract: markOp('subtract'),
	/** * */ Multiple: markOp('multiple'),
	/** / */ Divide: markOp('divide'),
	/** & */ Bitand: markOp('bitand'),
	/** | */ Bitor: markOp('bitor'),
	/** ^ */ Xor: markOp('xor'),
	/** % */ Mod: markOp('mod'),
	/** << */ Lshift: markOp('lshift'),
	/** >> */ Rshift: markOp('rshift'),
	/** >>> */ Urshift: markOp('urshift'),
	/** += */ AddAssign: markOp('add-assign'),
	/** -= */ SubtractAssign: markOp('subtract-assign'),
	/** *= */ MultipleAssign: markOp('multiple-assign'),
	/** /= */ DivideAssign: markOp('divide-assign'),
	/** &= */ BitandAssign: markOp('bitand-assign'),
	/** |= */ BitorAssign: markOp('bitor-assign'),
	/** ^= */ XorAssign: markOp('xor-assign'),
	/** %= */ ModAssign: markOp('mod-assign'),
	/** <<= */ LshiftAssign: markOp('lshift-assign'),
	/** >>= */ RshiftAssign: markOp('rshift-assign'),
	/** >>>= */ UrshiftAssign: markOp('urshift-assign'),
	/** ?= */ ElvisAssign: markOp('elvis-assign'),
	/** ... */ Ellipsis: markOp('ellipsis'),
	/** 1.0 */ InstanceOf: markOp('instanceof'),
	// chars
	Identifier: markId('identifier'),
	Word: markWoc('word'),
	UndeterminedChar: markWoc('udc')
};
export const CommentNodeDecorations: Record<string, Decoration> = {
	// bracket
	LBrace: markCmtSym('lbrace'),
	RBrace: markCmtSym('rbrace'),
	LBrack: markCmtSym('lbrack'),
	RBrack: markCmtSym('rbrack'),
	LParen: markCmtSym('lparen'),
	RParen: markCmtSym('rparen'),
	LAngle: markCmtSym('langle'),
	RAngle: markCmtSym('rangle'),
	// symbol
	/** / */ Slash: markCmtSym('slash'),
	/** \ */ Backslash: markCmtSym('backslash'),
	/** ~ */ Tilde: markCmtSym('tilde'),
	/** @ */ At: markCmtSym('at'),
	/** # */ Hash: markCmtSym('hash'),
	/** $ */ Dollar: markCmtSym('dollar'),
	/** % */ Percent: markCmtSym('percent'),
	/** ^ */ Exponent: markCmtSym('exponent'),
	/** & */ Ampersand: markCmtSym('ampersand'),
	/** * */ Asterisk: markCmtSym('asterisk'),
	/** ?, S means symbol, to avoid duplication with the "Question" in the operators */ QuestionS: markCmtSym('question'),
	/** - */ Minus: markCmtSym('minus'),
	/** + */ Plus: markCmtSym('plus'),
	/** =, S means symbol, to avoid duplication with the "Equal(==)" in the operators */ EqualS: markCmtSym('equal'),
	/** _ */ Underscore: markCmtSym('underscore'),
	/** | */ Pipe: markCmtSym('pipe'),
	/** ' */ Quote: markCmtSym('quote'),
	/** " */ DblQuote: markCmtSym('dbl-quote'),
	/** ` */ BackQuote: markCmtSym('backquote'),
	/** . */ Dot: markCmtSym('dot'),
	/** , */ Comma: markCmtSym('comma'),
	/** :, S means symbol, to avoid duplication with the "Colon" in the operators  */ ColonS: markCmtSym('colon'),
	/** ; */ Semicolon: markCmtSym('semicolon'),
	Word: markCmtWoc('word'),
	UndeterminedChar: markCmtWoc('udc')
};
export const StrNodeDecorations: Record<string, Decoration> = {
	// bracket
	LBrace: markStrSym('lbrace'),
	RBrace: markStrSym('rbrace'),
	LBrack: markStrSym('lbrack'),
	RBrack: markStrSym('rbrack'),
	LParen: markStrSym('lparen'),
	RParen: markStrSym('rparen'),
	LAngle: markStrSym('langle'),
	RAngle: markStrSym('rangle'),
	// symbol
	/** / */ Slash: markStrSym('slash'),
	/** \ */ Backslash: markStrSym('backslash'),
	/** ~ */ Tilde: markStrSym('tilde'),
	/** @ */ At: markStrSym('at'),
	/** # */ Hash: markStrSym('hash'),
	/** $ */ Dollar: markStrSym('dollar'),
	/** % */ Percent: markStrSym('percent'),
	/** ^ */ Exponent: markStrSym('exponent'),
	/** & */ Ampersand: markStrSym('ampersand'),
	/** * */ Asterisk: markStrSym('asterisk'),
	/** ?, S means symbol, to avoid duplication with the "Question" in the operators */ QuestionS: markStrSym('question'),
	/** - */ Minus: markStrSym('minus'),
	/** + */ Plus: markStrSym('plus'),
	/** =, S means symbol, to avoid duplication with the "Equal(==)" in the operators */ EqualS: markStrSym('equal'),
	/** _ */ Underscore: markStrSym('underscore'),
	/** | */ Pipe: markStrSym('pipe'),
	/** ' */ Quote: markStrSym('quote'),
	/** " */ DblQuote: markStrSym('dbl-quote'),
	/** ` */ BackQuote: markStrSym('backquote'),
	/** . */ Dot: markStrSym('dot'),
	/** , */ Comma: markStrSym('comma'),
	/** :, S means symbol, to avoid duplication with the "Colon" in the operators  */ ColonS: markStrSym('colon'),
	/** ; */ Semicolon: markStrSym('semicolon'),
	Word: markStrWoc('word'),
	UndeterminedChar: markStrWoc('udc')
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GroovyDecorationOptions {
}

export class GroovyDecoration {
	private readonly _options: GroovyDecorationOptions;

	constructor(options?: GroovyDecorationOptions) {
		this._options = {...(options ?? {})};
	}

	private tokenNameToId(name: string): GroovyTokenId {
		return GroovyTokenId[name];
	}

	private isBracket(tokenId: GroovyTokenId): boolean {
		return (tokenId >= GroovyTokenId.LBrace && tokenId <= GroovyTokenId.RAngle)
			|| [
				GroovyTokenId.GsiBraceStartMark, GroovyTokenId.GsiBraceEndMark,
				GroovyTokenId.SafeIndex, GroovyTokenId.SafeIndexClose
			].includes(tokenId);
	}

	private decorateSymbolOrWordOrChar(ref: SyntaxNodeRef, state: EditorState, document: GroovyFacetDocument, mark: Decoration, token?: Token): Array<Range<Decoration>> {
		token = token ?? document.findToken(ref, state);
		const parent = token.parent;
		const parentTokenId = parent.id;
		if ([GroovyTokenId.Shebang, GroovyTokenId.SLComment, GroovyTokenId.MLComment].includes(parentTokenId)) {
			return [CommentNodeDecorations[ref.name].range(ref.from, ref.to)];
		} else if ([
			GroovyTokenId.SsqSLiteral, GroovyTokenId.TsqSLiteral,
			GroovyTokenId.SdqGsLiteral, GroovyTokenId.TdqGsLiteral,
			GroovyTokenId.SGsLiteral, GroovyTokenId.DsGsLiteral
		].includes(parentTokenId)) {
			return [StrNodeDecorations[ref.name].range(ref.from, ref.to)];
		} else {
			return [mark.range(ref.from, ref.to)];
		}
	}

	private decorateBracket(ref: SyntaxNodeRef, state: EditorState, document: GroovyFacetDocument, mark: Decoration): Array<Range<Decoration>> {
		const token = document.findToken(ref, state);
		const parent = token.parent;
		const parentTokenId = parent.id;
		if ([
			GroovyTokenId.Shebang, GroovyTokenId.SLComment, GroovyTokenId.MLComment,
			GroovyTokenId.SsqSLiteral, GroovyTokenId.TsqSLiteral,
			GroovyTokenId.SdqGsLiteral, GroovyTokenId.TdqGsLiteral,
			GroovyTokenId.SGsLiteral, GroovyTokenId.DsGsLiteral
		].includes(parentTokenId)) {
			return this.decorateSymbolOrWordOrChar(ref, state, document, mark, token);
		}

		return [mark.range(ref.from, ref.to)];
	}

	private isSymbolOrWordOrChar(tokenId: GroovyTokenId): boolean {
		return (tokenId >= GroovyTokenId.Slash && tokenId <= GroovyTokenId.Semicolon)
			|| [GroovyTokenId.Word, GroovyTokenId.UndeterminedChar].includes(tokenId);
	}

	private decorateNode(node: SyntaxNodeRef, state: EditorState, document: GroovyFacetDocument): Array<Range<Decoration>> {
		const name = node.name;
		const tokenId = this.tokenNameToId(name);
		if (this.isBracket(tokenId)) {
			return this.decorateBracket(node, state, document, SyntaxNodeDecorations[name]);
		} else if (this.isSymbolOrWordOrChar(tokenId)) {
			return this.decorateSymbolOrWordOrChar(node, state, document, SyntaxNodeDecorations[name]);
		} else {
			const mark = SyntaxNodeDecorations[name];
			return mark == null ? [] : [mark.range(node.from, node.to)];
		}
	}

	decorate(view: EditorView): DecorationSet {
		const rangedDecorations: Array<Range<Decoration>> = [];

		for (const {from, to} of view.visibleRanges) {
			const config = view.state.facet(GroovyFacet);
			syntaxTree(view.state).iterate({
				from, to,
				enter: (node) => {
					const decorations = this.decorateNode(node, view.state, config.document);
					if (decorations != null && decorations.length !== 0) {
						rangedDecorations.push(...decorations);
					}
				}
			});
		}
		try {
			return Decoration.set(rangedDecorations, true);
		} catch (e) {
			console.error(e);
			return Decoration.set([]);
		}
	}
}

export const GroovyDecorationPlugin = (options?: GroovyDecorationOptions) => {
	const decoration = new GroovyDecoration(options);
	const decorate = (view: EditorView): DecorationSet => {
		return decoration.decorate(view);
	};
	return ViewPlugin.fromClass(class {
		decorations: DecorationSet;

		constructor(view: EditorView) {
			this.decorations = decorate(view);
		}

		update(update: ViewUpdate) {
			if (update.docChanged || update.viewportChanged || syntaxTree(update.startState) != syntaxTree(update.state)) {
				this.decorations = decorate(update.view);
			}
		}
	}, {decorations: v => v.decorations});
};
