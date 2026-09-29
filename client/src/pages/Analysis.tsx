import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { AlertCircle, CheckCircle2, ArrowRight, BrainCircuit, Activity, Cpu } from "lucide-react";
import { useApp } from '../lib/store';
import NewAnalysisModal from '../components/NewAnalysisModal';
import ScheduleModal from '../components/ScheduleModal';

export default function Analysis() {
  const { schedules } = useApp();
  const [isModalOpen, setModalOpen] = useState(false);
  const [scheduleModalRec, setScheduleModalRec] = useState<string | null>(null);

  // Check if there's a schedule application for Floor 2
  const floor2Application = schedules.find(s => s.proposedSchedule.includes('18°C'));
  const applied = !!floor2Application;

  return (
    <div className="space-y-10 pb-12 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 stagger-1">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase mb-2">
            <BrainCircuit className="w-4 h-4" />
            <span>AI Core Engine</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Analysis & Intelligence
          </h1>
          <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
            Deep learning insights and automated recommendations based on recent thermal models and occupancy data.
          </p>
        </div>
        <Button 
          size="lg" 
          className="shrink-0 group shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-full px-8" 
          onClick={() => setModalOpen(true)}
        >
          <Activity className="w-5 h-5 mr-2" />
          Run Deep Analysis
        </Button>
      </div>

      <NewAnalysisModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <ScheduleModal isOpen={!!scheduleModalRec} onClose={() => setScheduleModalRec(null)} recommendation={scheduleModalRec || ''} />

      <div className="grid gap-8 stagger-2">
        <Card className={`glass-elevated overflow-hidden border-t-4 transition-all duration-300 ${applied ? "border-t-emerald-500 shadow-emerald-500/10" : "border-t-red-500 shadow-red-500/10"}`}>
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <Cpu className="w-48 h-48" />
          </div>
          <CardHeader className={`pb-5 border-b border-border/50 relative z-10 ${applied ? "bg-emerald-500/5" : "bg-red-500/5"}`}>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full shadow-sm ${applied ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30"}`}>
                {applied ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6 animate-pulse" />}
              </div>
              <div>
                <CardTitle className="text-xl font-bold">{applied ? "Heating Schedule Optimized" : "Critical Inefficiency Detected"}</CardTitle>
                <CardDescription className={`mt-1 font-medium ${applied ? "text-emerald-700/80 dark:text-emerald-400/80" : "text-red-700/80 dark:text-red-400/80"}`}>
                  {applied ? `Status: ${floor2Application?.status} • Saving ~450 kWh/week` : "High confidence (94%) • Projected waste: ~450 kWh/week"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 relative z-10">
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">AI Finding</h4>
                  <div className="bg-background/60 p-5 rounded-2xl border border-border/60 shadow-sm leading-relaxed text-foreground">
                    The machine learning model detected that <strong className="text-primary">Floor 2 heating remains at 21°C between 18:00 and 22:00</strong>, despite IoT occupancy sensors indicating that occupancy drops below 5% after 18:30 on weekdays.
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Data Sources Analyzed</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary/80 border border-border/50 text-foreground">IoT Occupancy Sensors (Floor 2)</span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary/80 border border-border/50 text-foreground">Historical HVAC Logs (30d)</span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary/80 border border-border/50 text-foreground">Thermal Retention Model</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 bg-secondary/30 p-6 rounded-2xl border border-border/50 shadow-inner flex flex-col justify-between backdrop-blur-sm">
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-5">Resolution Action</h4>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1 p-3 rounded-xl bg-background/50 border border-border/30">
                      <span className="text-xs font-semibold text-muted-foreground">Previous Schedule</span>
                      <span className="font-medium text-sm text-foreground opacity-70 line-through">Maintain 21°C until 22:00</span>
                    </div>
                    <div className="flex justify-center text-muted-foreground">
                       <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" />
                    </div>
                    <div className="flex flex-col space-y-1 p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <span className="text-xs font-semibold text-primary">Proposed Schedule</span>
                      <span className="font-bold text-sm text-primary">Drift to 18°C starting 18:30</span>
                    </div>
                    
                    {applied && (
                      <div className="flex justify-between items-center text-sm border-t border-border/50 pt-4 mt-2">
                        <span className="font-semibold text-muted-foreground">Current Status</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">{floor2Application?.status}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8">
                  <Button 
                    className={`w-full py-6 rounded-xl font-bold shadow-md transition-all ${applied ? 'bg-secondary text-muted-foreground hover:bg-secondary/80' : 'bg-primary text-white hover:bg-primary/90'}`}
                    onClick={() => setScheduleModalRec("Drift to 18°C starting 18:30")} 
                    disabled={applied} 
                  >
                    {applied ? "Application Processing..." : "Authorize Schedule Adjustment"} 
                    {!applied && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
