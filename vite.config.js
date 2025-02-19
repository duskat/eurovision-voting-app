import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // Remove the GitHub Pages base path since we're using Firebase now
  // base: '/eurovision-voting-app/',
});
