import {defineConfig} from 'rolldown';
import {dts} from 'rolldown-plugin-dts';

export default defineConfig([
	{
		input: 'src/index.ts',
		plugins: [dts()],
		external: '@rainbow-ast/core',
		output: {format: 'es', dir: '.'}
	},
	{
		input: 'src/index.ts',
		external: '@rainbow-ast/core',
		output: {format: 'cjs', file: 'index.cjs'}
	}
]);
