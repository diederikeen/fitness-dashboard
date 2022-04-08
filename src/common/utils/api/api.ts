import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
const baseUrl = "/";

export interface UserResponse {
  name: string;
  email: string;
  _id: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  "auth-token": string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginPayload>({
      query: (data) => {
        return {
          method: "post",
          url: "/api/user/login",
          headers: { "Content-Type": "application/json" },
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    getProfile: build.query<UserResponse, string>({
      query: (token) => {
        return {
          url: "/api/user",
          method: "get",
          headers: { "Content-Type": "application/json", "auth-token": token },
        };
      },
      providesTags: (result) =>
        result ? [{ type: "User", id: result._id }] : [],
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;

export type CustomUseMutation<T, K> = MutationTrigger<
  MutationDefinition<
    T,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      // Generated from rtk-query
      // eslint-disable-next-line @typescript-eslint/ban-types
      {},
      FetchBaseQueryMeta
    >,
    "User",
    K,
    "authApi"
  >
>;
