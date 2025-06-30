import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store'; // Adjust path as necessary

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // TODO: Implement actual authentication check based on your Redux store or auth context
  // For now, we'll use a placeholder. You'll need to check if the user is logged in,
  // e.g., by checking for a token or a user object in your auth state.
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Assuming auth slice has isAuthenticated

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
