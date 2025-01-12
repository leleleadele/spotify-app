import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { "configFile": "./test.babel.config.js" }],
  },
};

export default config;
