/**
 * Base response type for all API responses
 */
export interface BaseResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

/**
 * Standard error response format
 */
export interface ApiError {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
