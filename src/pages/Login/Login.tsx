import React from "react";
import { useNavigate } from "react-router-dom";

import { SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { useAuth } from "../../common/hooks/Auth";
import {
  FormComposition,
  SchemaType,
} from "../../common/components/FormComposition";
import { StyledCard } from "../../common/components/StyledCard";

interface FormFields {
  email: string;
  password: string;
  firstName?: string;
}

const validationSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

const schema: SchemaType = {
  fields: [
    {
      ns: "email",
      type: "email",
      label: "Email",
    },
    {
      ns: "password",
      type: "password",
      label: "Password",
    },
  ],
  validation: validationSchema,
};

export function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit: SubmitHandler<FormFields> = (data) =>
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
    <StyledCard>
      <FormComposition<FormFields>
        schema={schema}
        submit={onSubmit}
        title="Login"
        button="Log in"
      />
    </StyledCard>
  );
}
