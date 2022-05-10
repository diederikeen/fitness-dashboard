import { styled } from "@stitches/react";
import React, { InputHTMLAttributes, ReactNode } from "react";
import { ConnectForm } from "../ConnectForm";
import { FlexBox } from "../FlexBox";

const StyledInput = styled("input", {
  height: "34px",
  borderRadius: "$sm",
  border: "none",
  boxShadow: "none",
  padding: "0 $lg",
});

const StyledLabel = styled("label", {
  textTransform: "uppercase",
  fontSize: "12px",
  fontWeight: "700",
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | ReactNode;
  error?: string;
}

export function FormInput({ name, label, error, ...rest }: Props) {
  return (
    <ConnectForm>
      {({ register }) => (
        <FlexBox dir="col">
          {label && (
            <div>
              <StyledLabel htmlFor={name}>{label}</StyledLabel>
            </div>
          )}

          <StyledInput {...register(name)} {...rest} />

          {error ?? <p>{error}</p>}
        </FlexBox>
      )}
    </ConnectForm>
  );
}
