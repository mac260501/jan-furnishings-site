import { readdirSync, existsSync, copyFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
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

// Build plugin: copy plain JS scripts (non-module) from interiors/ → dist/interiors/
// These are IIFE scripts referenced via <script src="/interiors/..."> — Vite won't
// bundle them automatically, so we copy them verbatim after the build.
const copyInteriorsScripts = {
  name: 'copy-interiors-scripts',
  closeBundle() {
    const srcDir = resolve(process.cwd(), 'interiors');
    const destDir = join(process.cwd(), 'dist', 'interiors');
    const files = ['brand-bar.js', 'nav.js', 'wa-button.js', 'villa-bundles.js'];
    mkdirSync(destDir, { recursive: true });
    files.forEach((file) => {
      try {
        copyFileSync(join(srcDir, file), join(destDir, file));
      } catch (_) {}
    });
  }
};

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
  plugins: [react(), interiorsDirRoutes, copyInteriorsScripts],
  base: './',
  build: {
    rollupOptions: {
      input: htmlInputs
    }
  }
});
