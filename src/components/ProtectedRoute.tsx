import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('afrivibe_token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Lightweight expiry check by decoding JWT payload (no library needed)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      localStorage.removeItem('afrivibe_token');
      return <Navigate to="/admin/login" replace />;
    }
  } catch {
    localStorage.removeItem('afrivibe_token');
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
