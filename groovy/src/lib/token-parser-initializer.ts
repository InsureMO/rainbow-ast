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

const CommonParsers = [
	PackageDeclParser.instance,
	ImportDeclParser.instance,
	CommentParsers,
	WsTabNlParsers,
	NumberParsers,
	StringParsers,
	DotParserInstance,
	SemicolonParserInstance,
	IdentifierParser.instance,
	UndeterminedCharParser.instance
];

CompilationUnitParser.initSelector(CommonParsers);
/** {@link GsBraceInterpolationParser#initSelector} */
GsBraceInterpolationParser.initSelector(CommonParsers);
