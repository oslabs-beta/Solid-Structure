import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
import { chromeExtension } from 'vite-plugin-chrome-extension';

export default defineConfig({
  plugins: [chromeExtension(), solidPlugin({ dev: true })],
  alias: {
    '@': path.resolve(__dirname, 'extension/src'),
  },
  build: {
    outDir: path.join(__dirname, 'extension/dist'),
    lib: {
      entry: path.resolve(__dirname, './extension/manifest.json'),
      name: 'Solid Structure DT',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['chrome', 'solid-js'],
    },
  },
});
