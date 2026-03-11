import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'client',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '../node_modules/@shoelace-style/shoelace/dist/assets/**/*',
          dest: 'shoelace/assets',
        },
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
