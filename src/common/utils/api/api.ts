import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import { getToken } from "../token/token";
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

export interface WeightPayload {
  weight: number;
  date?: Date;
}

export interface WeightResponse {
  _id: string;
  weight: number;
  date: Date;
}

function getHeaders<T>({
  url,
  method,
  data,
}: {
  url: string;
  method: "post" | "get" | "update";
  token?: string;
  data?: T;
}) {
  const token = getToken();

  const header = {
    url,
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  token &&
    Object.assign(header, {
      ...header,
      headers: {
        ...header.headers,
        "auth-token": token,
      },
    });

  data &&
    Object.assign(header, {
      ...header,
      body: data,
    });

  return { ...header };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginPayload>({
      query: (data) => {
        return getHeaders({
          url: "/api/user/login",
          method: "post",
          data,
        });
      },
      invalidatesTags: ["User"],
    }),
    getProfile: build.query<UserResponse, string>({
      query: (token) => {
        return getHeaders({
          url: "/api/user",
          method: "get",
          token,
        });
      },
      providesTags: (result) => (result ? ["User"] : []),
    }),
    addWeight: build.mutation<WeightResponse, WeightPayload>({
      query: (data) => {
        return getHeaders({
          method: "post",
          url: "/api/weight",
          data,
        });
      },
      invalidatesTags: ["User"],
    }),
    getWeight: build.query<WeightResponse[], void>({
      query: () => {
        return getHeaders({
          method: "get",
          url: "/api/weight",
        });
      },
      transformResponse: ({ data }) => data,
      providesTags: (result) => (result ? ["User"] : []),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useGetWeightQuery,
  useAddWeightMutation,
} = authApi;

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
