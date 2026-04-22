import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Redirect baseApi to a Jest-compatible mock (avoids import.meta.env Vite syntax)
    // Must be listed BEFORE the generic @/ alias to take precedence
    '^@/app/store/baseApi$': '<rootDir>/src/app/store/__mocks__/baseApi.ts',
    '^\\.\\./baseApi$': '<rootDir>/src/app/store/__mocks__/baseApi.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};

export default config;
