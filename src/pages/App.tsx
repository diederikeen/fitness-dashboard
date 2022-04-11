import { Route, Routes } from "react-router-dom";
import { globalCss, styled } from "@stitches/react";

import { LandingsPage } from "./LadingsPage";
import { Login } from "./Login";

import { AuthProvider } from "../common/hooks/Auth";

import { theme } from "../theme";
import { Masthead } from "../common/components/Masthead";
import { Sidebar } from "../common/components/Sidebar";

const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: "Anek Tamil",
    "-webkit-font-smoothing": "antialiased",
    backgroundColor: "$grey400",
  },
});

const Layout = styled("div", {
  display: "grid",
  gridTemplateRows: "[mast-head] 0px [main-content] 1fr",
  gridTemplateColumns: "[side-bar] 280px [content] 1fr",
});

export function App() {
  globalStyles();

  return (
    <div className={theme}>
      <Layout>
        <Masthead />
        <Sidebar />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingsPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Layout>
    </div>
  );
}
