import { createStitches } from "@stitches/react";

// based on https://flatuicolors.com/palette/ca
export const { css, theme, styled } = createStitches({
  theme: {
    colors: {
      grey100: "rgba(200, 214, 229,1.0)",
      grey200: "rgba(131, 149, 167,1.0)",
      grey300: "rgba(87, 101, 116,1.0)",
      grey400: "rgba(34, 47, 62,1.0)",

      primary: "rgba(29, 209, 161,1.0)",
      error: "rgba(238, 82, 83,1.0)",
      warning: "rgba(255, 159, 67,1.0)",

      primaryText: "white",
    },
    space: {
      xs: "2px",
      sm: "4px",
      md: "8px",
      default: "8px",
      lg: "16px",
      xlg: "32px",
      xxlg: "64px",
      xxxlg: "128px",
    },
    radii: {
      xs: "2px",
      sm: "4px",
      md: "8px",
      default: "8px",
      lg: "16px",
      xlg: "32px",
      xxlg: "64px",
      xxxlg: "128px",
    },
  },
  media: {
    bp1: "(min-width: 640px)",
    bp2: "(min-width: 768px)",
    bp3: "(min-width: 1024px)",
  },
});
