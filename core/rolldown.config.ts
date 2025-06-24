import {defineConfig} from 'rolldown';
import {dts} from 'rolldown-plugin-dts';

export default defineConfig([
	{
		input: 'src/index.ts',
		plugins: [dts({tsconfig: './tsconfig.json'})],
		output: {format: 'es', dir: '.'}
	},
	{
		input: 'src/index.ts',
		output: {format: 'cjs', file: 'index.cjs'}
	}
]);
