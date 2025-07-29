import {CommentParsers} from './comment';
import {DotParserInstance, IdentifierParser, UndeterminedCharParser, WsTabNlParsers} from './common-token';
import {CompilationUnitParser} from './compilation-unit';
import {NumberParsers} from './number-literal';
import {PackageDeclParser} from './package-decl';
import {GsBraceInterpolationParser, StringParsers} from './string-literal';

const CommonParsers = [
	PackageDeclParser.instance,
	CommentParsers,
	WsTabNlParsers,
	NumberParsers,
	StringParsers,
	DotParserInstance,
	IdentifierParser.instance,
	UndeterminedCharParser.instance
];

CompilationUnitParser.initSelector(CommonParsers);
/** {@link GsBraceInterpolationParser#initSelector} */
GsBraceInterpolationParser.initSelector(CommonParsers);
