import { ComponentPropsWithoutRef } from "react";
import { styled } from "../../../theme";

export interface Props extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
  size?: "large" | "small";
}

const StyledButton = styled("button", {
  color: "$textPrimary",
  border: "none",
  borderRadius: "$sm",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "1px",

  variants: {
    variant: {
      primary: {
        fontSize: "12px",
        backgroundColor: "$primary",
      },
      secondary: {
        backgroundColor: "red",
      },
    },
    size: {
      large: {
        padding: "$lg $xlg",
      },
      small: {
        padding: "$sm",
      },
    },
  },
});

export function Button({
  children,
  variant = "primary",
  size = "large",
}: Props) {
  return (
    <StyledButton size={size} variant={variant}>
      {children}
    </StyledButton>
  );
}
