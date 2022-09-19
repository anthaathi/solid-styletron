import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/public.ts'),
      name: 'SolidStyletron',
      fileName: 'solid-styletron',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['solid-js'],
      output: {
        globals: {
          'solid-js': 'solidJS',
        },
      },
    },
  },
});
