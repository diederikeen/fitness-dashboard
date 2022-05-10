import React from "react";

import { ConnectForm } from "../ConnectForm";
import { FlexBox } from "../FlexBox";
import { StyledInput, StyledLabel } from "../StyledInput";

type FieldType = "email" | "text";

interface BaseProps {
  name: string;
  error?: string;
  label?: string | JSX.Element;
  type?: FieldType;
  step?: "any" | number;
}

export function TextInput({ name, label, error, type = "text" }: BaseProps) {
  return (
    <ConnectForm>
      {({ register }) => (
        <FlexBox dir="col">
          {label && (
            <div>
              <StyledLabel htmlFor={name}>{label}</StyledLabel>
            </div>
          )}

          <StyledInput type={type} {...register(name)} />

          {error ?? <p>{error}</p>}
        </FlexBox>
      )}
    </ConnectForm>
  );
}
