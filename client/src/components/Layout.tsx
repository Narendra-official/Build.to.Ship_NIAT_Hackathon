import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Activity, History, Settings, LogOut, Building2, Moon, Sun, User as UserIcon, Menu, X, Wrench, Leaf, Map } from "lucide-react";
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
    { name: "Portfolio", path: "/portfolio", icon: Map },
    { name: "Analyses", path: "/analysis", icon: Activity },
    { name: "Hardware", path: "/hardware", icon: Wrench },
    { name: "Offsets", path: "/offsets", icon: Leaf },
    { name: "Reports", path: "/history", icon: History },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden text-foreground">
      {/* Sophisticated Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-background/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.02)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
      </div>

      {/* Top Header */}
      <header className="h-16 glass sticky top-0 z-40 border-b border-border/40 px-6 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-primary/20 transition-transform group-hover:scale-105">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground hidden sm:block">
              WattWise
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-md transition-all duration-300 text-sm font-medium flex items-center space-x-2 ${
                    isActive
                      ? "bg-foreground/5 text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'opacity-70'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1.5 pr-3 rounded-md hover:bg-foreground/5 transition-all border border-transparent"
            >
              <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs border border-primary/20">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-foreground">{user?.name}</span>
            </button>
            
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-56 glass-elevated rounded-xl shadow-xl border border-border/50 z-50 overflow-hidden transform origin-top-right transition-all">
                  <div className="px-4 py-3 border-b border-border/50 bg-foreground/5">
                    <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link onClick={() => setProfileOpen(false)} to="/profile" className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">
                      <UserIcon className="w-4 h-4 mr-3" /> Profile
                    </Link>
                    <Link onClick={() => setProfileOpen(false)} to="/settings" className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">
                      <Settings className="w-4 h-4 mr-3" /> Settings
                    </Link>
                  </div>
                  <div className="py-1 border-t border-border/50">
                    <button onClick={() => { setProfileOpen(false); handleLogout(); }} className="flex w-full items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut className="w-4 h-4 mr-3" /> Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-foreground/5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-xl pt-24 px-6 flex flex-col">
          <button className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground glass-secondary rounded-full" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
               const isActive = location.pathname === item.path;
               return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center text-xl font-semibold py-4 border-b border-border/30 ${isActive ? 'text-primary' : 'text-foreground'}`}
                >
                  <item.icon className="w-6 h-6 mr-4 opacity-80" />
                  {item.name}
                </Link>
               )
            })}
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-xl font-semibold py-4 border-b border-border/30 text-foreground">
              <UserIcon className="w-6 h-6 mr-4 opacity-80" />
              Profile
            </Link>
            <button onClick={handleLogout} className="flex items-center text-xl font-semibold text-destructive py-4 text-left">
              <LogOut className="w-6 h-6 mr-4 opacity-80" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 z-0 relative">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
