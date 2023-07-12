import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [react(), mkcert()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      '@testing-library/jest-dom',
      'test/setup/msw.ts',
      'test/setup/testing-library.ts',
      'whatwg-fetch',
    ],
  },
});
