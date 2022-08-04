import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  name: 'Solid Structure',
  description: 'DevTool for SolidJS application',
  version: '1.0.0',
  manifest_version: 3,
  devtools_page: './devtools.html',
  permissions: [
    'tabs',
    'activeTab',
    'debugger',
    'clipboardRead',
    'clipboardWrite',
    'idle',
    'scripting',
  ],
  host_permissions: ['file:///*', 'http://*/*', 'https://*/*'],
  background: {
    service_worker: './background.ts',
    type: 'module',
  },
  icons: {
    '48': 'assets/logo48-off.png',
    '128': 'assets/logo128-off.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['./contentScript.js'],
      run_at: 'document_start',
    },
  ],
});
