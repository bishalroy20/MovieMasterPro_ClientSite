import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PublicRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return user ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default PublicRoute;