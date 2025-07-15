import {GroovyTokenCaptorDefs} from '../types';
import {BooleanCaptorDefs} from './boolean-literal';
import {NumberCaptorDefs} from './numeric-literal';
import {StringCaptorDefs} from './string-literal';

export const LiteralCaptorDefs: ReadonlyArray<GroovyTokenCaptorDefs> = [
	BooleanCaptorDefs,
	...NumberCaptorDefs,
	...StringCaptorDefs
];
