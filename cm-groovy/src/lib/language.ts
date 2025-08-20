import {Language, LanguageSupport} from '@codemirror/language';
import {Compartment, Extension, Facet, StateEffect} from '@codemirror/state';
import {EditorView} from '@codemirror/view';
import {GroovyDecorationPlugin} from './decoration';
import {GroovyFacet} from './facet';
import {GroovyFacetDocument} from './facet-document';
import {GroovyLanguageServerArgs} from './language-server';
import {GroovyParser, GroovyParserArgs} from './parser';

export interface GroovyExtensionOptions {
	language?: GroovyLanguageServerArgs;
}

export interface ReconfigurableGroovyExtension {
	/**
	 * extension to install at initializing
	 */
	extension: Extension;
	/**
	 * create a transaction according to given options, which can be applied through {@code editor.dispatch({effects})}
	 */
	createReconfigurationEffect: (options: GroovyExtensionOptions) => StateEffect<unknown>;
	/**
	 * apply the given options to editor directly
	 */
	reconfigure: (editor: EditorView, options: GroovyExtensionOptions) => void;
}

export class GroovyLanguageSupport extends LanguageSupport {
	reconfigurable(): ReconfigurableGroovyExtension {
		const compartment = new Compartment();
		const extension = compartment.of(this);
		const createReconfigurationEffect = (options: GroovyExtensionOptions): StateEffect<unknown> => {
			return compartment.reconfigure(groovy(options));
		};
		const reconfigure = (editor: EditorView, options: GroovyExtensionOptions) => {
			editor.dispatch({effects: createReconfigurationEffect(options)});
		};

		return {extension, reconfigure, createReconfigurationEffect};
	}
}

export const createGroovyLanguage = (args?: GroovyParserArgs) => {
	return new Language(Facet.define(), new GroovyParser(args), [], 'Groovy');
};

export const groovy = (options?: GroovyExtensionOptions): GroovyLanguageSupport => {
	const document = new GroovyFacetDocument();
	const facet = GroovyFacet.of({document});
	const language = createGroovyLanguage({...(options?.language ?? {}), document});
	return new GroovyLanguageSupport(language, [
		facet,
		GroovyDecorationPlugin()
		// FoldServicePlugin,
		// AutoCompletionPlugin,
		// LinterPlugin,
		// ClickablePlugin,
		// KeymapCommentPlugin,
		// KeymapHelpPlugin
	]);
};
