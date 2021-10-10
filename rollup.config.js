import pkg from './package.json';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import ts from 'rollup-plugin-ts';
import alias from '@rollup/plugin-alias';
import filesize from 'rollup-plugin-filesize';
import tsconfig from './tsconfig.json'

function resolveEntries() {
  return Object.entries(
    tsconfig.compilerOptions.paths
  ).map(([find, [replacement]]) => ({ find, replacement }));
}
const production = !process.env.ROLLUP_WATCH;

export default [
	{
		input: ['src/index.ts'],
    output: [
      { file: pkg.main, format: 'cjs' },
    ],
    plugins: [
      external(),
      ts(),
      alias({
        resolve: ['.ts', '.tsx'],
        entries: resolveEntries(),
      }),
      commonjs({
        include: ['node_modules/**'],
      }),
      production && filesize()
    ],
  },
  {
    input: ['src/index.ts'],
    output: [
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      external(),
      ts(),
      alias({
        resolve: ['.ts', '.tsx'],
        entries: resolveEntries(),
      }),
      commonjs({
        include: ['node_modules/**'],
      }),
      production && filesize()
    ],
  }
];
