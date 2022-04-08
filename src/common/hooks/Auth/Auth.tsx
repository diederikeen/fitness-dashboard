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
  useLogin: CustomUseMutation<LoginPayload, LoginResponse>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authToken = localStorage.getItem("auth-token");
  // We can ignore it as we skip it if there is no token, there for we
  // only make this call when there is a token in place.

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = useGetProfileQuery(authToken ?? skipToken, {
    skip: !authToken,
  });

  const [useLogin] = useLoginMutation();

  const contextValue = { user: data, useLogin };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
