import {combineConfig, Facet} from '@codemirror/state';
import {GroovyFacetDocument} from './facet-document';

export interface GroovyFacetInputData {
	document: GroovyFacetDocument;
}

export interface GroovyFacetData {
	document: GroovyFacetDocument;
}

/**
 * This is how the ts-related extensions are
 * configured: this facet sets the path of the file
 * and the environment to use, and the rest of
 * the extensions, like tsLint and tsAutocomplete,
 * pull those settings automatically from editor state.
 */
export const GroovyFacet = Facet.define<GroovyFacetInputData, GroovyFacetData>({
	combine(configs: readonly GroovyFacetInputData[]): GroovyFacetData {
		return combineConfig(configs, {});
	}
});

