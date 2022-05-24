import React, { createContext, useContext } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import {
  CustomUseMutation,
  LoginPayload,
  LoginResponse,
  useGetProfileQuery,
  useLoginMutation,
  UserResponse,
} from "../../utils/api";

import { getToken } from "../../utils/token/token";

interface IAuthContext {
  user?: UserResponse;
  useLogin: CustomUseMutation<LoginPayload, LoginResponse>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authToken = getToken();
  const { data } = useGetProfileQuery(authToken ?? skipToken, {
    skip: !authToken,
  });

  const [useLogin] = useLoginMutation();

  const contextValue = {
    user: data,
    useLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
