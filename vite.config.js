import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const htmlInputs = Object.fromEntries(
  readdirSync(process.cwd())
    .filter((name) => name.endsWith('.html'))
    .map((name) => [name.replace(/\.html$/, ''), resolve(process.cwd(), name)])
);

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: htmlInputs
    }
  }
});
