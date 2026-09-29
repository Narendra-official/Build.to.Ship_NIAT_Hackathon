import { useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Zap, TrendingDown, TrendingUp, Leaf, AlertCircle, Droplets, Trash2, Plus, ArrowRight, Activity, BarChart2, CalendarClock, ShieldCheck } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useApp } from '../lib/store';
import type { Analysis } from '../lib/store';
import NewAnalysisModal from '../components/NewAnalysisModal';
import ViewAnalysisModal from '../components/ViewAnalysisModal';
import ScheduleModal from '../components/ScheduleModal';

export default function Dashboard() {
  const { analyses, schedules } = useApp();
  const [isModalOpen, setModalOpen] = useState(false);
  const [viewAnalysis, setViewAnalysis] = useState<Analysis | null>(null);
  const [scheduleModalRec, setScheduleModalRec] = useState<string | null>(null);

  // Dynamic KPIs based on the latest analysis if it exists
  const latestAnalysis = analyses[0];
  const energyMWh = latestAnalysis?.inputs?.electricity ? (Number(latestAnalysis.inputs.electricity) / 1000).toFixed(1) : "0.0";
  const waterKL = latestAnalysis?.inputs?.water ? Number(latestAnalysis.inputs.water).toFixed(0) : "0";
  const wasteTons = latestAnalysis?.inputs?.waste ? Number(latestAnalysis.inputs.waste).toFixed(1) : "0.0";
  const co2Impact = latestAnalysis?.result?.estimatedCO2Reduction ? latestAnalysis.result.estimatedCO2Reduction.toFixed(1) : "0.0";

  // Build chart data from analyses history
  const chartData = [...analyses].reverse().map(a => ({
    name: a.name.length > 15 ? a.name.substring(0, 15) + '...' : a.name,
    Energy: a.inputs?.electricity ? Number(a.inputs.electricity) : 0,
    Water: a.inputs?.water ? Number(a.inputs.water) * 10 : 0, // Scaled for visibility
  }));

  return (
    <div className="space-y-10 pb-12 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 stagger-1">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>System Active</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Command Center
          </h1>
          <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
            Monitor, analyze, and optimize your organization's environmental impact in real-time.
          </p>
        </div>
        <Button 
          size="lg" 
          className="shrink-0 group shadow-sm transition-all duration-300" 
          onClick={() => setModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90 duration-300" />
          <span className="font-semibold text-white">New Analysis</span>
        </Button>
      </div>

      <NewAnalysisModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <ViewAnalysisModal analysis={viewAnalysis} onClose={() => setViewAnalysis(null)} />
      <ScheduleModal isOpen={!!scheduleModalRec} onClose={() => setScheduleModalRec(null)} recommendation={scheduleModalRec || ''} />

      {/* Primary Impact Metric */}
      <div className="stagger-2">
        <div className="glass-panel relative overflow-hidden p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-border/60">
          <div className="flex-1 space-y-4 z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl border border-primary/20">
                <Leaf className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Total CO₂ Impact Avoided</h2>
            </div>
            <div className="flex items-baseline space-x-3">
              <span className="text-6xl sm:text-7xl font-semibold tracking-tight text-foreground">
                {co2Impact}
              </span>
              <span className="text-2xl font-medium text-muted-foreground">tons</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground flex items-center">
              <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md mr-2 flex items-center font-semibold text-xs">
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> 12.4%
              </span>
              improvement vs previous period
            </p>
          </div>
          
          <div className="w-full md:w-1/3 z-10 bg-background/50 rounded-2xl p-6 border border-border/50 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-muted-foreground">Reduction Goal Progress</span>
              <span className="text-sm font-semibold text-primary">68%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[68%] rounded-full transition-all duration-1000 ease-out"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">On track to meet annual sustainability targets.</p>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-6 md:grid-cols-3 stagger-3">
        <Card className="glass-card flex flex-col p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Energy Usage</p>
            <div className="bg-foreground/5 p-2 rounded-lg text-foreground/70">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-foreground tracking-tight">{energyMWh} <span className="text-lg font-medium text-muted-foreground">MWh</span></div>
            {analyses.length > 1 && (
              <div className="mt-2 flex items-center text-sm font-medium">
                <span className="text-primary flex items-center mr-2">
                  <TrendingDown className="mr-1 h-3.5 w-3.5" /> 8.4%
                </span>
                <span className="text-muted-foreground">vs previous</span>
              </div>
            )}
          </div>
        </Card>
        
        <Card className="glass-card flex flex-col p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Water Usage</p>
            <div className="bg-foreground/5 p-2 rounded-lg text-foreground/70">
              <Droplets className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-foreground tracking-tight">{waterKL} <span className="text-lg font-medium text-muted-foreground">kL</span></div>
            {analyses.length > 1 && (
              <div className="mt-2 flex items-center text-sm font-medium">
                <span className="text-primary flex items-center mr-2">
                  <TrendingDown className="mr-1 h-3.5 w-3.5" /> 4.2%
                </span>
                <span className="text-muted-foreground">vs previous</span>
              </div>
            )}
          </div>
        </Card>

        <Card className="glass-card flex flex-col p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Waste Gen</p>
            <div className="bg-foreground/5 p-2 rounded-lg text-foreground/70">
              <Trash2 className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-foreground tracking-tight">{wasteTons} <span className="text-lg font-medium text-muted-foreground">tons</span></div>
            {analyses.length > 1 && (
              <div className="mt-2 flex items-center text-sm font-medium">
                <span className="text-red-500 flex items-center mr-2">
                  <TrendingUp className="mr-1 h-3.5 w-3.5" /> 1.5%
                </span>
                <span className="text-muted-foreground">vs previous</span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Main Insights & Trends */}
      <div className="grid gap-6 lg:grid-cols-3 stagger-4">
        {/* Main Trend Visualization */}
        <Card className="lg:col-span-2 glass-card flex flex-col border border-border/50 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-border/40 bg-foreground/5 flex justify-between items-center">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Resource Trends</CardTitle>
              <CardDescription className="text-xs mt-0.5">Historical consumption analysis over time</CardDescription>
            </div>
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-muted-foreground bg-background border border-border">Electricity</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-muted-foreground bg-background border border-border">Water</span>
            </div>
          </div>
          <CardContent className="p-6 flex-1 flex flex-col min-h-[350px]">
            {chartData.length > 0 ? (
              <div className="w-full h-full flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: '1px solid hsl(var(--border))', 
                        backgroundColor: 'rgba(var(--background), 0.95)',
                        backdropFilter: 'blur(12px)', 
                        color: 'hsl(var(--foreground))', 
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
                        fontWeight: 600
                      }} 
                    />
                    <Area type="monotone" dataKey="Energy" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEnergy)" activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }} />
                    <Area type="monotone" dataKey="Water" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" activeDot={{ r: 6, strokeWidth: 0, fill: '#06b6d4' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center h-full">
                <BarChart2 className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium mb-6 text-lg">No sustainability data available yet.</p>
                <Button onClick={() => setModalOpen(true)} className="rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Initialize First Analysis
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* AI Insight Panel */}
        <Card className="glass-card flex flex-col overflow-hidden border border-border/60 shadow-sm group">
          <div className="px-5 py-4 border-b border-border/40 bg-primary/5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <CardTitle className="text-sm font-semibold text-foreground tracking-tight">AI Insights</CardTitle>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Live Data</span>
          </div>
          
          <CardContent className="p-0 flex-1 flex flex-col z-10">
            <div className="overflow-y-auto max-h-[400px] custom-scrollbar p-4 space-y-4">
              {latestAnalysis?.result?.aiRecommendations?.map((rec, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm shadow-sm transition-all hover:bg-background">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-sm text-foreground">Recommendation</h4>
                    <span className="text-primary text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-primary/10 rounded">Actionable</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Issue</p>
                      <p className="text-xs text-foreground/80">
                        {latestAnalysis.result?.sustainabilityProblems?.[0] || 'Suboptimal resource allocation detected.'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Solution</p>
                      <p className="text-sm font-medium text-foreground leading-relaxed">{rec}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-border/40 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Est. Savings</p>
                        <p className="text-sm font-semibold text-primary">${latestAnalysis.result?.estimatedCostSavings}</p>
                      </div>
                      <Button size="sm" variant="secondary" className="rounded-lg text-xs h-8 group/btn" onClick={() => setScheduleModalRec(rec)}>
                        Apply <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )) || (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 min-h-[300px]">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="w-8 h-8 text-primary opacity-50" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">No insights available</p>
                    <p className="text-sm text-muted-foreground mt-1">Run an analysis to generate AI-driven recommendations.</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History & Applications Data Tables */}
      <div className="grid gap-6 lg:grid-cols-2 stagger-5">
        <Card className="glass-card flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-border/50 bg-muted/30 flex justify-between items-center">
            <CardTitle className="text-lg font-bold">Schedule Applications</CardTitle>
            <CalendarClock className="w-5 h-5 text-muted-foreground" />
          </div>
          <CardContent className="p-0 flex-1">
            <div className="overflow-x-auto max-h-80 overflow-y-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-background/80 backdrop-blur-md text-muted-foreground border-b border-border/50 text-xs uppercase font-bold tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4">Building</th>
                    <th className="px-6 py-4">Proposed Schedule</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {schedules.map(app => (
                    <tr key={app.id} className="hover:bg-secondary/40 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground">{app.building}</div>
                        <div className="text-xs text-muted-foreground font-medium mt-1">{app.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-muted-foreground line-through opacity-70 mb-1">{app.previousSchedule}</div>
                        <div className="text-foreground font-medium text-sm">{app.proposedSchedule}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {app.status === 'Pending Approval' && <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">Pending</span>}
                        {app.status === 'Approved' && <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm">Approved</span>}
                        {app.status === 'Applied' && <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">Applied ✓</span>}
                      </td>
                    </tr>
                  ))}
                  {schedules.length === 0 && (
                     <tr>
                       <td colSpan={3} className="px-6 py-12 text-center">
                         <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
                           <CalendarClock className="w-6 h-6 text-muted-foreground" />
                         </div>
                         <p className="text-muted-foreground font-medium">No schedule applications submitted yet.</p>
                       </td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-border/50 bg-muted/30 flex justify-between items-center">
            <CardTitle className="text-lg font-bold">Recent Analyses</CardTitle>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </div>
          <CardContent className="p-0 flex-1">
            <div className="overflow-x-auto max-h-80 overflow-y-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-background/80 backdrop-blur-md text-muted-foreground border-b border-border/50 text-xs uppercase font-bold tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4">Analysis Name</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {analyses.slice(0, 5).map(analysis => (
                    <tr key={analysis.id} className="hover:bg-secondary/40 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground truncate max-w-[200px]">{analysis.name}</div>
                        <div className="text-xs text-muted-foreground font-medium mt-1">{analysis.building} &bull; {analysis.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        {analysis.status === 'Completed' && <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Completed</span>}
                        {analysis.status === 'Issues Found' && <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Issues Found</span>}
                        {analysis.status === 'Processing' && <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"><Activity className="w-3 h-3 mr-1 animate-spin"/> Processing</span>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {analysis.status !== 'Processing' && (
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-semibold rounded-full hover:bg-background shadow-sm border border-transparent hover:border-border transition-all" onClick={() => setViewAnalysis(analysis)}>
                            View Report
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {analyses.length === 0 && (
                     <tr>
                       <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
                         <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
                           <BarChart2 className="w-6 h-6 text-muted-foreground" />
                         </div>
                         <p className="font-medium">No sustainability analyses yet.</p>
                       </td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
