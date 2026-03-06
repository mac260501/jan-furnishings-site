import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const htmlInputs = Object.fromEntries(
  readdirSync(process.cwd())
    .filter((name) => name.endsWith('.html'))
    .map((name) => [name.replace(/\.html$/, ''), resolve(process.cwd(), name)])
);

// Also include Jan Interiors sub-site HTML files
function scanHtmlDir(dir, prefix) {
  try {
    readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      if (entry.isFile() && entry.name.endsWith('.html')) {
        const key = `${prefix}/${entry.name.replace(/\.html$/, '')}`;
        htmlInputs[key] = resolve(dir, entry.name);
      } else if (entry.isDirectory()) {
        scanHtmlDir(resolve(dir, entry.name), `${prefix}/${entry.name}`);
      }
    });
  } catch (_) {}
}

scanHtmlDir(resolve(process.cwd(), 'interiors'), 'interiors');

// Dev-server plugin: serve index.html for clean directory URLs like /interiors/services/
const interiorsDirRoutes = {
  name: 'interiors-dir-routes',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = (req.url || '').split('?')[0];
      if (url.startsWith('/interiors/') && url.endsWith('/')) {
        const candidate = resolve(process.cwd(), url.slice(1), 'index.html');
        if (existsSync(candidate)) {
          req.url = url + 'index.html';
        }
      }
      next();
    });
  }
};

export default defineConfig({
  plugins: [react(), interiorsDirRoutes],
  base: './',
  build: {
    rollupOptions: {
      input: htmlInputs
    }
  }
});
