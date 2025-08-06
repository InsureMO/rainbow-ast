import {CommentParsers} from './comment';
import {
	CommaParserInstance,
	DotParserInstance,
	IdentifierParser,
	OperatorParsers,
	SemicolonParserInstance,
	UndeterminedCharParser,
	WsTabNlParsers
} from './common-token';
import {CompilationUnitParser} from './compilation-unit';
import {ImportDeclParser} from './import-decl';
import {NumberParsers} from './number-literal';
import {PackageDeclParser} from './package-decl';
import {GsBraceInterpolationParser, StringParsers} from './string-literal';
import {CodeBlockParser, MethodParametersParser, SynchronizedExpressionParser, TsscmfvDeclParsers} from './tsscmfv';

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
	...OperatorParsers,                             // operators
	DotParserInstance,                              // dot
	CommaParserInstance,                            // comma
	SemicolonParserInstance,                        // semicolon
	IdentifierParser.instance,                      // identifier
	UndeterminedCharParser.instance                 // undetermined char
];

class TokenParserInitializer {
	static initialize() {
		CompilationUnitParser.initSelector(AllParsers);
		GsBraceInterpolationParser.initSelector(AllParsers);
		SynchronizedExpressionParser.initSelector(AllParsers);
		MethodParametersParser.initSelector(AllParsers);
		CodeBlockParser.initSelector(AllParsers);
	}
}

TokenParserInitializer.initialize();
