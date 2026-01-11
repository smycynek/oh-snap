import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/snap/',
  plugins: [devtools(), solidPlugin(), VitePWA({ registerType: 'autoUpdate' })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
