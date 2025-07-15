import {GroovyTokenPointcutDefs} from './types';

export const AnnotationPointcutDefs: GroovyTokenPointcutDefs = {
	AnnotationDeclValues: {
		onBlockEnded: (_, context): void => {
			context.endCurrentBlock();
		}
	}
};
