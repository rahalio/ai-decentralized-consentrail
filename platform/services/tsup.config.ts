import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm'],
  dts: false,
  outDir: 'dist',
  tsconfig: './tsconfig.json',
  external: [
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/client-s3',
    '@consentrail/core',
    /.*\/api-server\/.*/,
    /.*\/adapters\/.*/,
  ],
});
