import {AnnotationPointcutDefs} from './annotation';
import {ImportDeclarationPointcutDefs} from './import-declaration';
import {NumericLiteralPointcutDefs} from './numeric-literal';
import {PackageDeclarationPointcutDefs} from './package-declaration';
import {ScriptCommandPointcutDefs} from './script-command';
import {GroovyTokenPointcutDefs} from './types';

export * from './types';
export * from './utils';

export const TokenPointcutDefs: ReadonlyArray<GroovyTokenPointcutDefs> = [
	NumericLiteralPointcutDefs,

	ScriptCommandPointcutDefs,
	PackageDeclarationPointcutDefs,
	ImportDeclarationPointcutDefs,
	AnnotationPointcutDefs
];
