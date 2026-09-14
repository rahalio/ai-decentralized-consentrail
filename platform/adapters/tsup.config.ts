import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm'],
  dts: false,
  outDir: 'dist',
  external: [
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/client-s3',
    '@consentrail/core',
    '@consentrail/services',
    'ulid',
  ],
  tsconfig: './tsconfig.json',
});
