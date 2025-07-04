import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApi } from '../baseApi';

// Mock fetchBaseQuery
jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  fetchBaseQuery: jest.fn(),
}));

// Mock console methods
const originalConsoleError = console.error;
const mockConsoleError = jest.fn();

describe('baseApi', () => {
  beforeEach(() => {
    console.error = mockConsoleError;
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error = originalConsoleError;
  });

  it('should be properly configured', () => {
    // Test basic configuration
    expect(baseApi.reducerPath).toBe('api');
    expect(baseApi.endpoints).toBeDefined();
    expect(baseApi.reducer).toBeDefined();
    expect(baseApi.middleware).toBeDefined();
  });

  it('should be properly exported', () => {
    // Test that the exports are defined
    expect(baseApi.middleware).toBeDefined();
    expect(baseApi.reducerPath).toBeDefined();
    expect(baseApi.reducer).toBeDefined();
  });
});
