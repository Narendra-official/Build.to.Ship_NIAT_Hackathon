import { X, Activity, Droplets, Trash2, Leaf, AlertCircle, DollarSign, ArrowRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import type { Analysis } from '../lib/store';
import { Button } from './ui/Button';

export default function ViewAnalysisModal({ analysis, onClose }: { analysis: Analysis | null, onClose: () => void }) {
  if (!analysis) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-20">
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center">
              {analysis.name}
              {analysis.status === 'Completed' && <span className="ml-3 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Completed</span>}
              {analysis.status === 'Issues Found' && <span className="ml-3 px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Issues Found</span>}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 font-medium">{analysis.building} • {analysis.period || analysis.date}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-8 z-10 relative">
          {analysis.result ? (
            <>
              {/* Top KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400">
                    <Leaf className="w-4 h-4" />
                    <p className="text-xs uppercase font-bold tracking-wider">CO₂ Avoided</p>
                  </div>
                  <p className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mt-2">{analysis.result.estimatedCO2Reduction} <span className="text-base font-semibold">tons</span></p>
                </div>
                
                <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-xs uppercase font-bold tracking-wider">Est. Savings</p>
                  </div>
                  <p className="text-2xl font-black text-blue-800 dark:text-blue-300 mt-2">${analysis.result.estimatedCostSavings}</p>
                </div>

                <div className="bg-purple-500/10 p-5 rounded-xl border border-purple-500/20 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400">
                    <Activity className="w-4 h-4" />
                    <p className="text-xs uppercase font-bold tracking-wider">Energy Input</p>
                  </div>
                  <p className="text-2xl font-black text-purple-800 dark:text-purple-300 mt-2">{analysis.inputs?.electricity || 0} <span className="text-base font-semibold">kWh</span></p>
                </div>

                <div className="bg-cyan-500/10 p-5 rounded-xl border border-cyan-500/20 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 text-cyan-700 dark:text-cyan-400">
                    <Droplets className="w-4 h-4" />
                    <p className="text-xs uppercase font-bold tracking-wider">Water Input</p>
                  </div>
                  <p className="text-2xl font-black text-cyan-800 dark:text-cyan-300 mt-2">{analysis.inputs?.water || 0} <span className="text-base font-semibold">L</span></p>
                </div>
              </div>

              {/* Analysis Reports */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-primary" /> Energy Analysis
                  </h3>
                  <div className="text-sm text-foreground bg-background/50 border border-border p-5 rounded-xl leading-relaxed shadow-sm">
                    {analysis.result.energyAnalysis}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center">
                    <Droplets className="w-4 h-4 mr-2 text-cyan-500" /> Water Analysis
                  </h3>
                  <div className="text-sm text-foreground bg-background/50 border border-border p-5 rounded-xl leading-relaxed shadow-sm">
                    {analysis.result.waterAnalysis}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center">
                    <Trash2 className="w-4 h-4 mr-2 text-amber-500" /> Waste Analysis
                  </h3>
                  <div className="text-sm text-foreground bg-background/50 border border-border p-5 rounded-xl leading-relaxed shadow-sm">
                    {analysis.result.wasteAnalysis}
                  </div>
                </div>
              </div>

              {/* Lists */}
              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-border">
                <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/20">
                  <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-4 flex items-center">
                    <Leaf className="w-4 h-4 mr-2" /> AI Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {analysis.result.aiRecommendations?.map((rec, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-emerald-500 shrink-0" />
                        <span className="text-sm text-foreground font-medium">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-500/5 p-5 rounded-xl border border-red-500/20">
                  <h3 className="text-sm font-bold text-red-800 dark:text-red-400 uppercase tracking-wider mb-4 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" /> Unusual Patterns
                  </h3>
                  <ul className="space-y-3">
                    {analysis.result.unusualPatterns?.map((pat, i) => (
                      <li key={i} className="flex items-start">
                        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-red-500 shrink-0" />
                        <span className="text-sm text-foreground font-medium">{pat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={onClose} variant="outline" className="bg-background/50 hover:bg-muted/50 border-border">Close Report</Button>
              </div>
            </>
          ) : (
            <div className="py-16 text-center">
              <Activity className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-foreground font-medium text-lg">No detailed AI result available.</p>
              <p className="text-muted-foreground text-sm mt-1">This record may be a historical placeholder.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
