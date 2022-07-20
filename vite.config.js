import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin({ dev: true })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'extension/panel.js'),
      name: 'Solid Structure DT',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js'],
    },
  },
});
