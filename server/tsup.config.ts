import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/app.ts'],
    format: ['esm'],
    outDir: 'dist',
    platform: 'node',
    clean: true,
    sourcemap: false,
    // node_modules are external by default — only our own source is bundled
});
