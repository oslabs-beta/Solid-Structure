import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest';

export default defineConfig({
  plugins: [solidPlugin({ hot: false }), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        panel: 'panel.html',
      },
    },
    target: 'esnext',
  },
  optimizeDeps: {
    entries: ['**/*.html'],
  },
});