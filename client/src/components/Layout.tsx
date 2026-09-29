import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Activity, History, Settings, LogOut, Building2, Moon, Sun, User as UserIcon, Menu, X } from "lucide-react";
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
      {/* Sophisticated Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_100%)] opacity-50" />
      </div>

      {/* Top Header */}
      <header className="h-[72px] glass-elevated border-b border-border/50 flex items-center justify-between px-6 sm:px-8 sticky top-0 z-40">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 hidden sm:block">
              WattWise
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium relative ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'opacity-70'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <span className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors glass-secondary">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1 pr-3 rounded-full hover:bg-secondary/50 transition-all border border-transparent hover:border-border glass-secondary"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-foreground">{user?.name}</span>
            </button>
            
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                <div className="absolute right-0 mt-3 w-64 bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 z-50 overflow-hidden transform origin-top-right transition-all">
                  <div className="px-4 py-4 border-b border-border/50 bg-secondary/30">
                    <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link onClick={() => setProfileOpen(false)} to="/profile" className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                      <UserIcon className="w-4 h-4 mr-3" /> Profile
                    </Link>
                    <Link onClick={() => setProfileOpen(false)} to="/settings" className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                      <Settings className="w-4 h-4 mr-3" /> Settings
                    </Link>
                  </div>
                  <div className="py-2 border-t border-border/50">
                    <button onClick={() => { setProfileOpen(false); handleLogout(); }} className="flex w-full items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut className="w-4 h-4 mr-3" /> Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground glass-secondary rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
