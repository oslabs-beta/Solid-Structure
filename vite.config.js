import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
// import { chromeExtension } from 'vite-plugin-chrome-extension';

export default defineConfig({
  plugins: [solidPlugin({ dev: true })],
  build: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json"
    ],
    input: './extension/src/index.jsx',
    outDir: path.join(__dirname, './extension/dist'),
    output: {
      sourcemap: false,
      format: 'iife',
      name: 'app',
      file: 'bundleSolid.js',
    },
    rollupOptions: {
      external: ['chrome'],
    },
  },
});
