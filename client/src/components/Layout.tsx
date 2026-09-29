import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Activity, History, Settings, LogOut, Building2, Moon, Sun, User as UserIcon, Menu } from "lucide-react";
import { useApp } from "../lib/store";
import { useState } from "react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, theme, toggleTheme } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Analyses", path: "/analysis", icon: Activity },
    { name: "Reports", path: "/history", icon: History },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden text-foreground">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

      {/* Top Header */}
      <header className="h-16 glass border-b border-border flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary tracking-tight hidden sm:block">WattWise</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1 pr-3 rounded-full hover:bg-secondary transition-colors border border-transparent hover:border-border"
            >
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-sm">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-foreground">{user?.name}</span>
            </button>
            
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-56 bg-background rounded-xl shadow-lg border border-border z-50 overflow-hidden glass-card">
                  <div className="px-4 py-3 border-b border-border bg-muted/30">
                    <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link onClick={() => setProfileOpen(false)} to="/profile" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-secondary">
                      <UserIcon className="w-4 h-4 mr-2 text-muted-foreground" /> Profile
                    </Link>
                    <Link onClick={() => setProfileOpen(false)} to="/settings" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-secondary">
                      <Settings className="w-4 h-4 mr-2 text-muted-foreground" /> Settings
                    </Link>
                  </div>
                  <div className="py-1 border-t border-border">
                    <button onClick={() => { setProfileOpen(false); handleLogout(); }} className="flex w-full items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-md pt-20 px-6">
          <button className="absolute top-6 right-6 p-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-foreground py-2 border-b border-border/50"
              >
                {item.name}
              </Link>
            ))}
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-foreground py-2 border-b border-border/50">
              Profile
            </Link>
            <button onClick={handleLogout} className="text-2xl font-bold text-destructive py-2 text-left">
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 z-0">
        <Outlet />
      </main>
    </div>
  );
}

// Ensure X icon is available for mobile menu
import { X } from 'lucide-react';
