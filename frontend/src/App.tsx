import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard.tsx";
import { useState } from "react";
import type { User } from "./types";


const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearAuth = () => {
    try {
      localStorage.removeItem("  ");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error("clearAuth error:", error);
    }
    setUser(null);
    setToken(null); 

  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <Routes>
      <Route element={<Layout/>}>
          <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
