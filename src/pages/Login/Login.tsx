import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "../../common/hooks/Auth";
import { useNavigate } from "react-router-dom";
import React from "react";
import { TextField } from "../../common/components/TextField";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

export function Login() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
    auth
      ?.useLogin({
        ...data,
      })
      .then((res) => {
        if ("data" in res) {
          localStorage.setItem("auth-token", res.data["auth-token"]);
        }
      })
      .then(() => navigate("/"));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="email"
          type="email"
          error={errors["email"]?.message}
          label="Email"
        />

        <TextField
          name="password"
          error={errors["password"]?.message}
          label="Password"
        />

        <input type="submit" />
      </form>
    </>
  );
}
