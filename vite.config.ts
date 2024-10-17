import { defineConfig, loadEnv } from 'vite';
import solid from 'vite-plugin-solid';
import path from 'path';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    resolve: {
      base: '',
      alias: {
        '~': path.resolve(__dirname, '/src'),
      },
    },
    plugins: [solid()],
    base: process.env.VITE_BASE_URL || '/',
  };
});
