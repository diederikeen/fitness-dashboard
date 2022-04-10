import { useForm } from "react-hook-form";
import React from "react";

type FieldType = "email" | "text";

interface ITextInput {
  name: string;
  error?: string;
  label?: string | JSX.Element;
  type?: FieldType;
}

export function TextField({ name, label, error, type = "text" }: ITextInput) {
  const { register } = useForm();
  return (
    <>
      {label && (
        <div>
          <label htmlFor={name}>{label}</label>
        </div>
      )}

      <input type={type} {...register(name)} />

      {error ?? <p>{error}</p>}
    </>
  );
}
