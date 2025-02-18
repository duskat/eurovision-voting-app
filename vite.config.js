import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/eurovision-voting-app/', // Important for GitHub Pages
  plugins: [vue()], // Or react()
});
