import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        servicos: resolve(__dirname, 'servicos.html'),
        galeria: resolve(__dirname, 'galeria.html'),
        contacto: resolve(__dirname, 'contacto.html')
      }
    }
  }
});
