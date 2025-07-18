import eslint from '@rollup/plugin-eslint';
import typescript from 'rollup-plugin-typescript2';

export const buildConfig = (lint) => {
	let isCircularImportFound = false;

	return [{
		input: './src/index.ts',
		output: [
			{format: 'es', dir: '.'},
			{format: 'cjs', file: './index.cjs'}
		],
		plugins: [
			lint ? eslint({exclude: ['../node_modules/**', 'node_modules/**']}) : null,
			// lint ? tslint({exclude: ['../node_modules/**', 'node_modules/**']}) : null,
			typescript({clean: true})
		].filter(x => x != null),
		onwarn(warning, defaultHandler) {
			if (warning.code === 'CIRCULAR_DEPENDENCY') {
				if (!isCircularImportFound) {
					isCircularImportFound = true;
					defaultHandler(`Warning: 1+ circular dependencies found.`);
				}
			} else {
				defaultHandler(warning);
			}
		},
		external(id) {
			return [
				'@rainbow-ast/core', '@rainbow-ast/java-base'
			].includes(id);
		}
	}];
};