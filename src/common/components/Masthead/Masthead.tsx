import { styled } from "@stitches/react";

const StyledMastHead = styled("header", {
  gridColumn: "1/-1",
  padding: "0 $md",
  display: "flex",
  alignItems: "center",
});

export function Masthead() {
  return <StyledMastHead>Masthead</StyledMastHead>;
}
