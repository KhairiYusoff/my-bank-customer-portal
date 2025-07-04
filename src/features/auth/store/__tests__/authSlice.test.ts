import authReducer, { setCredentials, logout, setError, clearError } from '../authSlice';
import { User, AuthState } from '../../types/auth';

// Mock the authApi
jest.mock('../authApi', () => ({
  authApi: {
    endpoints: {
      login: {
        matchPending: jest.fn(),
        matchFulfilled: jest.fn(),
        matchRejected: jest.fn(),
      },
    },
  },
}));

describe('authSlice', () => {
  // Define the initial state for tests
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  // Test the initial state
  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Test the setCredentials reducer
  describe('setCredentials reducer', () => {
    it('should handle setting user credentials', () => {
      const mockUser: User = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'customer',
        isVerified: false
      };

      const action = setCredentials({ user: mockUser });
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
      });
    });
  });

  // Test the logout reducer
  describe('logout reducer', () => {
    it('should reset auth state on logout', () => {
      // First set up an authenticated state
      const authenticatedState: AuthState = {
        user: { 
          id: '123', 
          email: 'test@example.com', 
          name: 'Test User',
          role: 'customer',
          isVerified: false
        },
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

      const action = logout();
      const state = authReducer(authenticatedState, action);

      expect(state).toEqual(initialState);
    });
  });

  // Test the error handling reducers
  describe('error handling reducers', () => {
    it('should set error message', () => {
      const errorMessage = 'Authentication failed';
      const action = setError(errorMessage);
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
      });
    });

    it('should clear error message', () => {
      // First set up a state with an error
      const stateWithError = {
        ...initialState,
        error: 'Authentication failed',
      };

      const action = clearError();
      const state = authReducer(stateWithError, action);

      expect(state).toEqual(initialState);
    });
  });
});
