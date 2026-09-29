import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Zap, TrendingDown, TrendingUp, Leaf, AlertCircle, Droplets, Trash2, Plus, ArrowRight, Activity, BarChart2, CalendarClock } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
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
    <div className="space-y-8 pb-8 relative z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">WattWise Sustainability Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Monitor and optimize your environmental impact in real-time.</p>
        </div>
        <Button size="lg" className="shrink-0 group shadow-lg shadow-primary/20 hover:shadow-primary/30" onClick={() => setModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" />
          New Analysis
        </Button>
      </div>

      <NewAnalysisModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <ViewAnalysisModal analysis={viewAnalysis} onClose={() => setViewAnalysis(null)} />
      <ScheduleModal isOpen={!!scheduleModalRec} onClose={() => setScheduleModalRec(null)} recommendation={scheduleModalRec || ''} />

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Energy Usage</p>
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{energyMWh} <span className="text-lg font-medium text-muted-foreground">MWh</span></div>
              {analyses.length > 1 && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center">
                  <span className="text-green-500 flex items-center font-medium bg-green-500/10 px-2 py-0.5 rounded mr-2">
                    <TrendingDown className="mr-1 h-4 w-4" /> 8.4%
                  </span>
                  from previous
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Water Usage</p>
              <div className="bg-cyan-500/10 p-2 rounded-lg">
                <Droplets className="h-5 w-5 text-cyan-500" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{waterKL} <span className="text-lg font-medium text-muted-foreground">kL</span></div>
              {analyses.length > 1 && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center">
                  <span className="text-green-500 flex items-center font-medium bg-green-500/10 px-2 py-0.5 rounded mr-2">
                    <TrendingDown className="mr-1 h-4 w-4" /> 4.2%
                  </span>
                  from previous
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Waste Generated</p>
              <div className="bg-amber-500/10 p-2 rounded-lg">
                <Trash2 className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{wasteTons} <span className="text-lg font-medium text-muted-foreground">tons</span></div>
              {analyses.length > 1 && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center">
                  <span className="text-red-500 flex items-center font-medium bg-red-500/10 px-2 py-0.5 rounded mr-2">
                    <TrendingUp className="mr-1 h-4 w-4" /> 1.5%
                  </span>
                  from previous
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 -z-10 dark:from-emerald-500/10 dark:to-emerald-500/5"></div>
          <CardContent className="p-6 flex flex-col justify-between h-full z-10 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">CO₂ Impact</p>
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-800 dark:text-emerald-300">{co2Impact} <span className="text-lg font-medium text-emerald-600 dark:text-emerald-500">tons avoided</span></div>
              <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80 mt-2 font-medium">
                Calculated from latest AI analysis.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: Charts & AI Insights */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b border-border bg-muted/50 pb-4 rounded-t-xl">
            <CardTitle className="text-lg">Resource Consumption</CardTitle>
            <CardDescription className="mt-1">Historical trends of your analyses</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col">
            {chartData.length > 0 ? (
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                    <Bar dataKey="Energy" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Electricity (kWh)" />
                    <Bar dataKey="Water" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Water (Scaled)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                <BarChart2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium mb-4">No sustainability data available yet.</p>
                <Button onClick={() => setModalOpen(true)} variant="outline" className="bg-background/50">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Analysis
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* AI Insights */}
        <Card className="flex flex-col border-emerald-500/20 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent -z-10"></div>
          <CardHeader className="bg-emerald-500/10 border-b border-emerald-500/20 pb-4 rounded-t-xl z-10">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <CardTitle className="text-lg text-emerald-900 dark:text-emerald-100">AI Sustainability Insights</CardTitle>
            </div>
            <CardDescription className="text-emerald-700/80 dark:text-emerald-300/80 mt-1">Recommendations require your attention.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col gap-4 overflow-y-auto max-h-[350px] z-10 custom-scrollbar">
            {latestAnalysis?.result?.aiRecommendations?.map((rec, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md hover:border-emerald-500/50 transition-colors group shadow-sm">
                <h4 className="font-semibold text-sm text-primary mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">AI Insight</h4>
                
                <p className="text-xs font-semibold text-muted-foreground mt-2">Problem detected:</p>
                <p className="text-sm text-red-600 dark:text-red-400 mb-2">{latestAnalysis.result?.sustainabilityProblems?.[0] || 'Inefficiency detected.'}</p>
                
                <p className="text-xs font-semibold text-muted-foreground">Recommendation:</p>
                <p className="text-sm text-foreground mb-3">{rec}</p>

                <p className="text-xs font-semibold text-muted-foreground">Estimated Impact:</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-3">Potential savings of ~${latestAnalysis.result?.estimatedCostSavings}</p>

                <Button variant="outline" size="sm" className="w-full text-xs bg-background/50 group-hover:bg-emerald-500/10 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all" onClick={() => setScheduleModalRec(rec)}>
                  Apply Schedule <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )) || (
              <div className="text-center text-muted-foreground py-8">Run an analysis to generate AI insights.</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Schedule Applications & Analysis History */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="border-b border-border bg-muted/50 pb-4 rounded-t-xl flex justify-between items-center flex-row">
            <CardTitle className="text-lg">Schedule Applications</CardTitle>
            <CalendarClock className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground border-b border-border text-xs uppercase font-semibold sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4">Building</th>
                    <th className="px-6 py-4">Proposed Schedule</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {schedules.map(app => (
                    <tr key={app.id} className="hover:bg-muted/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {app.building}
                        <div className="text-xs text-muted-foreground font-normal">{app.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-muted-foreground line-through opacity-70">{app.previousSchedule}</div>
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mt-1">{app.proposedSchedule}</div>
                      </td>
                      <td className="px-6 py-4">
                        {app.status === 'Pending Approval' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">Pending Approval</span>}
                        {app.status === 'Approved' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">Approved</span>}
                        {app.status === 'Applied' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Applied ✓</span>}
                      </td>
                    </tr>
                  ))}
                  {schedules.length === 0 && (
                     <tr>
                       <td colSpan={3} className="px-6 py-8 text-center">
                         <p className="text-muted-foreground text-sm">No schedule applications submitted yet.</p>
                       </td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="border-b border-border bg-muted/50 pb-4 rounded-t-xl flex justify-between items-center flex-row">
            <CardTitle className="text-lg">Recent Analyses</CardTitle>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground border-b border-border text-xs uppercase font-semibold sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4">Analysis Name</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {analyses.slice(0, 5).map(analysis => (
                    <tr key={analysis.id} className="hover:bg-muted/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {analysis.name}
                        <div className="text-xs text-muted-foreground font-normal">{analysis.building}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{analysis.date}</td>
                      <td className="px-6 py-4">
                        {analysis.status === 'Completed' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Completed</span>}
                        {analysis.status === 'Issues Found' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">Issues Found</span>}
                        {analysis.status === 'Processing' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400"><Activity className="w-3 h-3 mr-1 animate-spin"/> Processing</span>}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end space-x-2">
                        {analysis.status !== 'Processing' && (
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => setViewAnalysis(analysis)}>
                            View
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {analyses.length === 0 && (
                     <tr>
                       <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground text-sm">
                         No sustainability analyses yet.
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
