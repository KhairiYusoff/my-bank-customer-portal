import { BaseResponse } from '@/types/api';

/**
 * Request payload for account application
 */
export interface ApplyRequest {
  name: string;
  email: string;
  phoneNumber: string;
}

/**
 * Response data for successful application
 */
export interface ApplyResponseData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  applicationStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

/**
 * Full response for account application
 */
export type ApplyResponse = BaseResponse<ApplyResponseData>;

/**
 * Validation error format from the API
 */
export interface ValidationError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

/**
 * Common error response format
 */
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]> | ValidationError[];
  statusCode?: number;
}
