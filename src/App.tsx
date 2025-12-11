import { useState } from "react";
import AuthPage from "./components/AuthPage";
import CustomerDashboard from "./components/CustomerDashboard";
import {InstallerDashboard} from "./components/InstallerDashboard";
import {OfficerDashboard} from "./components/OfficerDashboard";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "installer" | "officer";
}

export default function App() {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  if (!user) {
    // Show login/register page until user logs in
    return <AuthPage onLogin={handleLogin} />;
  }

  // Show dashboards by role
  switch (user.role) {
    case "customer":
      return <CustomerDashboard user={user} onLogout={handleLogout} />;
    case "installer":
      return <InstallerDashboard user={user} onLogout={handleLogout} />;
    case "officer":
      return <OfficerDashboard user={user} onLogout={handleLogout} />;
    default:
      return <AuthPage onLogin={handleLogin} />;
  }
}
