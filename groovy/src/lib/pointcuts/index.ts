import {AnnotationPointcutDefs} from './annotation';
import {NumericLiteralPointcutDefs} from './numeric-literal';
import {ScriptCommandPointcutDefs} from './script-command';
import {GroovyTokenPointcutDefs} from './types';

export * from './types';
export * from './utils';

export const TokenPointcutDefs: ReadonlyArray<GroovyTokenPointcutDefs> = [
	NumericLiteralPointcutDefs,

	ScriptCommandPointcutDefs,
	AnnotationPointcutDefs
];
