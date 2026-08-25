import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, token, isLoading } = useAuth();

  if (isLoading) return null; // brief flash while /auth/me resolves
  if (!token || !user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
