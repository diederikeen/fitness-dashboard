import { Navigate, useLocation } from "react-router";
import React from "react";

import { useAuth } from "../../hooks/Auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return children;
}
