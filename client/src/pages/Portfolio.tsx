import { Map, Building, Activity, Zap } from "lucide-react";

export default function Portfolio() {
  const buildings = [
    { id: 1, name: "HQ Downtown", status: "A+", energy: "240 kWh/day", savings: "$1,200", coord: { top: '40%', left: '30%' } },
    { id: 2, name: "Westside Hub", status: "B", energy: "450 kWh/day", savings: "$400", coord: { top: '60%', left: '50%' } },
    { id: 3, name: "North Campus", status: "F", energy: "890 kWh/day", savings: "Requires Optimization", coord: { top: '30%', left: '70%' }, critical: true },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in-up h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase mb-2 w-fit">
          <Map className="w-4 h-4" />
          <span>Global Overview</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Portfolio Management
        </h1>
      </div>

      <div className="flex-1 glass-card rounded-3xl border border-border/60 shadow-xl overflow-hidden relative flex">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-secondary/20 dark:bg-zinc-900/40">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="relative w-full h-full p-8 flex flex-col lg:flex-row gap-8 z-10">
          {/* Map Area */}
          <div className="flex-1 relative bg-background/40 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Map Nodes */}
            {buildings.map(b => (
              <div 
                key={b.id} 
                className="absolute flex flex-col items-center group cursor-pointer"
                style={{ top: b.coord.top, left: b.coord.left }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${b.critical ? 'bg-red-500 text-white animate-pulse' : 'bg-primary text-white'}`}>
                  <Building className="w-8 h-8" />
                </div>
                <div className="mt-2 px-3 py-1 glass-elevated rounded-lg text-sm font-bold shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {b.name}
                </div>
              </div>
            ))}
            <span className="text-muted-foreground font-bold tracking-widest uppercase opacity-30 text-2xl pointer-events-none">Interactive Global Map</span>
          </div>

          {/* List Area */}
          <div className="w-full lg:w-96 flex flex-col space-y-4 overflow-y-auto">
            {buildings.map(b => (
              <div key={b.id} className={`glass-elevated p-5 rounded-2xl border ${b.critical ? 'border-red-500/50' : 'border-border/50'} transition-transform hover:-translate-y-1`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{b.name}</h3>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${b.status === 'A+' ? 'bg-emerald-500/20 text-emerald-600' : b.status === 'F' ? 'bg-red-500/20 text-red-600' : 'bg-orange-500/20 text-orange-600'}`}>
                    Grade {b.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center"><Zap className="w-4 h-4 mr-1"/> Usage</span>
                    <span className="font-semibold">{b.energy}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center"><Activity className="w-4 h-4 mr-1"/> AI Status</span>
                    <span className={`font-semibold ${b.critical ? 'text-red-500' : 'text-primary'}`}>{b.savings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
