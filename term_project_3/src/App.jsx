import { useState } from "react";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      <nav className="navbar">
        <h1>Malama Waikiki Resort</h1>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("adminLogin")}>Admin Login</button>
          <button onClick={() => setPage("adminDashboard")}>
            Admin Dashboard
          </button>
        </div>
      </nav>

      {page === "home" && <Home />}
      {page === "adminLogin" && <AdminLogin setPage={setPage} />}
      {page === "adminDashboard" && <AdminDashboard />}
    </div>
  );
}

export default App;