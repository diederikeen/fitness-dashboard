import { Route, Routes } from "react-router-dom";
import { globalCss, styled } from "@stitches/react";

import { LandingsPage } from "./LadingsPage";
import { Login } from "./Login";
import { WeightTracker } from "./WeightTracker";

import { Masthead } from "../common/components/Masthead";
import { Sidebar } from "../common/components/Sidebar";

import { AuthProvider } from "../common/hooks/Auth";

import { theme } from "../theme";
import { RequireAuth } from "../common/components/RequiredAuth";

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

const MainContent = styled("main", {
  padding: "$xlg $xxxlg $xlg $xxxlg",
  maxWidth: "calc(1600px - 128px * 2 - 280px)",
  width: "100%",
  margin: "0 auto",
});

export function App() {
  globalStyles();

  return (
    <AuthProvider>
      <div className={theme}>
        <Layout>
          <Masthead />
          <Sidebar />
          <MainContent>
            <Routes>
              <Route path="/" element={<LandingsPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/weight-tracker"
                element={
                  <RequireAuth>
                    <WeightTracker />
                  </RequireAuth>
                }
              />
            </Routes>
          </MainContent>
        </Layout>
      </div>
    </AuthProvider>
  );
}
