import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import HardwareHealth from "./pages/HardwareHealth";
import Offsets from "./pages/Offsets";
import Portfolio from "./pages/Portfolio";
import Lobby from "./pages/Lobby";
import { AppProvider, useApp } from "./lib/store";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loadingAuth } = useApp();
  
  if (loadingAuth) {
    return <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-gray-500">Checking authentication...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AppProvider>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lobby" element={<Lobby />} />
          
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/history" element={<History />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/hardware" element={<HardwareHealth />} />
            <Route path="/offsets" element={<Offsets />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
      <Analytics />
    </AppProvider>
  );
}

export default App;
