import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
// import { chromeExtension } from 'vite-plugin-chrome-extension';

export default defineConfig({
  plugins: [solidPlugin({ dev: true })],
  build: {
    input: './extension/src/index.jsx',
    output: {
      sourcemap: false,
      format: 'iife',
      name: 'app',
      dir: './extension/dist',
      file: 'bundleSolid.js',
    },
    rollupOptions: {
      external: ['chrome'],
    },
  },
});
