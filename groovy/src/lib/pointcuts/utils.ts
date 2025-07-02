import {BuildUtils, TokenPointcuts} from '@rainbow-ast/core';
import {GroovyTokenName} from '../token';
import {GroovyTokenPointcutDefs} from './types';

export const buildTokenPointcuts = (defs: Array<GroovyTokenPointcutDefs>): TokenPointcuts<GroovyTokenName> => {
	return BuildUtils.buildTokenPointcuts({defs});
};
