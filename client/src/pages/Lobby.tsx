import { Leaf, BatteryCharging, Trophy } from "lucide-react";

export default function Lobby() {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden relative selection:bg-none">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="z-10 text-center space-y-12 max-w-5xl px-8">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]">
            <Leaf className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          We are building a <br/> greener future today.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-500">
            <BatteryCharging className="w-12 h-12 text-emerald-400 mb-6" />
            <h3 className="text-2xl text-white/60 font-semibold uppercase tracking-widest mb-2">Energy Saved Today</h3>
            <p className="text-6xl font-extrabold text-emerald-400">450 kWh</p>
            <p className="mt-4 text-white/50 text-lg font-medium">Equivalent to powering 15 homes.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-500">
            <Trophy className="w-12 h-12 text-amber-400 mb-6" />
            <h3 className="text-2xl text-white/60 font-semibold uppercase tracking-widest mb-2">Community Goal</h3>
            <p className="text-6xl font-extrabold text-amber-400">92%</p>
            <p className="mt-4 text-white/50 text-lg font-medium">To our monthly carbon neutral target.</p>
          </div>
        </div>

        <p className="text-white/40 text-xl font-medium mt-16 animate-bounce">
          Help us by turning off lights in unoccupied meeting rooms.
        </p>
      </div>
    </div>
  );
}
