import {CommentParsers} from './comment';
import {
	DotParserInstance,
	IdentifierParser,
	SemicolonParserInstance,
	UndeterminedCharParser,
	WsTabNlParsers
} from './common-token';
import {CompilationUnitParser} from './compilation-unit';
import {ImportDeclParser} from './import-decl';
import {NumberParsers} from './number-literal';
import {PackageDeclParser} from './package-decl';
import {GsBraceInterpolationParser, StringParsers} from './string-literal';
import {SynchronizedExpressionParser, TsscmfvDeclParsers} from './tsscmfv';
import {CodeBlockParser} from './tsscmfv/code-block';

const AllParsers = [
	// package declaration
	PackageDeclParser.instance,
	// import declaration
	ImportDeclParser.instance,
	// type, static block, synchronized block, constructor, method, field, variable
	...TsscmfvDeclParsers,
	...CommentParsers,                              // SL comment, ML comment
	...NumberParsers,                               // all numeric literals
	// MUST after comment parsers
	...StringParsers,                               // all string literals
	...WsTabNlParsers,                              // whitespaces, tabs, newline
	DotParserInstance,                              // dot
	SemicolonParserInstance,                        // semicolon
	IdentifierParser.instance,                      // identifier
	UndeterminedCharParser.instance                 // undetermined char
];

class TokenParserInitializer {
	static initialize() {
		CompilationUnitParser.initSelector(AllParsers);
		/** {@link GsBraceInterpolationParser#initSelector} */
		GsBraceInterpolationParser.initSelector(AllParsers);
		/** {@link SynchronizedExpressionParser#initSelector} */
		SynchronizedExpressionParser.initSelector(AllParsers);
		/** {@link CodeBlockParser#initSelector} */
		CodeBlockParser.initSelector(AllParsers);
	}
}

TokenParserInitializer.initialize();
