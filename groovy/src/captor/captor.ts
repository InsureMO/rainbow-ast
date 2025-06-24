import {GroovyAstBuildContext} from '../ast/context';
import {TokenMatchResult} from './match';

export interface TokenCaptor {
	matches(context: GroovyAstBuildContext): TokenMatchResult;
}
