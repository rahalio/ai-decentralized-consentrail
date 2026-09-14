import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    '@consentrail/core',
    '@consentrail/services',
    '@consentrail/adapters',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
  ],
});
