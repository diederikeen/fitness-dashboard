import { Route, Routes } from "react-router-dom";

import { LandingsPage } from "./LadingsPage";
import { Login } from "./Login";

export function App() {
  return (

      <Routes>
        <Route path="/" element={<LandingsPage/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
  )
}
