import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

const __dirname = path.resolve();

export default defineConfig({
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    eslintPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  resolve: {
    alias: [
      { find: 'assets', replacement: path.resolve(__dirname, 'src/assets') },
      {
        find: 'components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: 'styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
});
