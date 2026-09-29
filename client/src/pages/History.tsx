import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { History as HistoryIcon, Clock, ShieldCheck, Activity } from "lucide-react";
import { useApp } from '../lib/store';

export default function History() {
  const { actionLog } = useApp();

  return (
    <div className="space-y-8 pb-12 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 stagger-1">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-2">
            <HistoryIcon className="w-4 h-4" />
            <span>Audit Trail</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            System History
          </h1>
          <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
            A comprehensive, immutable log of AI-driven optimizations and manual configuration changes.
          </p>
        </div>
      </div>

      <div className="stagger-2">
        <Card className="glass-elevated overflow-hidden border-border/50 shadow-xl rounded-[1.5rem]">
          <CardHeader className="bg-muted/30 border-b border-border/50 flex flex-row items-center justify-between pb-5">
            <div>
              <CardTitle className="text-lg font-bold">Action Log</CardTitle>
              <CardDescription className="mt-1 font-medium text-muted-foreground">Historical actions and their estimated impact.</CardDescription>
            </div>
            <div className="bg-background/80 px-3 py-1.5 rounded-lg border border-border/50 shadow-sm flex items-center space-x-2">
               <ShieldCheck className="w-4 h-4 text-emerald-500" />
               <span className="text-xs font-bold text-foreground">Verified</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-background/80 backdrop-blur-xl text-muted-foreground border-b border-border/50 text-xs uppercase font-bold tracking-wider sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Action Taken</th>
                    <th className="px-6 py-4">Trigger Source</th>
                    <th className="px-6 py-4 text-right">Estimated Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {actionLog.map((row) => (
                    <tr key={row.id} className="hover:bg-secondary/40 transition-all group duration-200">
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <Clock className="w-4 h-4 opacity-50" />
                          <span className="font-medium text-foreground">{row.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{row.action}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${
                          row.type.includes('AI') 
                            ? 'bg-primary/10 text-primary border-primary/20' 
                            : 'bg-secondary text-muted-foreground border-border/50'
                        }`}>
                          {row.type.includes('AI') && <Activity className="w-3 h-3 mr-1.5" />}
                          {row.type}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="inline-flex items-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                          {row.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {actionLog.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center">
                         <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
                           <HistoryIcon className="w-6 h-6 text-muted-foreground" />
                         </div>
                         <p className="text-muted-foreground font-medium">No actions recorded yet.</p>
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
