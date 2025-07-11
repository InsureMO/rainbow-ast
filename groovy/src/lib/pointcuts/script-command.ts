import {GroovyAstBuildState} from '../ast-build-state';
import {GroovyTokenPointcutDefs} from './types';

export const ScriptCommandPointcutDefs: GroovyTokenPointcutDefs = {
	ScriptCommand: {
		/**
		 * script command is allowed only once
		 */
		onBlockEnded: (_, context): void => {
			context.replaceState(GroovyAstBuildState.CUOmitScriptCmd);
		}
	}
};
