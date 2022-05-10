import {
  CustomUseMutation,
  LoginPayload,
  LoginResponse,
  useGetProfileQuery,
  useLoginMutation,
  UserResponse,
} from "../../utils/api";
import React, { createContext, useContext } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

interface IAuthContext {
  user?: UserResponse;
  token?: string;
  useLogin: CustomUseMutation<LoginPayload, LoginResponse>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authToken = localStorage.getItem("auth-token");

  const { data } = useGetProfileQuery(authToken ?? skipToken, {
    skip: !authToken,
  });

  const [useLogin] = useLoginMutation();

  const contextValue = {
    user: data,
    useLogin,
    token: authToken ? authToken : undefined,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
