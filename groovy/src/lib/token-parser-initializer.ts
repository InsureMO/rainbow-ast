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
import {GenericTypeDeclParser} from './generic-type';
import {ImportDeclParser} from './import-decl';
import {
	AsTypeDeclParser,
	CatchExpressionParser,
	ControlFlowParsers,
	StandaloneKeywordParsers,
	SwitchBodyParser,
	SwitchCaseParser,
	SwitchDefaultParser,
	SwitchExpressionParser,
	TryCatchFinallyBodyParser,
	TryExpressionParser
} from './keyword';
import {NumberParsers} from './number-literal';
import {PackageDeclParser} from './package-decl';
import {GsBraceInterpolationParser, StringParsers} from './string-literal';
import {
	CodeBlockParser,
	MethodParametersParser,
	RecordParametersParser,
	SynchronizedExpressionParser,
	TsscmfvDeclParsers,
	TsscmfvFieldOrVariableParser,
	TypeBodyParser
} from './tsscmfv';

const AllParsers = [
	PackageDeclParser.instance,                     // package declaration
	ImportDeclParser.instance,                      // import declaration
	StandaloneKeywordParsers,                       // standalone keywords
	AnnotationDeclParser.instance,                  // annotation declaration
	...TsscmfvDeclParsers,                          // type, static block, synchronized block, constructor, method, field, variable
	...ControlFlowParsers,                   // control flow, if-else/do-while/for/switch-case
	AsTypeDeclParser.instance,                      // as type
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
		TypeBodyParser.initSelector(AllParsers);
		TsscmfvFieldOrVariableParser.initSelector([/* TODO Expression parser? */]);
		AnnotationParametersParser.initSelector(AllParsers);
		GenericTypeDeclParser.initSelector(AllParsers);
		// switch-case
		SwitchExpressionParser.initSelector(AllParsers);
		SwitchBodyParser.initSelector(AllParsers);
		const SwitchCaseSubParsers = AllParsers.filter(p => p !== SwitchCaseParser.instance);
		SwitchCaseParser.initSelector(SwitchCaseSubParsers);
		SwitchDefaultParser.initSelector(SwitchCaseSubParsers);
		// try-catch-finally
		TryExpressionParser.initSelector(AllParsers);
		CatchExpressionParser.initSelector(AllParsers);
		TryCatchFinallyBodyParser.initSelector(AllParsers);
	}
}

TokenParserInitializer.initialize();
