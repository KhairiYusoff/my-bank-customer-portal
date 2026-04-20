import { BaseResponse } from "@/types/api";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isFirstTime: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isFirstTime: boolean;
}

export interface LoginResponseData {
  user: User;
}

export type LoginResponse = BaseResponse<LoginResponseData>;

export interface ValidationError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]> | ValidationError[];
  statusCode?: number;
}
