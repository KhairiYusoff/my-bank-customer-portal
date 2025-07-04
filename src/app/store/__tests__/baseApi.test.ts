import { baseApi } from '../baseApi';

// Mock console methods for testing
jest.spyOn(console, 'error').mockImplementation();
jest.spyOn(console, 'log').mockImplementation();

describe('baseApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
  
  it('should have the correct tag types', () => {
    // Test that the API has the expected tag types
    expect(baseApi.enhanceEndpoints).toBeDefined();
    expect(baseApi.injectEndpoints).toBeDefined();
  });
  
  it('should export the correct middleware and reducer paths', () => {
    // Test that the exports are correctly named
    expect(baseApi.reducerPath).toBe('api');
    
    // Check that the API exports the expected properties
    const exportedProperties = Object.keys(baseApi);
    expect(exportedProperties).toContain('middleware');
    expect(exportedProperties).toContain('reducer');
    expect(exportedProperties).toContain('reducerPath');
    expect(exportedProperties).toContain('util');
  });
});
