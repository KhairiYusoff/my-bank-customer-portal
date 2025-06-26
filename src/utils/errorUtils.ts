import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

/**
 * Helper function to get error message from RTK Query error
 * @param error - The error object from RTK Query
 * @returns A user-friendly error message
 */
export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string {
  if (!error) return '';
  
  // Handle FetchBaseQueryError
  if ('status' in error) {
    // Handle different error statuses
    if (typeof error.status === 'number') {
      return `Error: ${error.status}`;
    }
    
    // Handle error with data
    if (error.data) {
      const data = error.data as any;
      return data.message || 'An unknown error occurred';
    }
    
    return 'An error occurred with the request';
  }
  
  // Handle SerializedError
  return error.message || 'An unknown error occurred';
}
