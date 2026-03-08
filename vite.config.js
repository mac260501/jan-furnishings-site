import { readdirSync, existsSync, copyFileSync, mkdirSync, cpSync } from 'node:fs';
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

// Build plugin: copy static assets that Vite doesn't process automatically.
//
// 1. Plain IIFE scripts in interiors/ (referenced via <script src="/interiors/...">)
//    Vite only bundles type="module" scripts, so these must be copied verbatim.
//
// 2. The entire assets/images/ directory → dist/assets/images/
//    Images referenced as absolute URLs inside JS string literals (e.g. in
//    villa-bundles.js) are invisible to Vite's asset pipeline and never get
//    hashed/copied. Mirroring the folder ensures they resolve correctly on Netlify.
const copyInteriorsScripts = {
  name: 'copy-interiors-scripts',
  closeBundle() {
    const root = process.cwd();

    // 1 — interiors IIFE scripts
    const scriptsSrc = resolve(root, 'interiors');
    const scriptsDest = join(root, 'dist', 'interiors');
    const files = ['brand-bar.js', 'nav.js', 'wa-button.js', 'villa-bundles.js'];
    mkdirSync(scriptsDest, { recursive: true });
    files.forEach((file) => {
      try { copyFileSync(join(scriptsSrc, file), join(scriptsDest, file)); } catch (_) {}
    });

    // 2 — assets/images → dist/assets/images  (for JS-string image references)
    try {
      cpSync(
        join(root, 'assets', 'images'),
        join(root, 'dist', 'assets', 'images'),
        { recursive: true }
      );
    } catch (_) {}
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
