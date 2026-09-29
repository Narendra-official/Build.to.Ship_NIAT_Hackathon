import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ArrowRight, Activity, Zap, TrendingDown, Building, Moon, Sun, Leaf } from "lucide-react";
import { useApp } from "../lib/store";

export default function LandingPage() {
  const { theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden flex flex-col">
      {/* Sophisticated Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_100%)] opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto w-full glass-elevated sticky top-4 z-50 rounded-full border border-border/50 shadow-lg shadow-black/5 mt-4">
        <div className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <Building className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            WattWise
          </span>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors glass-secondary">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Log in
          </Link>
          <Link to="/register">
            <Button className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow bg-foreground text-background hover:bg-foreground/90 font-bold px-6">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-10 py-20 mt-10 w-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-8 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Leaf className="h-4 w-4" />
              <span>AI Engine for Sustainability</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-foreground leading-[1.05] mb-8 drop-shadow-sm">
              Stop cooling empty buildings.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 drop-shadow-md">Start saving energy.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed font-medium">
              Commercial buildings waste up to 30% of their energy. WattWise uses AI to analyze occupancy patterns, weather data, and thermal dynamics to optimize HVAC schedules automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 text-base w-full sm:w-auto shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl font-bold bg-primary text-white hover:bg-primary/90">
                  Start Optimizing <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-14 px-8 text-base w-full sm:w-auto glass-secondary hover:bg-background/80 rounded-xl font-bold border-border/50 text-foreground transition-all">
                  View Live Demo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 animate-fade-in-up stagger-2">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-primary/10 rounded-[2.5rem] transform rotate-3 scale-105 -z-10 blur-xl opacity-60"></div>
            <div className="glass-card p-10 rounded-[2rem] border border-border/50 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-10 border-b border-border/50 pb-6 relative z-10">
                <div>
                  <h3 className="font-extrabold text-2xl text-foreground tracking-tight">Impact Forecast</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Building A - Downtown Core</p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg text-sm font-bold flex items-center border border-emerald-500/20 shadow-sm">
                  <TrendingDown className="w-5 h-5 mr-1.5" />
                  -24% Energy
                </div>
              </div>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start group">
                  <div className="bg-blue-500/10 p-3.5 rounded-2xl mr-5 border border-blue-500/20 group-hover:scale-110 transition-transform shadow-sm">
                    <Activity className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-1">Data Pipeline</h4>
                    <p className="text-foreground font-bold text-lg tracking-tight">IoT Sensors + Weather API</p>
                  </div>
                </div>
                
                <div className="ml-[1.35rem] border-l-2 border-dashed border-border h-8 -my-4 relative"></div>
                
                <div className="flex items-start group">
                  <div className="bg-purple-500/10 p-3.5 rounded-2xl mr-5 border border-purple-500/20 group-hover:scale-110 transition-transform shadow-sm">
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-1">AI Processing</h4>
                    <p className="text-foreground font-bold text-lg tracking-tight">Predictive Thermal Model</p>
                  </div>
                </div>

                <div className="ml-[1.35rem] border-l-2 border-dashed border-border h-8 -my-4 relative"></div>

                <div className="flex items-start group">
                  <div className="bg-amber-500/10 p-3.5 rounded-2xl mr-5 border border-amber-500/20 group-hover:scale-110 transition-transform shadow-sm">
                    <Building className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-1">Action Output</h4>
                    <p className="text-foreground font-bold text-lg tracking-tight">Optimize HVAC Schedule</p>
                  </div>
                </div>
                
                <div className="ml-[1.35rem] border-l-2 border-dashed border-border h-8 -my-4 relative"></div>

                <div className="flex items-start group bg-emerald-500/5 p-4 -ml-4 rounded-2xl border border-emerald-500/10">
                  <div className="bg-emerald-500/10 p-3.5 rounded-2xl mr-5 border border-emerald-500/20 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <Leaf className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="self-center">
                    <h4 className="font-bold text-xs text-emerald-700/70 dark:text-emerald-400/70 uppercase tracking-wider mb-1">Target Result</h4>
                    <p className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl tracking-tight">24% Energy Reduction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
