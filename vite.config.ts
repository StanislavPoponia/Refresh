import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

/** GitHub Pages віддає 404.html на невідомі адреси — підкладаємо туди SPA, щоб показати нашу 404. */
function spaFallback404(): Plugin {
  let outDir = 'dist';
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
    },
  };
}

export default defineConfig({
  // Для проєктного сайту на GitHub Pages: VITE_BASE=/Refresh/ (у воркфлоу). Локально й на своєму домені — '/'
  base: process.env.VITE_BASE ?? '/',
  plugins: [
    react(),
    // Стискаємо растрові зображення під час збірки (логотип-SVG не чіпаємо)
    ViteImageOptimizer({ test: /\.(jpe?g|png|webp)$/i }),
    spaFallback404(),
  ],
});
