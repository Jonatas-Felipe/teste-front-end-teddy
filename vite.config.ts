import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true, // Habilita APIs globais como describe, it, expect
    environment: 'jsdom', // Usa jsdom para simular o DOM
    setupFiles: './src/setupTests.ts', // Arquivo de configuração de testes
    exclude: [
      'node_modules/**',
      'dist/**',
      'tests/**', // Exclui a pasta de testes E2E
      '**/*.config.{js,ts}',
    ],
  },
});
