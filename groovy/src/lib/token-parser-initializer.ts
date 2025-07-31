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
	PackageDeclParser.instance,
	ImportDeclParser.instance,
	TsscmfvKeywordParsers,
	CommentParsers,
	WsTabNlParsers,
	NumberParsers,
	StringParsers,
	DotParserInstance,
	SemicolonParserInstance,
	IdentifierParser.instance,
	UndeterminedCharParser.instance
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
			WsTabNlParsers,
			SemicolonParserInstance
		]);
		/** {@link TypeKeywordParser#initSelectors} */
		TypeKeywordParser.initSelectors({
			init: [
				// name in front of keyword, therefore the contextual keyword "record" and "trait" will be collected as type name.
				TypeDeclNameParser.instance,
				...TypeKeywordParsers,
				WsTabNlParsers,
				SemicolonParserInstance
			],
			afterName: [
				TypeDeclNameParser.instance,
				WsTabNlParsers,
				SemicolonParserInstance
			]
		});
	}
}

TokenParserInitializer.selectors();
