import '@testing-library/jest-dom';

// Mock Vite import.meta.env for Jest (Node 16 + Vite)
if (!(globalThis as any).import) {
  (globalThis as any).import = { meta: { env: { VITE_API_URL: 'http://localhost' } } };
}
