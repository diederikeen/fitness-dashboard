import { styled } from "@stitches/react";
import React, { InputHTMLAttributes, ReactNode } from "react";
import { ConnectForm } from "../ConnectForm";
import { FlexBox } from "../FlexBox";

const StyledInput = styled("input", {
  height: "34px",
  borderRadius: "$sm",
  boxShadow: "none",
  padding: "0 $lg",
  border: "1px solid transparent",

  variants: {
    error: {
      true: {
        border: "1px solid $error",
      },
    },
  },
});

const StyledLabel = styled("label", {
  textTransform: "uppercase",
  fontSize: "12px",
  fontWeight: "700",
  variants: {
    error: {
      true: {
        color: "$error",
      },
    },
  },
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | ReactNode;
  error?: string;
}

export function FormInput({ name, label, error, ...rest }: Props) {
  const hasError = Boolean(error);
  return (
    <ConnectForm>
      {({ register }) => (
        <FlexBox dir="col">
          {label && (
            <div>
              <StyledLabel error={hasError} htmlFor={name}>
                {label}
              </StyledLabel>
            </div>
          )}

          <StyledInput error={hasError} {...register(name)} {...rest} />

          {error ?? <p style={{ color: "red" }}>{error}</p>}
        </FlexBox>
      )}
    </ConnectForm>
  );
}
