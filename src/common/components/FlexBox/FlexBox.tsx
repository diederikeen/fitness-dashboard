import { styled } from "@stitches/react";
import { PropsWithChildren } from "react";

interface Props {
  dir: "col" | "row";
}

const Box = styled("div", {
  display: "flex",

  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      col: {
        flexDirection: "column",
      },
    },
  },
});

export function FlexBox({ dir = "row", children }: PropsWithChildren<Props>) {
  return <Box direction={dir}>{children}</Box>;
}
