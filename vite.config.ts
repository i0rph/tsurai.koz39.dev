import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

const __dirname = path.resolve();

export default defineConfig({
  plugins: [
    devtools({
      autoname: true,
    }),
    solidPlugin(),
    eslintPlugin(),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      { find: 'errors', replacement: path.resolve(__dirname, 'src/errors') },
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
