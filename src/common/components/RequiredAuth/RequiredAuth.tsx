import { Navigate, useLocation } from "react-router";
import React from "react";

import { getToken } from "../../utils/token/token";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();

  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return children;
}
