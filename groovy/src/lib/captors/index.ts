import {CharsCaptorDefs} from './chars';
import {DeclCaptorDefs} from './decl';
import {DotCommaSemicolonCaptorDefs} from './dot-comma-semi';
import {IdentifierCaptorDefs} from './identifier';
import {KeywordCaptorDefs} from './keywords';
import {LiteralCaptorDefs} from './literal';
import {OperatorCaptorDefs} from './operators';
import {PrimitiveTypeCaptorDefs} from './primitive-types';
import {GroovyTokenCaptorDefs} from './types';
import {WhitespaceTabNewlineCaptorDefs} from './whitespace-tab-newline';

export * from './types';
export * from './utils';

export const TokenCaptorDefs: ReadonlyArray<GroovyTokenCaptorDefs> = [
	...LiteralCaptorDefs,

	DotCommaSemicolonCaptorDefs,
	WhitespaceTabNewlineCaptorDefs,

	OperatorCaptorDefs,

	PrimitiveTypeCaptorDefs,
	CharsCaptorDefs,
	...KeywordCaptorDefs,
	IdentifierCaptorDefs,

	...DeclCaptorDefs
];
