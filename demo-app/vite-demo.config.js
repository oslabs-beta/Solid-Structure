import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin({ dev: true })],
    root: './demo-app',
    mode: 'development', 
    // build: {
    //   input: './extension/src/index.jsx',
    //   outDir: path.join(__dirname, './extension/dist'),
    //   output: {
    //     sourcemap: false,
    //     format: 'iife',
    //     name: 'app',
    //     file: 'bundleSolid.js',
    //   },
    //   rollupOptions: {
    //     external: ['chrome'],
    //   },
    // },
  });
  