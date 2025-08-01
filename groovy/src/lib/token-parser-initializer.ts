import {CommentParsers} from './comment';
import {
	DotParserInstance,
	IdentifierParser,
	SemicolonParserInstance,
	TypeDeclNameParser,
	UndeterminedCharParser,
	WsTabNlParsers
} from './common-token';
import {CompilationUnitParser} from './compilation-unit';
import {ImportDeclParser} from './import-decl';
import {TsscmfvKeywordParsers, TsscmfvModifierKeywordParser, TypeKeywordParser, TypeKeywordParsers} from './keyword';
import {NumberParsers} from './number-literal';
import {PackageDeclParser} from './package-decl';
import {GsBraceInterpolationParser, StringParsers} from './string-literal';

const CommonParsers = [
	// package declaration
	PackageDeclParser.instance,
	// import declaration
	ImportDeclParser.instance,
	// type, static block, synchronized block, constructor, method, field, variable
	TsscmfvKeywordParsers,
	TypeKeywordParsers,                             // type: @interface, class, enum, interface, record, trait
	CommentParsers,                                 // SL comment, ML comment
	WsTabNlParsers,                                 // whitespaces, tabs, newline
	NumberParsers,                                  // all numeric literals
	StringParsers,                                  // all string literals
	DotParserInstance,                              // dot
	SemicolonParserInstance,                        // semicolon
	IdentifierParser.instance,                      // identifier
	UndeterminedCharParser.instance                 // undetermined char
];
const WrappableStatementParsers = [
	CommentParsers,
	WsTabNlParsers,
	SemicolonParserInstance
];

class TokenParserInitializer {
	static selectors() {
		CompilationUnitParser.initSelector(CommonParsers);
		/** {@link GsBraceInterpolationParser#initSelector} */
		GsBraceInterpolationParser.initSelector(CommonParsers);
		/** {@link TsscmfvModifierKeywordParser#initSelector} */
		TsscmfvModifierKeywordParser.initSelector([
			...TsscmfvKeywordParsers,
			...TypeKeywordParsers,
			...WrappableStatementParsers
		]);
		/** {@link TypeKeywordParser#initSelectors} */
		TypeKeywordParser.initSelectors({
			init: [
				// name in front of keyword, therefore the contextual keyword "record" and "trait" will be collected as type name.
				TypeDeclNameParser.instance,
				...TypeKeywordParsers,
				...WrappableStatementParsers
			],
			afterName: [
				TypeDeclNameParser.instance,
				...WrappableStatementParsers
			]
		});
	}
}

TokenParserInitializer.selectors();
