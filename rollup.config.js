import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
	input: './dist/index.js',
	output: {
		name: 'AwayjsArcade',
		globals: {
		},
		sourcemap: true,
		format: 'umd',
		file: './bundle/awayjs-arcade.umd.js'
	},
	external: [
	],
	plugins: [
		nodeResolve(),
		commonjs(),
		terser(),
	]
};