import {createFilter} from '@rollup/pluginutils';
import react from "@vitejs/plugin-react";
import {defineConfig, loadEnv} from "vite";

export default ({mode}) => {
	const groovyPlugin = () => {
		const include = (void 0);
		const exclude = (void 0);
		const filter = createFilter(include, exclude);
		return {
			name: 'vite:transform-groovy',
			enforce: 'pre',
			async transform(code, id) {
				if (/\.groovy$/.test(id)) {
					// Filters the filesystem for files to include/exclude. Includes all files by default.

					if (!filter(id)) {
						return null;
					}
					return {code: `export default ${JSON.stringify(code)};`}
				}
				return null;
			}
		}
	};
	return defineConfig({
		define: {
			'process.env': {...process.env, ...loadEnv(mode, process.cwd())}
		},
		plugins: [groovyPlugin(), react()],
		server: {host: true, port: 3000, strictPort: true, open: '/'},
		base: '/rainbow-n19-n5/',
		build: {
			minify: false,
			// sourcemap: true,
			// chunkSizeWarningLimit: 600,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						return [
							[
								{name: 'babel', includes: ['@babel']},
								// {name: 'property-information', includes: ['property-information']},
								// {name: 'react', includes: ['react', 'react-dom']},
								// {name: 'styled-components', includes: ['styled-components']},
								// {name: 'emotion', includes: ['@emotion']},
								// emotion must in same bundle with react, otherwise it leads incorrect imports, don't know why
								{name: 'react-base', includes: ['react', 'react-dom', 'styled-components', '@emotion']},
								{name: 'refractor', includes: ['refractor']},
								{name: 'dayjs', includes: ['dayjs']},
								{name: 'zrender', includes: ['zrender']},
								{name: 'echarts', includes: ['echarts']},
								{name: 'unist', includes: ['unist']},
								{name: 'mdast', includes: ['mdast-']},
								{name: 'micromark', includes: ['micromark']},
								{name: 'remark', includes: ['remark-']},
								{name: 'hastscript', includes: ['hastscript']},
								{name: 'rainbow-n19-g4', includes: ['@rainbow-n19/g4']},
								{name: 'rainbow-n19-j17', includes: ['@rainbow-n19/j17']},
								{name: 'rainbow-n19-n1', includes: ['@rainbow-n19/n1']},
								{name: 'rainbow-n19-n2', includes: ['@rainbow-n19/n2']},
								{name: 'rainbow-n19-n3', includes: ['@rainbow-n19/n3']},
								{name: 'rainbow-n19-n5', includes: ['@rainbow-n19/n5']}
							].find(({includes}) => {
								return id.includes('node_modules') && includes.some((include) => id.includes(include));
							}),
							[
								{name: 'rainbow-n19-g4', includes: ['d9-g4']},
								{name: 'rainbow-n19-j17', includes: ['d9-j17']},
								{name: 'rainbow-n19-n1', includes: ['d9-n1']},
								{name: 'rainbow-n19-n2', includes: ['d9-n2']},
								{name: 'rainbow-n19-n3', includes: ['d9-n3']},
								{name: 'rainbow-n19-n5', includes: ['d9-n5']}
							].find(({includes}) => {
								return includes.some((include) => id.includes(`/${include}/`));
							}),
							id.includes('node_modules') ? {name: 'vendor'} : null
						].filter(found => found != null)[0]?.name;
					}
				},
				strictDeprecations: true
			}
		}
	})
}