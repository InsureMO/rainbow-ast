import {AnnotationDeclParser, AnnotationParametersParser} from './annotation';
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
import {GenericTypeParser} from './generic-type';
import {ImportDeclParser} from './import-decl';
import {NumberParsers} from './number-literal';
import {PackageDeclParser} from './package-decl';
import {GsBraceInterpolationParser, StringParsers} from './string-literal';
import {
	CodeBlockParser,
	MethodParametersParser,
	RecordParametersParser,
	SynchronizedExpressionParser,
	TsscmfvDeclParsers,
	TsscmfvFieldOrVariableParser
} from './tsscmfv';

const AllParsers = [
	PackageDeclParser.instance,                     // package declaration
	ImportDeclParser.instance,                      // import declaration
	AnnotationDeclParser.instance,                  // annotation declaration
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
		RecordParametersParser.initSelector(AllParsers);
		MethodParametersParser.initSelector(AllParsers);
		CodeBlockParser.initSelector(AllParsers);
		TsscmfvFieldOrVariableParser.initSelector([/* TODO Expression parser? */]);
		AnnotationParametersParser.initSelector(AllParsers);
		GenericTypeParser.initSelector(AllParsers);
	}
}

TokenParserInitializer.initialize();
