import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    // Стискаємо растрові зображення під час збірки (логотип-SVG не чіпаємо)
    ViteImageOptimizer({ test: /\.(jpe?g|png|webp)$/i }),
  ],
});
