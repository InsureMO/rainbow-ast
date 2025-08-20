// import {createGroovyClassLoader, DocsCollector as G4DocsCollector} from '@rainbow-n19/g4';
// import {DocsCollector as J17DocsCollector, JdkClassLoader} from '@rainbow-n19/j17';
// import {
// 	DependenciesClassLoader,
// 	EditingClassDocs,
// 	EditingClassLoader,
// 	FloatingClassDocs,
// 	FloatingClassLoader,
// 	ImmutableClassDocs,
// 	ProjectClassDocs,
// 	ProjectClassLoader
// } from '@rainbow-n19/n2';
import {Editor as GroovyEditor} from '@rainbow-ast/cm-editor';
import {DefaultStyleDefs, groovy, transpileStyles} from '@rainbow-ast/cm-groovy';
import React, {useState} from 'react';
import TestGroovy1 from './test-groovy-1.groovy';

// export const createDefaultClassLoader = (): EditingClassLoader => {
// 	const GroovyClassLoader = createGroovyClassLoader(JdkClassLoader);
// 	const dependenciesClassLoader = new DependenciesClassLoader(GroovyClassLoader);
// 	const projectClassLoader = new ProjectClassLoader(dependenciesClassLoader);
// 	const floatingClassLoader = new FloatingClassLoader(projectClassLoader);
// 	return new EditingClassLoader(floatingClassLoader);
// };
// export const createDefaultClassDocs = (): EditingClassDocs => {
// 	const immutableClassDocs = new ImmutableClassDocs();
// 	J17DocsCollector.consume(immutableClassDocs);
// 	G4DocsCollector.consume(immutableClassDocs);
// 	const projectClassLoader = new ProjectClassDocs(immutableClassDocs);
// 	const floatingClassLoader = new FloatingClassDocs(projectClassLoader);
// 	return new EditingClassDocs(floatingClassLoader);
// };

export const Editor = () => {
	const [state, setState] = useState({
		language: groovy({language: {shebang: true}}),
		styles: {
			styles: transpileStyles(DefaultStyleDefs)
		},
		content: TestGroovy1
	});

	const onContentChanged = (content: string) => {
		// console.log(content);
		setState(state => ({...state, content}));
	};

	return <GroovyEditor initContent={TestGroovy1} contentChanged={onContentChanged}
	                     language={state.language}
	                     styles={state.styles}/>;
};
