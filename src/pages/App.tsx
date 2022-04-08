import { Route, Routes } from "react-router-dom";

import { LandingsPage } from "./LadingsPage";
import { Login } from "./Login";

import { RequireAuth } from "../common/components/RequiredAuth";
import { AuthProvider } from "../common/hooks/Auth";

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <LandingsPage />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}
