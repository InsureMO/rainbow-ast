import {GroovyAstBuildStateName} from './ast-build-state';
import {GroovyTokenName} from './token';

export const GroovyTokenCapturePriority: {
	$Default: Partial<Record<GroovyTokenName, number>>
} & Partial<Record<GroovyAstBuildStateName, Partial<Record<GroovyTokenName, number>>>> = {
	$Default: {
		Identifier: -100
	}
};
