import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {tsconfig: "tsconfig.json"}],
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.test.ts'],
  rootDir: "src"
};

export default config;