import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ArrowRight, Activity, Zap, TrendingDown, Building, Moon, Sun, Leaf } from "lucide-react";
import { useApp } from "../lib/store";

export default function LandingPage() {
  const { theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto glass sticky top-0 z-50 rounded-b-2xl border-x border-b border-border shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Building className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-primary">WattWise</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Log in
          </Link>
          <Link to="/register">
            <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6 border border-emerald-500/20">
              <Leaf className="h-4 w-4" />
              <span>AI for Sustainability</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Stop cooling empty buildings.<br />
              <span className="text-emerald-500">Start saving energy.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Commercial buildings waste up to 30% of their energy. WattWise uses AI to analyze your occupancy patterns, weather data, and thermal dynamics to optimize HVAC schedules automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 text-base w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                  Start Optimizing <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-14 px-8 text-base w-full sm:w-auto bg-background/50 backdrop-blur-sm">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-primary/10 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                <div>
                  <h3 className="font-bold text-xl text-foreground">AI Impact Forecast</h3>
                  <p className="text-sm text-muted-foreground mt-1">Building A - Downtown</p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-md text-sm font-bold flex items-center border border-emerald-500/20">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -24% Energy
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-blue-500/10 p-3 rounded-xl mr-5 border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-1">Data Input</h4>
                    <p className="text-foreground font-semibold">IoT Sensors + Weather API</p>
                  </div>
                </div>
                
                <div className="ml-7 border-l-2 border-dashed border-border h-6 -my-2"></div>
                
                <div className="flex items-start group">
                  <div className="bg-purple-500/10 p-3 rounded-xl mr-5 border border-purple-500/20 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-1">AI Analysis</h4>
                    <p className="text-foreground font-semibold">Predictive Thermal Model</p>
                  </div>
                </div>

                <div className="ml-7 border-l-2 border-dashed border-border h-6 -my-2"></div>

                <div className="flex items-start group">
                  <div className="bg-amber-500/10 p-3 rounded-xl mr-5 border border-amber-500/20 group-hover:scale-110 transition-transform">
                    <Building className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-1">Recommendation</h4>
                    <p className="text-foreground font-semibold">Optimize HVAC Schedule</p>
                  </div>
                </div>
                
                <div className="ml-7 border-l-2 border-dashed border-border h-6 -my-2"></div>

                <div className="flex items-start group">
                  <div className="bg-emerald-500/10 p-3 rounded-xl mr-5 border border-emerald-500/20 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Leaf className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-1">Environmental Impact</h4>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold">24% potential energy reduction</p>
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
