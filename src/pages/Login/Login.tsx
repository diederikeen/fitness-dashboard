import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { useAuth } from "../../common/hooks/Auth";
import { FormComposition } from "../../common/components/FormComposition";
import { StyledCard } from "../../common/components/StyledCard";
import { setToken } from "../../common/utils/token/token";
import { LoginPayload } from "../../common/utils/api";

const validationSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

const schema = {
  fields: {
    email: {
      type: "email",
      label: "Email",
    },
    password: {
      type: "password",
      label: "Password",
    },
  },
  validation: validationSchema,
};

export function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit: SubmitHandler<LoginPayload> = (data) =>
    auth
      ?.useLogin({
        ...data,
      })
      .then((res) => {
        if ("data" in res) {
          setToken(res.data["auth-token"]);
        }
      })
      .then(() => navigate("/"));

  return (
    <StyledCard>
      <FormComposition
        schema={schema}
        submit={onSubmit}
        title="Login"
        button="Log in"
      />
    </StyledCard>
  );
}
