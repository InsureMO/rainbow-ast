import {GroovyTokenCaptorDefs} from '../types';
import {AngleBracketCaptorDefs} from './angle-bracket';
import {AnnotationCaptorDefs} from './annotation';
import {BraceCaptorDefs} from './brace';
import {BracketCaptorDefs} from './bracket';
import {CommentCaptorDefs} from './comment';
import {ImportDeclarationCaptorDefs} from './import-declaration';
import {PackageDeclarationCaptorDefs} from './package-declaration';
import {ParenthesesCaptorDefs} from './parentheses';

export const DeclCaptorDefs: ReadonlyArray<GroovyTokenCaptorDefs> = [
	BraceCaptorDefs,
	BracketCaptorDefs,
	ParenthesesCaptorDefs,
	AngleBracketCaptorDefs,

	CommentCaptorDefs,
	PackageDeclarationCaptorDefs,
	ImportDeclarationCaptorDefs,
	AnnotationCaptorDefs
];
